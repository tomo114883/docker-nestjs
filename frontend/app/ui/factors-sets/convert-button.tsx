'use client';

import { useState } from 'react';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Alert, Button } from '@mantine/core';

export const ConvertButton = ({
  title,
}: {
  title: string | TemplateString | null | undefined;
}) => {
  const params = useParams<{ id: string }>();
  const factorsSetId = Number(params.id);
  const router = useRouter();
  const [error, setError] = useState('');
  let link = `/templates/factors-set/${factorsSetId}`;
  let routingLink = `/templates`;
  let buttonText = 'このセットからテンプレートを作成する';

  if (title === 'Templates') {
    link = `/factors-sets/${factorsSetId}`;
    routingLink = `/`;
    buttonText = 'このテンプレートからセットを作成する';
  }

  // Post request to create a new factor.
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${link}`);
      router.push(`${routingLink}`);
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
          variant="light"
          icon={<ExclamationCircleIcon />}
          title="Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      {
        <Button onClick={handleClick} variant="default">
          {buttonText}
        </Button>
      }
    </>
  );
};
