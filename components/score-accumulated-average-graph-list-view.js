'use client'

import { Line } from "react-chartjs-2";

export default function ScoreAccumulatedAverageGraphListView({ data }) {
  return <Line data={data} width={400} height={400} />;
}
