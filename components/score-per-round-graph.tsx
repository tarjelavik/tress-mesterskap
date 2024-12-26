'use client'
import { Line } from "react-chartjs-2";
import { getResultScorePerRoundSeries } from "../lib/functions";

export default function ScorePerRoundGraph({ player, games }: { player: any, games: any }) {
  const data = getResultScorePerRoundSeries(player, games);
  return <Line data={data} width={400} height={200} />;
}
