'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Match from '@/app/(frontend)/matches/_components/match'
import Date from '@/components/date'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { DotFilledIcon } from '@radix-ui/react-icons'

async function fetchDraftMatches() {
  try {
    const response = await fetch('/api/draft-matches')
    if (!response.ok) {
      throw new Error('Failed to fetch draft matches')
    }
    const data = await response.json()
    return data.matches || []
  } catch (error) {
    console.error('Error fetching draft matches:', error)
    return []
  }
}

// Helper to compare if matches are actually different
function matchesEqual(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false
  return a.every((match, index) => {
    const other = b[index]
    if (!other || match._id !== other._id) return false
    // Deep compare results if they exist
    if (match.results && other.results) {
      if (match.results.length !== other.results.length) return false
      return match.results.every((result: any, i: number) => {
        const otherResult = other.results[i]
        return (
          result.player?._id === otherResult?.player?._id &&
          JSON.stringify(result.score) === JSON.stringify(otherResult?.score) &&
          result.isWinner === otherResult?.isWinner
        )
      })
    }
    return true
  })
}

export default function LiveStreaming() {
  const [matches, setMatches] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const eventSourceRef = useRef<EventSource | null>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const updateMatches = useCallback((newMatches: any[]) => {
    setMatches((prevMatches) => {
      // Only update if matches actually changed
      if (!matchesEqual(prevMatches, newMatches)) {
        console.log('Matches updated:', newMatches.length, 'matches')
        return newMatches
      }
      return prevMatches
    })
  }, [])

  useEffect(() => {
    // Fallback: Initial fetch of draft matches
    fetchDraftMatches().then((draftMatches) => {
      console.log('Initial draft matches:', draftMatches)
      updateMatches(draftMatches)
    })

    // Set up Server-Sent Events for real-time updates
    try {
      const eventSource = new EventSource('/api/draft-matches/stream')
      eventSourceRef.current = eventSource

      eventSource.onopen = () => {
        console.log('SSE connection opened')
        setIsConnected(true)
      }

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('SSE message received:', data.type, 'with', data.matches?.length || 0, 'matches')

          if (data.type === 'initial' || data.type === 'update') {
            updateMatches(data.matches || [])
            setIsConnected(true)
          } else if (data.type === 'disconnect') {
            setIsConnected(false)
          } else if (data.type === 'reconnect') {
            setIsConnected(true)
            if (data.matches) {
              updateMatches(data.matches)
            }
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error)
        }
      }

      eventSource.onerror = (error) => {
        console.error('SSE error:', error)
        setIsConnected(false)

        // Fallback to polling if SSE fails
        if (!pollIntervalRef.current) {
          pollIntervalRef.current = setInterval(() => {
            fetchDraftMatches().then((draftMatches) => {
              updateMatches(draftMatches)
              setIsConnected(true)
            }).catch(() => {
              setIsConnected(false)
            })
          }, 2000)
        }
      }
    } catch (error) {
      console.error('Error setting up SSE, falling back to polling:', error)
      // Fallback to polling if SSE is not supported
      pollIntervalRef.current = setInterval(() => {
        fetchDraftMatches().then((draftMatches) => {
          updateMatches(draftMatches)
          setIsConnected(true)
        }).catch(() => {
          setIsConnected(false)
        })
      }, 2000)
    }

    // Cleanup on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
    }
  }, [updateMatches])

  if (matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex gap-2 items-center justify-between'>
            Live-strømming
            <Badge
              variant='outline'
              className='flex pl-0'
            >
              {isConnected ? <DotFilledIcon className='size-8 text-green-500 animate-pulse' /> : <DotFilledIcon className='size-8 text-red-500 animate-pulse' />}
              {isConnected ? 'Tilkoblet' : 'Frakoblet'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Ingen kamper er i gang. Live-spill vil vises her i realtid.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className='flex flex-col justify-between rounded-lg flex-shrink-0'>
      <CardHeader>
        <CardTitle className='flex gap-2 items-center justify-between'>
          Live-strømming
          <Badge
            variant='outline'
            className='flex pl-0'
          >
            {isConnected ? <DotFilledIcon className='size-8 text-green-500 animate-pulse' /> : <DotFilledIcon className='size-8 text-red-500 animate-pulse' />}
            {isConnected ? 'Tilkoblet' : 'Frakoblet'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {matches.map((match) => (
            <div
              key={match._id}
              className="border-2 border-red-500 rounded-lg p-4 bg-red-50 dark:bg-red-900/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded animate-pulse">
                  LIVE
                </span>
                {match.gameStart && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Startet: <Date dateString={match.gameStart} />
                  </span>
                )}
              </div>
              <Match match={match} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}