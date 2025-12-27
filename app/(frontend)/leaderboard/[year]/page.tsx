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
import { Card, CardContent } from "@/components/ui/card"
import { TrophyIcon } from "lucide-react"
import { getAllPlayersByYear } from "@/lib/api"
import Link from 'next/link'
import { getLeaderboard } from '@/lib/functions'
import { orderBy } from 'lodash'
import PlayerImage from '@/app/(frontend)/players/_components/player-image'

export const metadata: Metadata = {
  title: "Resultatliste",
  description: "Resultatliste for VM i tress (på Vaksdal)."
}

export default async function LeaderBoardByYearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params
  const leaderboards = await getAllPlayersByYear(year);
  let data = getLeaderboard(leaderboards);
  data = orderBy(data, ["expectedWins"], ["desc"]);
  const isSeasonOver = new Date().getFullYear() > Number.parseInt(year)

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-0 min-h-screen">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Resultatliste {year}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          {isSeasonOver ? (
            <div className="mb-10 flex justify-start">
              <Card className="w-fit border border-amber-100 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/30 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-500 dark:from-amber-600/60 dark:to-yellow-600/60 rounded-full blur-lg opacity-30 dark:opacity-20"></div>
                        <div className="relative bg-gradient-to-br from-amber-300 to-yellow-500 dark:from-amber-600/70 dark:to-yellow-600/70 p-4 rounded-full shadow-lg">
                          <TrophyIcon className="w-12 h-12 text-white dark:text-amber-100" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl text-amber-700 dark:text-amber-300 font-bold tracking-tighter leading-tight md:leading-none mb-4">
                        Årets spiller
                      </h2>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative shrink-0">
                          <div className="group w-full h-full rounded-full overflow-hidden shadow-md ring ring-amber-100 dark:ring-amber-800/50">
                            {data[0].image && (
                              <PlayerImage
                                slug={data[0].slug}
                                title={data[0].name}
                                url={data[0].image}
                              />
                            )}
                            {!data[0].image && (
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl md:text-3xl font-extrabold text-amber-700 dark:text-amber-300">
                            {data[0].name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
