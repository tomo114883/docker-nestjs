'use client';

import { useRouter } from 'next/navigation';
import { useQueryFactor } from '@/app/hooks/useQueryFactor';
import { CreateModal } from '@/app/ui/factors/create-modal';
import { FactorsList } from '@/app/ui/factors/factors-list';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ScrollArea } from '@mantine/core';

export function FactorsIndex() {
  const router = useRouter();
  const motivators = useQueryFactor('motivator');
  const stressors = useQueryFactor('stressor');

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>要因の一覧</h2>
      <CreateModal />
      <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-gray-50 p-4">
        <ScrollArea h={250}>
          <div className="flex flex-row">
            <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-gray-50 p-4">
              <FactorsList factors={motivators.data} />
            </div>
            <div className="flex grow flex-1 flex-col justify-between rounded-xl bg-gray-50 p-4">
              <FactorsList factors={stressors.data} />
            </div>
          </div>
        </ScrollArea>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon
            className="h-5 w-5 text-gray-500 cursor-pointer"
            onClick={() => router.push(`/`)}
          />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
