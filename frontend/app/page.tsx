import { Metadata } from 'next';
import { DailyBarChart } from './ui/charts/daily-bar-chart';
import FactorsIndex from './ui/factors/factors-index';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-1">
          <DailyBarChart />
        </div>
        <div className="flex-1">
          <FactorsIndex />
        </div>
      </div>
    </>
  );
}
