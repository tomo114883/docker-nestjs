'use client';

import { BarChart, BarChartSeries } from '@mantine/charts';

const data = [
  { factor: 'モチベーション', モチベ1: 1, モチベ2: 2 },
  { factor: 'ストレス', ストレス1: 4 },
];

const series: BarChartSeries[] = [
  { name: 'モチベ1', color: 'red.4' },
  { name: 'モチベ2', color: 'red.5' },
  { name: 'ストレス1', color: 'blue.4' },
];

export function DailyBarChart() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="factor"
      type="stacked"
      series={series}
    />
  );
}
