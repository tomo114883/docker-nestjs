'use client';

import { useParams } from 'next/navigation';
import { useQueryFactor } from '@/app/hooks/useQueryFactor';
import { ScrollArea } from '@mantine/core';
import { Motivator, Stressor } from '@prisma/client';
import { CopingFactorsList } from './coping-factors-list';

export const CopingFactorsIndex = ({
  onFactorSelect,
}: {
  onFactorSelect: (factor: Motivator | Stressor) => void;
}) => {
  const params = useParams();
  const FactorsSetsIndex = Number(params.id);

  const motivators: { data: Motivator[] | null } = useQueryFactor(
    FactorsSetsIndex,
    'motivator',
  );
  const stressors: { data: Stressor[] | null } = useQueryFactor(
    FactorsSetsIndex,
    'stressor',
  );

  return (
    <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-white p-4 h-full">
      <ScrollArea>
        <div className="flex flex-row">
          <div className="flex grow flex-1 flex-col justify-between p-4">
            <CopingFactorsList
              factors={motivators.data}
              onFactorSelect={onFactorSelect}
            />
          </div>
          <div className="flex grow flex-1 flex-col justify-between p-4">
            <CopingFactorsList
              factors={stressors.data}
              onFactorSelect={onFactorSelect}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
