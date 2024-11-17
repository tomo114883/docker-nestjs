'use client';

import { useQueryMonthlyBarChartData } from '@/app/hooks/useQueryMonthlyBarChartData';
import { BarChart, BarChartSeries } from '@mantine/charts';

export const MonthlyBarChart = () => {
  const { data } = useQueryMonthlyBarChartData();
  const series: BarChartSeries[] = [
    { name: 'motiv', color: 'red.4', stackId: 'motiv' },
    { name: 'stress', color: 'blue.4', stackId: 'stress' },
  ];

  return (
    <div className="">
      <h1>Monthly Bar Chart</h1>
      <div className="flex flex-row">
        <BarChart
          h={300}
          w={800}
          data={data}
          dataKey="date"
          series={series}
          tickLine="y"
          gridAxis="x"
        />
      </div>
    </div>
  );
};
