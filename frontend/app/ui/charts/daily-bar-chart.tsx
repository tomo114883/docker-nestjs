'use client';

import { useQueryDailyBarChartFactor } from '@/app/hooks/useQueryFactor';
import { BarChart, BarChartSeries } from '@mantine/charts';

export function DailyBarChart() {
  const factors = useQueryDailyBarChartFactor();
  console.log(factors);
  const series: BarChartSeries[] = [
    { name: 'モチベ1', color: 'red.4' },
    { name: 'モチベ2', color: 'red.5' },
    { name: 'ストレス1', color: 'blue.4' },
  ];

  return (
    <>
      <h2>チャート</h2>
      <div className="rounded-xl bg-gray-50 p-5">
        <BarChart
          h={350}
          data={factors.data}
          dataKey="factor"
          type="stacked"
          series={series}
        />
      </div>
    </>
  );
}
