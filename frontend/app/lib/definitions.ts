import { BarChartSeries } from '@mantine/charts';

// Interfaces
interface CreateFormProps {
  factorsSetId: number;
  factors: string;
  state: () => void;
}
interface BarChartInfo {
  data: BarChartData;
  series: BarChartSeries[];
}

// Types
type AuthForm = {
  email: string;
  password: string;
};
type BarChartData = Record<string, string | number>[];

// Props
type CopingTextAreaProps = { text: string };
type DashboardCardProps = {
  title: string;
  value: number;
};

export type { BarChartInfo, CreateFormProps };
export type { AuthForm, BarChartData };
export type { DashboardCardProps, CopingTextAreaProps };
