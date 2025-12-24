import { Matches } from './_components/matches'
import { MATCHES_QUERY } from '@/lib/api';
import { getCachedClient } from '@/lib/sanity.client';
import { draftMode } from 'next/headers';

export default async function MatchesPage() {
  const { isEnabled } = await draftMode()
  const preview = isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const matches = await getCachedClient(preview)(MATCHES_QUERY, {
    lastGameStart: new Date().toISOString().split('.')[0] + 'Z'
  });
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Spill</h2>
        </div>
        <Matches matches={matches} />
      </div>
    </div>
  )
}
