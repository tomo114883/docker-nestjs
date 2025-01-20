'use client';

import { useQueryFactorsSets } from '../../hooks/useQueryFactorsSet';

export const FactorsSetsIndex = () => {
  const res = useQueryFactorsSets();
  return (
    <>
      <h3>投稿一覧</h3>
      {res.data?.map((item, i) => {
        return (
          <a
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/factors-sets/${item.id}`}
            key={i}
          >
            {item.name}
          </a>
        );
      })}
    </>
  );
};
