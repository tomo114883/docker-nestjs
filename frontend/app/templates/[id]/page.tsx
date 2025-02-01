import { ConvertButton } from '@/app/ui/factors-sets/convert-button';
import { CustomBarChart } from '../../ui/charts/bar-chart';
import { FactorsIndex } from '../../ui/factors/factors-index';

export const metadata = {
  title: 'Factors Index',
  description: 'Factors Index page',
};

export default function Home({ params }: { params: { id: string } }) {
  const factorsSetId = Number(params.id);
  return (
    <>
      <div className="flex flex-row">
        <div className="flex-1">
          <CustomBarChart factorsSetId={factorsSetId} />
        </div>
        <div className="flex-1">
          <FactorsIndex factorsSetId={factorsSetId} />
        </div>
      </div>
      <ConvertButton title={metadata.title} factorsSetId={factorsSetId} />
    </>
  );
}
