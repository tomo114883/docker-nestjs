'use client';

import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { useQueryFactorsSets } from '../../hooks/useQueryFactorsSet';

export const FactorsSetsIndex = ({
  title,
}: {
  title: string | TemplateString | null | undefined;
}) => {
  const res = useQueryFactorsSets();

  return (
    <>
      <h3>投稿一覧</h3>
      {res.data?.map((item, i) => {
        let link = `/factors-sets/${item.id}`;

        if (title === 'Monthly Chart') {
          link = `/charts/monthly/factors-sets/${item.id}`;
        }
        return (
          <a href={`${process.env.NEXT_PUBLIC_DOMAIN}${link}`} key={i}>
            {item.name}
          </a>
        );
      })}
    </>
  );
};
