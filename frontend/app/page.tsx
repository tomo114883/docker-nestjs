import SignInForm from './ui/signin-form';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <main>
      <SignInForm />
    </main>
  );
}
