'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Factor } from '../lib/definitions';

export default function useQueryFactor(factor: string) {
  const [data, setData] = useState<Factor[] | null>(null);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFactor() {
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
          setError(error.response.data.message || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    }
    fetchFactor();
  }, [factor]);

  return { data, status, error };
}
