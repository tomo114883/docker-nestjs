import { NextPage } from 'next';
import { BarChart } from '@mantine/charts';

export const WeeklyBarChart: NextPage = () => {
  const data = [
    { week: 'Week 1', sales: 100 },
    { week: 'Week 2', sales: 200 },
    { week: 'Week 3', sales: 300 },
    { week: 'Week 4', sales: 400 },
  ];
  return (
    <div>
      <h1>Weekly Bar Chart</h1>
      <BarChart
        h={300}
        data={data}
        dataKey="week"
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
