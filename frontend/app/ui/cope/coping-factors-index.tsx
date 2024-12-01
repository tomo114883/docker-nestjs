'use client';

import { Factor } from '@/app/lib/definitions';
import { CopingMotivators, CopingStressors } from '@/app/lib/placeholder-data';
import { ScrollArea } from '@mantine/core';
import { CopingFactorsList } from './coping-factors-list';

export function CopingFactorsIndex() {
  const motivators: { data: Factor[] | null } = CopingMotivators;
  const stressors: { data: Factor[] | null } = CopingStressors;

  return (
    <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-white p-4">
      <ScrollArea h={350}>
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
}
