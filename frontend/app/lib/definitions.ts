import { BarChartSeries } from '@mantine/charts';

interface BarChartInfo {
  data: BarChartData;
  series: BarChartSeries[];
}
interface CreateFormProps {
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
type FactorsSet = {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
type Factor = {
  id: number;
  name: string;
  weight: number;
  variable: boolean | null;
  factorsSetId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type { BarChartInfo, CreateFormProps, DashboardCardProps };
export type { AuthForm, BarChartData, FactorsSet, Factor };
