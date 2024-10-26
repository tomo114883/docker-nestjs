import { ArrowPathIcon } from '@heroicons/react/24/outline';
import FactorsList from './factors-list';

export default async function FactorsIndex() {
  const motivators = [
    { id: 1, name: 'お金', weight: 2, variable: true },
    { id: 2, name: '楽しい', weight: 2, variable: true },
  ];
  const stressors = [{ id: 1, name: '人間関係', weight: 2, variable: false }];

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Index of Factors</h2>
      <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="flex flex-row">
          <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-gray-50 p-4">
            <FactorsList factors={motivators} />
          </div>
          <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-gray-50 p-4">
            <FactorsList factors={stressors} />
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
