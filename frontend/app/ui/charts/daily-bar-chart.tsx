'use client';

import { useQueryDailyBarChartFactor } from '@/app/hooks/useQueryFactor';
import { DailyBarChartInfo } from '@/app/lib/definitions';
import { BarChart } from '@mantine/charts';

export function DailyBarChart() {
  const res = useQueryDailyBarChartFactor();
  const factors: DailyBarChartInfo = res.data;
  console.log(`Fetching chart ${res.error}`);

  return (
    <>
      <h2>チャート</h2>
      <div className="rounded-xl bg-gray-50 p-5">
        <BarChart
          h={350}
          data={factors.data}
          dataKey="factor"
          type="stacked"
          series={factors.series}
        />
      </div>
    </>
  );
}
