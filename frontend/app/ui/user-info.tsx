'use client';

import { Loader } from '@mantine/core';
import { useQueryUser } from '../hooks/useQueryUser';

export const UserInfo = () => {
  const { data, status, error } = useQueryUser();

  if (status === 'pending') return <Loader />;
  if (status === 'error') return <p>{error}</p>;
  return <p>{data?.email}</p>;
};
