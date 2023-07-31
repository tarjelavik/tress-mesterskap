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
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { getResultScoreSeries } from "../lib/functions";

export default function ScoreGraph({ player, games }) {
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
    type: 'line',
  };
  const data = getResultScoreSeries(player, games);
  return <Line data={data} options={options} />;
}
