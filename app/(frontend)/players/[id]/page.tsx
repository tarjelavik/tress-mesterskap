import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPlayer } from "@/lib/api"
import MatchesWon from "@/components/matchesWon";
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
  description: "Liste over alle tress-spillerne som har deltatt i VM i tress (på Vaksdal).",
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getPlayer(id)
  const player = data[0]

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-0">
        <h2 className="text-3xl font-bold tracking-tight">{player.name}</h2>
        <p className="text-sm text-muted-foreground">{player.description}</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
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

          <Card>
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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
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

          <Card>
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
        <Card>
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
    </div>
  )
}