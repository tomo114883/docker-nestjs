import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useQueryUser = () => {
  const router = useRouter();
  const getUser = async () => {
    const { data } = await axios.get<Omit<User, 'password'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
    );
    return data;
  };
  const { status, data, error } = useQuery<Omit<User, 'password'>>({
    queryKey: ['user'],
    queryFn: getUser,
  });
  if (status === 'error') {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      router.push('/');
    }
  }
  return { data, status };
};
