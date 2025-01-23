'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FactorsSet } from '../lib/definitions';

export const useQueryFactorsSets = () => {
  const [data, setData] = useState<FactorsSet[] | null>(null);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFactorsSets = async (retryCount = 0) => {
      try {
        const { data } = await axios.get<FactorsSet[] | null>(
          `${process.env.NEXT_PUBLIC_API_URL}/factors-sets`,
        );
        setData(data);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401 && retryCount < 1) {
            return fetchFactorsSets(retryCount + 1);
          }
          setError(error.response.data.message || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
        }
      }
    };
    fetchFactorsSets();
  }, []);

  return { data, status, error };
};
