import { Matches } from './_components/matches'
import { MATCHES_QUERY } from '@/lib/api';
import { sanityFetch } from '@/lib/sanity.client';
import { draftMode } from 'next/headers';

export default async function MatchesPage() {
  const { isEnabled } = await draftMode()
  const preview = isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const matches = await sanityFetch({
    query: MATCHES_QUERY,
    params: {
      lastGameStart: new Date().toISOString().split('.')[0] + 'Z'
    },
    tags: ['match', 'player'],
    preview,
  });
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Spill</h2>
        </div>
        <Matches matches={matches} />
      </div>
    </div>
  )
}
