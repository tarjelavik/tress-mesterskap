import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

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

export async function GET() {
  try {
    const client = createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn: false,
      perspective: 'raw',
      token: process.env.SANITY_API_READ_TOKEN,
      ignoreBrowserTokenWarning: true,
    })

    const query = `*[_type == "match"] | order(gameStart desc) {
      ${matchFields}
    }`

    const allMatches = await client.fetch(query)
    
    // Filter for draft matches (those with _id starting with "drafts.")
    const draftMatches = (allMatches || []).filter((match: any) => 
      match._id && match._id.startsWith('drafts.')
    )

    return NextResponse.json({ matches: draftMatches })
  } catch (error) {
    console.error('Error fetching draft matches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch draft matches' },
      { status: 500 }
    )
  }
}

