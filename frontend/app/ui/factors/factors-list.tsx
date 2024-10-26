import { Factor } from '@/app/lib/definitions';
import EllipsisMenu from '../ellipsis-menu';

export default async function FactorsList({ factors }: { factors: Factor[] }) {
  return (
    <>
      {
        <div className="bg-white px-6">
          {factors.map((factor) => {
            return (
              <div key={factor.id} className="">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {factor.name}
                  </p>
                  <div className="flex items-center">
                    <p className="mr-4 text-sm text-gray-500">
                      {factor.weight}
                    </p>
                    <EllipsisMenu />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </>
  );
}
