import { Metadata } from 'next';
import { FactorsSetsIndex } from './ui/factors-sets/factors-sets-index';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <>
      <FactorsSetsIndex title={metadata.title} />
    </>
  );
}
