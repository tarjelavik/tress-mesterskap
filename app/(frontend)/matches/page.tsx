import { MainNav } from '@/components/main-nav'
import { Matches } from './_components/matches'
import { matchesQuery } from '@/lib/api';
import { getCachedClient } from '@/lib/sanity.client';
import { draftMode } from 'next/headers';
import Link from 'next/link'
import { UserNav } from '@/components/user-nav';

export default async function MatchesPage() {
  const preview = draftMode().isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const matches = await getCachedClient(preview)(matchesQuery, {
    lastGameStart: new Date().toISOString().split('.')[0] + 'Z'
  });
  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex gap-3 h-16 items-center px-4">
          <Link href={`/`} className="font-bold">
            VM i tress
          </Link>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Spill</h2>
        </div>
        <Matches matches={matches} />
      </div>
    </div>
  )
}
