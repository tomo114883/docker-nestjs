'use client';

import { useParams } from 'next/navigation';
import { useQueryMonthlyChartData } from '@/app/hooks/useQueryMonthlyChartData';
import { LineChart, LineChartSeries } from '@mantine/charts';

export const MonthlyChart = () => {
  const params = useParams<{ id: string }>();
  const factorsSetId = Number(params.id);

  const { data } = useQueryMonthlyChartData(factorsSetId);
  const series: LineChartSeries[] = [
    { name: 'motiv', color: 'red.4' },
    { name: 'stress', color: 'blue.4' },
  ];

  return (
    <div className="">
      <h1>月次チャート</h1>
      <div className="flex flex-row">
        <LineChart
          h={300}
          w={800}
          data={data}
          dataKey="date"
          series={series}
          curveType="linear"
        />
      </div>
    </div>
  );
};
