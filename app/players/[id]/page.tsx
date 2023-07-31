import { Metadata } from "next"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import PlayerSwitcher from "@/components/player-switcher"
import { getPlayer } from "@/lib/api"
import AverageScore from "@/components/average-score";
import PlayerImage from "@/app/players/_components/player-image";
import MatchesWon from "@/components/matchesWon";
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { getPlayerAverageScore } from '@/lib/functions'

const DynamicScoreGraph = dynamic(() =>
  import("@/components/score-graph")
);
const DynamicScorePerRoundGraph = dynamic(() =>
  import("@/components/score-per-round-graph")
);
const DynamicAccumulatedAverageGraph = dynamic(() =>
  import("@/components/score-accumulated-average-graph")
);

export const metadata: Metadata = {
  title: "Spillere",
  description: "Liste over alle tress-spillerne som har deltatt i VM i Tress (på Vaksdal).",
}

export default async function PlayersPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const data = await getPlayer(id)
  const player = data[0]

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <Card className=''>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gjennomsnitt over {player.games.length} slag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getPlayerAverageScore(player._id, player.games)}
              </div>
            </CardContent>
          </Card>
          <Card className=''>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vunnet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <MatchesWon player={player._id} games={player.games} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-2">

          <Card className=''>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resultat per spill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense>
                <DynamicScoreGraph player={player._id} games={player.games} />
              </Suspense>
            </CardContent>
          </Card>

          <Card className=''>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utvikling av gjennomsnittet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense>
                <DynamicAccumulatedAverageGraph
                  player={player._id}
                  games={player.games}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>
        <Card className=''>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resultat per runde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense>
              <DynamicScorePerRoundGraph
                player={player._id}
                games={player.games}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  )
}