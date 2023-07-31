import { Metadata } from "next"
import Image from "next/image"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MainNav } from "@/components/main-nav"
import { getAllPlayers, getMatchesByYear } from "@/lib/api"
import Link from 'next/link'
import React from 'react'
import { getLeaderboard } from '@/lib/functions'
import { orderBy } from 'lodash'


export const metadata: Metadata = {
  title: "Resultatliste",
  description: "Resultatliste for VM i Tress (på Vaksdal)."
}

export default async function LeaderBoardPage() {
  const leaderboard = await getAllPlayers();
  const years = await getMatchesByYear();
  let data = getLeaderboard(leaderboard);
  data = orderBy(data, ["expectedWins"], ["desc"]);

  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex gap-3 h-16 items-center px-4">
            <Link href={`/`} className="font-bold">
              VM i Tress
            </Link>
            <MainNav className="mx-6" />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Resultatliste</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Table>
              <TableCaption>Resultatliste</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Spiller</TableHead>
                  <TableHead>Seire</TableHead>
                  <TableHead>Forventet</TableHead>
                  <TableHead>Gjennomsnitt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((player, index) => (
                  <TableRow key={player._id}>
                    <TableCell className="font-bold mr-5 self-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="col-span-5 font-semibold self-center">
                      <Link as={`/players/${player._id}`} href="/players/[slug]">
                        {player.name}
                      </Link>
                      {index === 0 && (
                        " ⭐"
                      )}
                    </TableCell>
                    <TableCell className="col-span-2 self-center">
                      {player.wins} / {player.played}
                    </TableCell>
                    <TableCell className="col-span-2 self-center">
                      {player.expectedWins}
                    </TableCell>
                    <TableCell className="col-span-2 self-center">
                      {player.average}
                    </TableCell>

                    {/* <TableCell className="col-span-2 self-center">
                    <DynamicScoreAccumulatedAverageGraphplayerView
                  data={player.accumulatedAverages}
                />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </div>
      </div>
    </>
  )
}