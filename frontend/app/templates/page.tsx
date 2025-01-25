import { Metadata } from 'next';
import { CreateFormWithName } from '../ui/factors-sets/create-factors-sets';
import { FactorsSetsIndex } from '../ui/factors-sets/factors-sets-index';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Templates page',
};

export default function Home() {
  return (
    <>
      <CreateFormWithName title={metadata.title} />
      <FactorsSetsIndex title={metadata.title} />
    </>
  );
}
