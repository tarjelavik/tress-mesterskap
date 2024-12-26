'use client'
import { Line } from "react-chartjs-2";
import { getResultScoreAccumulatedAverageSeries } from "../lib/functions";
import { ChartData } from 'chart.js';

export default function ScoreAccumulatedAverageGraph({ player, games }: { player: any, games: any }) {
  const data = getResultScoreAccumulatedAverageSeries(player, games) as ChartData<'line'>;
  return <Line data={data} width={400} height={200} />;
}
