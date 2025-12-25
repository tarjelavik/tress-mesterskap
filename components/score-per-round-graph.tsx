'use client'
import { Line } from "react-chartjs-2";
import { getResultScorePerRoundSeries } from "../lib/functions";

export default function ScorePerRoundGraph({ player, games }: { player: any, games: any }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const data = getResultScorePerRoundSeries(player, games);
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
