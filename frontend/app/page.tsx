import { MonthlyBarChart } from './ui/charts/monthly-bar-chart';
import SignInForm from './ui/signin-form';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <main>
      <SignInForm />
      <MonthlyBarChart />
    </main>
  );
}
