'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { DailyBarChartInfo, Factor } from '../lib/definitions';

export function useQueryFactor(factor: string) {
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

export function useQueryDailyBarChartFactor() {
  const [data, setData] = useState<DailyBarChartInfo>({
    data: [{ factor: 'モチベーション' }, { factor: 'ストレス' }],
    series: [{ name: '', color: '' }],
  });
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFactor() {
      try {
        const response = await axios.get<DailyBarChartInfo>(
          `${process.env.NEXT_PUBLIC_API_URL}/factors/getDailyBarChartInfo`,
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
  }, []);

  return { data, status, error };
}
