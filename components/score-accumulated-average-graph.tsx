'use client'
import { Line } from "react-chartjs-2";
import { getResultScoreAccumulatedAverageSeries } from "../lib/functions";
import { ChartData } from 'chart.js';

export default function ScoreAccumulatedAverageGraph({ player, games }: { player: any, games: any }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const data = getResultScoreAccumulatedAverageSeries(player, games) as ChartData<'line'>;
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
