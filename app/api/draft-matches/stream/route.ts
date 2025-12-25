import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import { defineQuery } from 'next-sanity'

const matchFields = `
  _id,
  _type,
  name,
  gameStart,
  results[]{
    player->{_id, name, mainRepresentation},
    isWinner,
    score
  },
  description,
  mainRepresentation
`

const liveStreamingQuery = defineQuery(`*[_type == "match"] | order(gameStart desc) {
  ${matchFields}
}`)

export async function GET() {
  const encoder = new TextEncoder()
  
  let subscription: any = null
  
  const stream = new ReadableStream({
    async start(controller) {
      const client = createClient({
        apiVersion,
        dataset,
        projectId,
        useCdn: false,
        perspective: 'raw',
        token: process.env.SANITY_API_READ_TOKEN,
        ignoreBrowserTokenWarning: true,
      })

      // Helper function to fetch and send draft matches
      const fetchAndSendDraftMatches = async () => {
        try {
          // Create a fresh client instance to avoid any caching
          const freshClient = createClient({
            apiVersion,
            dataset,
            projectId,
            useCdn: false,
            perspective: 'raw',
            token: process.env.SANITY_API_READ_TOKEN,
            ignoreBrowserTokenWarning: true,
          })
          
          // Use raw query string to ensure fresh data
          const query = `*[_type == "match"] | order(gameStart desc) {
            ${matchFields}
          }`
          
          const allMatches = await freshClient.fetch(query)
          
          const draftMatches = (allMatches || []).filter((match: any) => 
            match._id && match._id.startsWith('drafts.')
          )
          console.log('Fetched', draftMatches.length, 'draft matches')
          return draftMatches
        } catch (error) {
          console.error('Error fetching draft matches:', error)
          return []
        }
      }

      // Helper to safely enqueue data
      const safeEnqueue = (data: string) => {
        try {
          controller.enqueue(encoder.encode(data))
        } catch (error: any) {
          if (error.code === 'ERR_INVALID_STATE') {
            console.warn('Controller already closed, skipping enqueue')
          } else {
            throw error
          }
        }
      }

      // Send initial data
      try {
        const draftMatches = await fetchAndSendDraftMatches()
        safeEnqueue(`data: ${JSON.stringify({ type: 'initial', matches: draftMatches })}\n\n`)
      } catch (error) {
        console.error('Error sending initial data:', error)
        // Don't close controller here, let it continue
      }

      // Set up live subscription
      subscription = client
        .listen(liveStreamingQuery, {
          includeResult: true,
          includePreviousRevision: false,
        })
        .subscribe(async (update) => {
          try {
            console.log('Sanity update received:', update.type)
            
            // Handle all mutation types
            if (update.type === 'mutation') {
              const mutatedMatchId = update.result?._id || update.documentId
              console.log('Mutation detected for:', mutatedMatchId, 'transition:', update.transition)
              
              // Only process if it's a draft match
              if (mutatedMatchId && mutatedMatchId.startsWith('drafts.')) {
                // Longer delay to ensure data is fully committed to the database
                await new Promise(resolve => setTimeout(resolve, 500))
                
                // Always refetch all draft matches to ensure we get the latest data
                // This is more reliable than trying to merge individual matches
                try {
                  const draftMatches = await fetchAndSendDraftMatches()
                  
                  // Log all players' scores from the updated match if found
                  const updatedMatch = draftMatches.find((m: any) => m._id === mutatedMatchId)
                  if (updatedMatch) {
                    console.log('Updated match found - all scores:')
                    updatedMatch.results?.forEach((result: any, index: number) => {
                      console.log(`  Player ${index + 1} (${result.player?.name || 'unknown'}):`, result.score)
                    })
                  } else {
                    console.log('Updated match not found in draft list (may have been published)')
                  }
                  
                  console.log('Sending update with', draftMatches.length, 'draft matches')
                  safeEnqueue(`data: ${JSON.stringify({ type: 'update', matches: draftMatches })}\n\n`)
                } catch (err) {
                  console.error('Error refetching matches after mutation:', err)
                }
              } else {
                // Not a draft match (was published), refetch all to get current state
                try {
                  const draftMatches = await fetchAndSendDraftMatches()
                  safeEnqueue(`data: ${JSON.stringify({ type: 'update', matches: draftMatches })}\n\n`)
                } catch (err) {
                  console.error('Error refetching matches:', err)
                }
              }
            } else if (update.type === 'welcome') {
              console.log('Welcome message, sending initial data...')
              try {
                const draftMatches = await fetchAndSendDraftMatches()
                safeEnqueue(`data: ${JSON.stringify({ type: 'update', matches: draftMatches })}\n\n`)
              } catch (err) {
                console.error('Error refetching matches:', err)
              }
            } else if (update.type === 'disconnect') {
              console.log('Disconnect event')
              safeEnqueue(`data: ${JSON.stringify({ type: 'disconnect' })}\n\n`)
            } else if (update.type === 'reconnect') {
              console.log('Reconnect event, refetching...')
              try {
                const draftMatches = await fetchAndSendDraftMatches()
                safeEnqueue(`data: ${JSON.stringify({ type: 'update', matches: draftMatches })}\n\n`)
              } catch (err) {
                console.error('Error refetching matches:', err)
              }
            } else {
              console.log('Unhandled update type:', update.type)
              // For any other update type, refetch to be safe
              try {
                const draftMatches = await fetchAndSendDraftMatches()
                safeEnqueue(`data: ${JSON.stringify({ type: 'update', matches: draftMatches })}\n\n`)
              } catch (err) {
                console.error('Error refetching matches:', err)
              }
            }
          } catch (error) {
            console.error('Error in subscription handler:', error)
          }
        })
    },
    cancel() {
      // Cleanup on cancel
      if (subscription) {
        subscription.unsubscribe()
      }
    },
  })

return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable buffering in nginx
    },
  })
}

