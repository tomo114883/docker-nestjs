import { Metadata } from 'next';
import { DailyBarChart } from './ui/charts/daily-bar-chart';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <>
      <h1 className="">{metadata.title?.toString()}</h1>
      <DailyBarChart />
    </>
  );
}
