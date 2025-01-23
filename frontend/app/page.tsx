import { Metadata } from 'next';
import { CreateFactorsSet } from './ui/factors-sets/create-factors-sets';
import { FactorsSetsIndex } from './ui/factors-sets/factors-sets-index';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Home() {
  return (
    <>
      <CreateFactorsSet />
      <FactorsSetsIndex title={metadata.title} />
    </>
  );
}
