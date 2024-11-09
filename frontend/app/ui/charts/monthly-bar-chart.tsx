'use client';

import { monthlyData } from '@/app/lib/placeholder-data';
import { BarChart, BarChartSeries } from '@mantine/charts';

const series: BarChartSeries[] = [
  { name: 'f1', color: 'red.4', stackId: 'Motiv' },
  { name: 'f2', color: 'red.5', stackId: 'Motiv' },
  { name: 'f3', color: 'blue.4', stackId: 'Stress' },
];

export const MonthlyBarChart = () => {
  return (
    <div className="">
      <h1>Monthly Bar Chart</h1>
      <div className="flex flex-row">
        <BarChart
          h={300}
          w={800}
          data={monthlyData}
          dataKey="date"
          series={series}
          tickLine="y"
          gridAxis="x"
        />
      </div>
    </div>
  );
};
