'use client';

import { BarChart, BarChartSeries } from '@mantine/charts';

// type BarInfo = {
//   name: string;
//   value: number;
// };

// // Receive Motivation and Stress as a response.
// const data: BarInfo[] = [
//   { name: 'f1', value: 1 },
//   { name: 'f2', value: 2 },
//   { name: 'f3', value: 3 },
//   { name: 'f4', value: 3 },
//   { name: 'f5', value: 3 },
//   { name: 'f6', value: 3 },
// ];
// const createDailyData = (data: BarInfo[]) =>
//   data
//     .map((d) => ({ [d.name]: d.value }))
//     .reduce((acc, curr) => Object.assign(acc, curr), {});
// const dailyData = createDailyData(response);

// Receive the dailyData and series as a response.
const dailyData = { f1: 1, f2: 2, f3: 3, f4: 3, f5: 3, f6: 3 };
const series: BarChartSeries[] = [
  { name: 'f1', color: 'violet.6', stackId: 'Motiv' },
  { name: 'f2', color: 'blue.6', stackId: 'Motiv' },
  { name: 'f3', color: 'green.6', stackId: 'Motiv' },
  { name: 'f4', color: 'violet.6', stackId: 'Motiv' },
  { name: 'f5', color: 'blue.6', stackId: 'Stress' },
  { name: 'f6', color: 'green.6', stackId: 'Stress' },
];

export const DailyBarChart = () => {
  return (
    <div className="">
      <h1>Daily Bar Chart</h1>
      <div className="flex flex-row">
        <BarChart
          h={300}
          data={[dailyData]}
          dataKey=""
          series={series}
          tickLine="y"
          gridAxis="x"
        />
      </div>
    </div>
  );
};
