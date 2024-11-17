export type BarChartSeries = {
  name: string;
  color: string;
  stackId?: number;
};
export type BarChartData = Record<string, string | number>;
export type BarChartInfo = {
  data: BarChartData[];
  series: BarChartSeries[];
};
