import { DailyBarChart } from './ui/charts/daily-bar-chart';
import { MonthlyBarChart } from './ui/charts/monthly-bar-chart';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <main>
      <DailyBarChart />
      <MonthlyBarChart />
    </main>
  );
}
