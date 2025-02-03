import { ConvertButton } from '@/app/ui/factors-sets/convert-button';
import { FactorsSetNameLabel } from '@/app/ui/factors/factors-set-name-label';
import { CustomBarChart } from '../../ui/charts/bar-chart';
import { FactorsIndex } from '../../ui/factors/factors-index';

export const metadata = {
  title: 'Factors Index',
  description: 'Factors Index page',
};

export default function Home() {
  return (
    <>
      <FactorsSetNameLabel />
      <div className="flex flex-row">
        <div className="flex-1">
          <CustomBarChart />
        </div>
        <div className="flex-1">
          <FactorsIndex />
        </div>
      </div>
      <ConvertButton title={metadata.title} />
    </>
  );
}
