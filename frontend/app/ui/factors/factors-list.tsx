import { EllipsisMenu } from '@/app/ui/ellipsis-menu';
import { Motivator, Stressor } from '@prisma/client';

export function FactorsList({
  factors,
}: {
  factors: Motivator[] | Stressor[] | null;
}) {
  return (
    <>
      {
        <div className="bg-white px-6">
          {factors &&
            factors.map((factor) => {
              return (
                <div key={factor.id} className="">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {factor.name}
                    </p>
                    <div className="flex items-center">
                      <p className="mx-auto text-sm text-gray-500">
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
