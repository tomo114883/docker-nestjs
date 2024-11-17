import { BarChartSeries } from '@mantine/charts';

export interface BarChartInfo {
  data: BarChartData;
  series: BarChartSeries[];
}
export interface CreateFormProps {
  factors: string;
  state: () => void;
}

export type AuthForm = {
  email: string;
  password: string;
};
export type BarChartData = Record<string, string | number>[];
export type Factor = {
  id: number;
  name: string;
  weight: number;
  variable: boolean | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
