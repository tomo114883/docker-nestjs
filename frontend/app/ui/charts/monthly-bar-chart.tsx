import { NextPage } from 'next';
import { BarChart } from '@mantine/charts';
import { monthlyBarChartData } from '@/app/data';
export const MonthlyBarChart: NextPage = () => {
  return (
    <div>
      <h1>Monthly Bar Chart</h1>
      <BarChart
        h={300}
        data={monthlyBarChartData}
        dataKey="month"
        series={[
          { name: 'Smartphones', color: 'violet.6' },
          { name: 'Laptops', color: 'blue.6' },
          { name: 'Tablets', color: 'teal.6' },
        ]}
        tickLine="y"
      />
    </div>
  );
};
