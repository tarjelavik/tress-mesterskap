import { draftMode } from "next/headers";
import { Metadata } from "next"

import { playersQuery } from "@/lib/api"
import Link from 'next/link'
import { MainNav } from '@/components/main-nav'
import { getCachedClient } from "@/lib/sanity.client";
import Players from './_components/players';

export const metadata: Metadata = {
  title: "Spillere",
  description: "Liste over alle tress-spillerne som har deltatt i VM i Tress (på Vaksdal).",
}

export default async function PlayersPage() {
  const preview = draftMode().isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const players = await getCachedClient(preview)(playersQuery);

  return (
    <div className="flex-col flex">
      <div className="border-b">
        <div className="flex gap-3 h-16 items-center px-4">
          <Link href={`/`} className="font-bold">
            VM i Tress
          </Link>
          <MainNav />
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Spillere</h2>
        </div>
        <Players players={players} />
      </div>
    </div>
  )
}