import { MonthlyBarChart } from '@/app/ui/charts/monthly-bar-chart';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <>
      <MonthlyBarChart />
    </>
  );
}
