'use client';

import { useState } from 'react';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import axios from 'axios';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Alert, Button } from '@mantine/core';

export const ConvertButton = ({
  title,
  factorsSetId,
}: {
  title: string | TemplateString | null | undefined;
  factorsSetId: number;
}) => {
  const [error, setError] = useState('');
  let link = `/templates/factors-set/${factorsSetId}`;

  if (title === 'Templates') {
    link = `/factors-sets/${factorsSetId}`;
  }

  // Post request to create a new factor.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${link}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          title="Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      {
        <form onSubmit={handleSubmit}>
          <Button type="submit">このテンプレートからセットを作成する</Button>
        </form>
      }
    </>
  );
};
