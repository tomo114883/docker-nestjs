'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Motivator, Stressor } from '@prisma/client';

export const useQueryFactor = (factorsSetId: number, factor: string) => {
  const [data, setData] = useState<Motivator[] | Stressor[] | null>(null);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFactor = async (retryCount = 0) => {
      try {
        const { data } = await axios.get<Motivator[] | Stressor[] | null>(
          `${process.env.NEXT_PUBLIC_API_URL}/factors-sets/${factorsSetId}/${factor}`,
        );
        setData(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401 && retryCount < 1) {
            return fetchFactor(retryCount + 1);
          }
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
  }, [factorsSetId, factor, router]);

  return { data, status, error };
};
