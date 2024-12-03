'use client';

import { CopingFactorsIndex } from './coping-factors-index';
import { CopingTextArea } from './coping-text-area';

export const CopingFactors = () => {
  return (
    <>
      <div className="flex grow flex-row space-x-2 pt-24 h-3/6">
        <div className="flex-1">
          <CopingFactorsIndex />
        </div>
        <div className="flex-1">
          <CopingTextArea />
        </div>
      </div>
    </>
  );
};
