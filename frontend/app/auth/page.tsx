import LoginForm from '../ui/login-form';

export const metadata = {
  title: 'Authentication',
  description: 'Authentication page',
};

const motivData = [
  { name: 'f1', value: 1200 },
  { name: 'f2', value: 900 },
];
const series = motivData.map((motiv) => ({ [motiv.name]: motiv.value }));
console.log(series);
const fixedData = [{ Data: 'Motivation', Tablets: 200 }];
const dailyMotivData = Object.assign(fixedData[0], series);
// const dailyStressData = [{ Data: 'Stress', f1: 1200, f2: 900, Tablets: 200 }];
console.log(dailyMotivData);
export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  );
}
