import { Button } from '@mantine/core';
import { Motivator, Stressor } from '@prisma/client';

export function CopingFactorsList({
  factors,
  onFactorSelect,
}: {
  factors: Motivator[] | Stressor[] | null;
  onFactorSelect: (factor: Motivator | Stressor) => void;
}) {
  return (
    <>
      {
        <div className="bg-gray-100 px-6">
          {factors &&
            factors.map((factor) => {
              return (
                <Button
                  key={factor.id}
                  onClick={() => onFactorSelect(factor)}
                  color="gray-100"
                  c={'dark'}
                >{`${factor.name} ${factor.weight}`}</Button>
              );
            })}
        </div>
      }
    </>
  );
}
