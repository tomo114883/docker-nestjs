import { BarChartSeries } from '@mantine/charts';

export interface CreateFormProps {
  factors: string;
  state: () => void;
}
export interface DailyBarChartInfo {
  data: Record<string, string | number>[];
  series: BarChartSeries[];
}

export type AuthForm = {
  email: string;
  password: string;
};
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
