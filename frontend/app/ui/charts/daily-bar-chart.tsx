'use client';

import { BarChart } from '@mantine/charts';

const dailyBarChartData = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
];

export const DailyBarChart = () => {
  return (
    <div>
      <h1>Daily Bar Chart</h1>
      <BarChart
        h={300}
        data={dailyBarChartData}
        dataKey="month"
        series={[
          { name: 'Smartphones', color: 'violet.6' },
          { name: 'Laptops', color: 'blue.6' },
        ]}
        tickLine="y"
      />
    </div>
  );
};
