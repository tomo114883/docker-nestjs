'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Factor } from '../lib/definitions';

export const useQueryFactor = (factor: string) => {
  const [data, setData] = useState<Factor[] | null>(null);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFactor = async () => {
      try {
        const response = await axios.get<Factor[] | null>(
          `${process.env.NEXT_PUBLIC_API_URL}/factors/${factor}`,
        );
        const data = await response.data;
        setData(data);
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
    fetchFactor();
  }, [factor, router]);

  return { data, status, error };
};
