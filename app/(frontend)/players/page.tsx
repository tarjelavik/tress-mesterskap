import { draftMode } from "next/headers";
import { Metadata } from "next"

import { PLAYERS_QUERY } from "@/lib/api"
import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { getCachedClient } from "@/lib/sanity.client";
import Players from './_components/players';
import { UserNav } from '@/components/user-nav';

export const metadata: Metadata = {
  title: "Spillere",
  description: "Liste over alle tress-spillerne som har deltatt i VM i tress (på Vaksdal).",
}

export default async function PlayersPage() {
  const { isEnabled } = await draftMode()
  const preview = isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const players = await getCachedClient(preview)(PLAYERS_QUERY);

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Spillere</h2>
        </div>
        <Players players={players} />
      </div>
    </div>
  )
}