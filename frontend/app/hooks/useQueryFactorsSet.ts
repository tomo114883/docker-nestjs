'use client';

import { useEffect, useState } from 'react';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import axios from 'axios';
import { Motivator, Stressor } from '@prisma/client';

export const useQueryFactorsSets = (
  title: string | TemplateString | null | undefined,
) => {
  const [data, setData] = useState<Motivator[] | Stressor[] | null>(null);
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState<string | null>(null);
  let link = `/factors-sets`;

  if (title === 'Templates') {
    link = `/templates`;
  }

  useEffect(() => {
    const fetchFactorsSets = async (retryCount = 0) => {
      try {
        const { data } = await axios.get<Motivator[] | Stressor[] | null>(
          `${process.env.NEXT_PUBLIC_API_URL}${link}`,
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
  }, [title, link]);

  return { data, status, error };
};
