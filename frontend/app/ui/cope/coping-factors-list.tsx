import { Factor } from '@/app/lib/definitions';

export function CopingFactorsList({ factors }: { factors: Factor[] | null }) {
  return (
    <>
      {
        <div className="bg-gray-100 px-6">
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
