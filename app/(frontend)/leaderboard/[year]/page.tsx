import { Metadata } from "next"
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
import { getMatchesByYear, getAllPlayersByYear } from "@/lib/api"
import Link from 'next/link'
import React from 'react'
import { getLeaderboard } from '@/lib/functions'
import { orderBy } from 'lodash'
import { UserNav } from '@/components/user-nav'
import PlayerImage from '@/app/(frontend)/players/_components/player-image'
import YearSwitcher from '@/components/year-switcher'


export const metadata: Metadata = {
  title: "Resultatliste",
  description: "Resultatliste for VM i tress (på Vaksdal)."
}

export default async function LeaderBoardByYearPage({ params: { year } }: { params: { year: string } }) {
  const leaderboards = await getAllPlayersByYear(year);
  const years = await getMatchesByYear()
  let data = getLeaderboard(leaderboards);
  data = orderBy(data, ["expectedWins"], ["desc"]);
  const isSeasonOver = new Date().getFullYear() > Number.parseInt(year)

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6 min-h-screen">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Resultatliste {year}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          {isSeasonOver ? (
            <div className='border-b-2 mb-10'>
              <h2 className="text-xl md:text-2xl text-teal-800 font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
                Årets spiller
              </h2>
              <div className="flex gap-4">
                <div className="w-16 h-16 relative mb-4">
                  <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                    {data[0].image && (
                      <PlayerImage
                        slug={data[0].slug}
                        title={data[0].name}
                        url={data[0].image}
                      />
                    )}
                    {!data[0].mainRepresentation && (
                      <div style={{ backgroundColor: '#ccc', width: '100%', height: '100%' }}></div>
                    )}
                  </div>
                </div>
                <div className="col-span-10 text-2xl font-extrabold">
                  {data[0].name}
                </div>
              </div>
            </div>
          ) : null}
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
  )
}
