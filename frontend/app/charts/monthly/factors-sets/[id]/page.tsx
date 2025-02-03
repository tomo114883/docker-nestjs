import { MonthlyChart } from '@/app/ui/charts/monthly-chart';
import { DashboardCard } from '@/app/ui/dashboard/dashboard-card';
import { FactorsSetNameLabel } from '@/app/ui/factors/factors-set-name-label';

export const metadata = {
  title: 'Monthly Chart for a Factors-Set',
  description: 'Monthly Chart for a Factors-Set page',
};

export default function Home() {
  return (
    <>
      <FactorsSetNameLabel />
      <MonthlyChart />
      <h2>Dash Board</h2>
      <div className="flex flex-row">
        <DashboardCard title={'投稿日数'} value={5} />
      </div>
    </>
  );
}
