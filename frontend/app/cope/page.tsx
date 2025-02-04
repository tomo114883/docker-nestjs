import { Metadata } from 'next';
import { FactorsSetsIndex } from '@/app/ui/factors-sets/factors-sets-index';

export const metadata: Metadata = {
  title: 'Cope with AI',
  description: 'Cope with AI page',
};

export default function Home() {
  return (
    <>
      <FactorsSetsIndex title={metadata.title} />
    </>
  );
}
