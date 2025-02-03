'use client';

import { useParams } from 'next/navigation';
import { useQueryBarChartInfo } from '@/app/hooks/useQueryBarChartInfo';
import { BarChartInfo } from '@/app/lib/definitions';
import { BarChart } from '@mantine/charts';

export function CustomBarChart() {
  const params = useParams<{ id: string }>();
  const factorsSetId = Number(params.id);

  const res = useQueryBarChartInfo(factorsSetId);
  const factors: BarChartInfo = res.data;

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
