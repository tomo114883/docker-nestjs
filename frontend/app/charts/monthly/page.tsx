import { MonthlyBarChart } from '@/app/ui/charts/monthly-bar-chart';
import { DashboardCard } from '@/app/ui/dashboard/dashboard-card';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <>
      <MonthlyBarChart />
      <h2>Dash Board</h2>
      <div className="flex flex-row">
        <DashboardCard title={'投稿日数'} value={5} />
      </div>
    </>
  );
}
