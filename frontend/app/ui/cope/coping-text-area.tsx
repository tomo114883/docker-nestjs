'use client';

import { copeList, copingText } from '@/app/lib/placeholder-data';
import { ScrollArea } from '@mantine/core';

export const CopingTextArea = () => {
  const copingData: { copingText: string; copeList: string[] } = {
    copingText,
    copeList,
  };

  return (
    <div className="flex grow justify-center items-center rounded-xl bg-white p-4 h-4/6">
      <div className="flex grow bg-gray-100 size-11/12">
        <ScrollArea>
          <div className="flex grow px-4 py-8">
            <div className="flex grow flex-col">
              <p className="text-base m-0">{copingData.copingText}</p>
              <ul className="">
                {copingData.copeList.map((cope, i) => {
                  return (
                    <li key={i} className="text-base">
                      {cope}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
