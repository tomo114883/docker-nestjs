import { CopingFactors } from '../ui/cope/coping-factors';
import { CustomPagination } from '../ui/custom-pagination';
import { FactorsSetNameLabel } from '../ui/factors/factors-set-name-label';

export const metadata = {
  title: 'Cope with AI',
  description: 'Cope page with AI',
};

export default function Home() {
  const factorsSet = { data: { id: 1, name: '就活' } };
  return (
    <>
      <FactorsSetNameLabel factorsSetName={factorsSet.data.name} />
      <CopingFactors />
      <CustomPagination factorsSetId={factorsSet.data.id} />
    </>
  );
}
