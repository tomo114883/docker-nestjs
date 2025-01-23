'use client';

import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Alert, Autocomplete, Button, Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

const schema = z.object({
  name: z.string(),
});

export const CreateFactorsSet = () => {
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      name: ``,
    },
    validate: zodResolver(schema),
  });

  // Post request to create a new factor.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/factors-sets`, {
        name: form.values.name,
      });
      form.reset();
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
      <h3>新規作成</h3>
      {
        <form onSubmit={handleSubmit}>
          <Autocomplete
            withAsterisk
            label="名前"
            placeholder="名前"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Group mt="md">
            <Button type="submit">新規作成</Button>
          </Group>
        </form>
      }
    </>
  );
};
