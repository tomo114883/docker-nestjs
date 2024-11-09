export type DailyBarChartSeries = {
  name: string;
  color: string;
};
export type DailyBarChartData = Record<string, string | number>;
export type DailyBarChartInfo = {
  data: DailyBarChartData[];
  series: DailyBarChartSeries[];
};
