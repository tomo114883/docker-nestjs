'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BarChartInfo } from '../lib/definitions';

export const useQueryDailyBarChartInfo = () => {
  const [data, setData] = useState<BarChartInfo>({
    data: [{ factor: 'モチベーション' }, { factor: 'ストレス' }],
    series: [{ name: '', color: '' }],
  });
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFactor = async () => {
      try {
        const { data } = await axios.get<BarChartInfo>(
          `${process.env.NEXT_PUBLIC_API_URL}/factors/getDailyBarChartInfo`,
        );
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
  }, [router]);

  return { data, status, error };
};
