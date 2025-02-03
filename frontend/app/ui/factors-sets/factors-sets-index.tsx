'use client';

import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { useQueryFactorsSets } from '../../hooks/useQueryFactorsSet';

export const FactorsSetsIndex = ({
  title,
}: {
  title: string | TemplateString | null | undefined;
}) => {
  const res = useQueryFactorsSets(title);

  return (
    <>
      <div className="flex flex-col">
        <h3>投稿一覧</h3>

        {res.data?.map((item, i) => {
          let link = `/factors-sets/${item.id}?name=${encodeURIComponent(item.name)}`;

          if (title === 'Monthly Chart') {
            link = `/charts/monthly/factors-sets/${item.id}?name=${encodeURIComponent(item.name)}`;
          }
          if (title === 'Cope with AI') {
            link = `/cope/${item.id}?name=${encodeURIComponent(item.name)}`;
          }
          if (title === 'Templates') {
            link = `/templates/${item.id}?name=${encodeURIComponent(item.name)}`;
          }

          return (
            <a href={`${process.env.NEXT_PUBLIC_DOMAIN}${link}`} key={i}>
              {item.name}
            </a>
          );
        })}
      </div>
    </>
  );
};
