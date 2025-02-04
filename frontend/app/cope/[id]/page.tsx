import { CopingFactors } from '../../ui/cope/coping-factors';
import { FactorsSetNameLabel } from '../../ui/factors/factors-set-name-label';

export const metadata = {
  title: 'Cope with AI for a Factors-Set',
  description: 'Cope page with AI for a Factors-Set',
};

export default function Home() {
  return (
    <>
      <FactorsSetNameLabel />
      <CopingFactors />
    </>
  );
}
