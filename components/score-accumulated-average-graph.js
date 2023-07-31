'use client'
import { Line } from "react-chartjs-2";
import { getResultScoreAccumulatedAverageSeries } from "../lib/functions";

export default function ScoreAccumulatedAverageGraph({ player, games }) {
  const data = getResultScoreAccumulatedAverageSeries(player, games);
  return <Line data={data} width={400} height={200} />;
}
