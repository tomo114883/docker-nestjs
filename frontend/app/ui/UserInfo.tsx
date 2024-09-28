import { Loader } from '@mantine/core';
import { useQueryUser } from '../hooks/useQueryUser';

export const UserInfo = () => {
  const { data, status } = useQueryUser();

  if (status === 'pending') return <Loader />;
  return <p>{data?.email}</p>;
};
