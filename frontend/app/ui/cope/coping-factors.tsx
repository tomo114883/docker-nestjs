'use client';

import { CopingFactorsIndex } from './coping-factors-index';
import { CopingTextArea } from './coping-text-area';

export default function CopingFactors() {
  return (
    <>
      <div className="flex grow flex-row p-3 space-x-2">
        <div className="flex-1 mt-36">
          <CopingFactorsIndex />
        </div>
        <div className="flex-1 mt-36">
          <CopingTextArea />
        </div>
      </div>
    </>
  );
}
