'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { User } from '@prisma/client';

export const useQueryUser = () => {
  const [data, setData] = useState<Omit<User, 'password'> | null>(null);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<Omit<User, 'password'>>(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        );
        const userData = await response.data;
        setData(userData);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (axios.isAxiosError(error) && error.response) {
          // if (error.response.status === 401 || error.response.status === 403) {
          //   router.push('/auth');
          // }
          setError(error.response.data.message || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchUser();
  }, [router]);

  return { data, status, error };
};
