import { BarChartSeries } from '@mantine/charts';

interface BarChartInfo {
  data: BarChartData;
  series: BarChartSeries[];
}
interface CreateFormProps {
  factorsSetId: number;
  factors: string;
  state: () => void;
}
interface DashboardCardProps {
  title: string;
  value: number;
}

type AuthForm = {
  email: string;
  password: string;
};
type BarChartData = Record<string, string | number>[];

export type { BarChartInfo, CreateFormProps, DashboardCardProps };
export type { AuthForm, BarChartData };
