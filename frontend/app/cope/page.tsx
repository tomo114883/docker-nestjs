import { CopingFactors } from '../ui/cope/coping-factors';
import { FactorsSetNameLabel } from '../ui/factors/factors-set-name-label';

export const metadata = {
  title: 'Cope with AI',
  description: 'Cope page with AI',
};

export default function Home() {
  const factorsSet = { data: { name: '就活' } };
  return (
    <>
      <FactorsSetNameLabel factorsSetName={factorsSet.data.name} />
      <CopingFactors />
    </>
  );
}
