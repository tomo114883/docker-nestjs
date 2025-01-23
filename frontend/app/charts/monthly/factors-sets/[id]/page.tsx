import { MonthlyChart } from '@/app/ui/charts/monthly-chart';
import { DashboardCard } from '@/app/ui/dashboard/dashboard-card';

export const metadata = {
  title: 'Monthly Chart for a Factors-Set',
  description: 'Monthly Chart for a Factors-Set page',
};

export default function Home({ params }: { params: { id: string } }) {
  const factorsSetId = Number(params.id);
  return (
    <>
      <MonthlyChart factorsSetId={factorsSetId} />
      <h2>Dash Board</h2>
      <div className="flex flex-row">
        <DashboardCard title={'投稿日数'} value={5} />
      </div>
    </>
  );
}
