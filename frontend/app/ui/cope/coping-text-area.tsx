'use client';

import { ScrollArea } from '@mantine/core';

export function CopingTextArea() {
  const copingText: string =
    'Lorem ipsum dolor amet, consectetur adipiscing elit. Vulputate mollis fames ante quis autem differed purulent sceleris well-fated tellus. Nis enim feugiat ipsum pellentesque lectus ipsum burna curatur Libero sagittis dictum egestas blandium magna facils.';
  const copeList: string[] = [
    'Lorem ipsum dolor amet',
    'Vulputate mollis fames ante',
    'Que autem differed purulent',
    'Sceleris well-fated tellus',
    'Lorem ipsum dolor amet',
    'Vulputate mollis fames ante',
    'Que autem differed purulent',
    'Sceleris well-fated tellus',
    'Lorem ipsum dolor amet',
    'Vulputate mollis fames ante',
    'Que autem differed purulent',
    'Sceleris well-fated tellus',
  ];

  return (
    <div className="flex grow justify-center items-center rounded-xl bg-white p-4 h-5/6">
      <div className="flex grow bg-gray-100 size-11/12">
        <ScrollArea>
          <div className="flex grow px-4 py-8">
            <div className="flex grow flex-col">
              <p className="text-base m-0">{copingText}</p>
              <ul className="">
                {copeList.map((cope, i) => {
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
}
