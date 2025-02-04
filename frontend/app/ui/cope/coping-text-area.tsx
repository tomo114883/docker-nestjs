'use client';

import { CopingTextAreaProps } from '@/app/lib/definitions';
import { ScrollArea, TypographyStylesProvider } from '@mantine/core';

export const CopingTextArea = (props: CopingTextAreaProps) => {
  return (
    <div className="flex grow justify-center items-center rounded-xl bg-white p-4 h-full">
      <div className="flex grow bg-gray-100 size-11/12">
        <ScrollArea>
          <div className="flex grow px-4 py-8">
            <div className="flex grow flex-col">
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: props.text }} />
              </TypographyStylesProvider>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
