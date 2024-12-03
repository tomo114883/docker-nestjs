import React from 'react';

export const FactorsSetNameLabel = ({
  factorsSetName,
}: {
  factorsSetName: string;
}) => {
  return (
    <>
      <div className="bg-white size-fit text-lg px-4 py-2 rounded-md">
        {factorsSetName}
      </div>
    </>
  );
};
