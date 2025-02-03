'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

export const FactorsSetNameLabel = () => {
  const searchParams = useSearchParams();
  const factorsSetName = searchParams.get('name');

  return (
    <>
      <div className="bg-white size-fit text-lg px-4 py-2 rounded-md">
        {factorsSetName}
      </div>
    </>
  );
};
