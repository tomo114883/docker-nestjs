import React from 'react';
import { Pagination } from '@mantine/core';

export const CustomPagination = () => {
  return (
    <div className="flex justify-center my-8">
      <Pagination
        total={10}
        siblings={1}
        defaultValue={1}
        color="lime"
        size="xl"
        radius="mb"
        withEdges
        getItemProps={(page) => ({
          component: 'a',
          href: `#page-${page}`,
        })}
        getControlProps={(control) => {
          if (control === 'first') {
            return { component: 'a', href: '#page-0' };
          }

          if (control === 'last') {
            return { component: 'a', href: '#page-10' };
          }

          if (control === 'next') {
            return { component: 'a', href: '#page-2' };
          }

          if (control === 'previous') {
            return { component: 'a', href: '#page-1' };
          }

          return {};
        }}
      />
    </div>
  );
};
