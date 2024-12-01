'use client';

import { Factor } from '@/app/lib/definitions';
import { copingMotivators, copingStressors } from '@/app/lib/placeholder-data';
import { ScrollArea } from '@mantine/core';
import { CopingFactorsList } from './coping-factors-list';

export const CopingFactorsIndex = () => {
  const motivators: { data: Factor[] | null } = copingMotivators;
  const stressors: { data: Factor[] | null } = copingStressors;

  return (
    <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-white p-4 h-4/6">
      <ScrollArea>
        <div className="flex flex-row">
          <div className="flex grow flex-1 flex-col justify-between p-4">
            <CopingFactorsList factors={motivators.data} />
          </div>
          <div className="flex grow flex-1 flex-col justify-between p-4">
            <CopingFactorsList factors={stressors.data} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
