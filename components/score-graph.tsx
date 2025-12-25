'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { getResultScoreSeries } from "../lib/functions";

export default function ScoreGraph({ player, games }: { player: any, games: any }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    type: 'line',
  };
  const data = getResultScoreSeries(player, games) as ChartData<'line'>;
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
