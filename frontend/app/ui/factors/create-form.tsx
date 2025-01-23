'use client';

import { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { CreateFormProps } from '@/app/lib/definitions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import {
  Alert,
  Autocomplete,
  Button,
  Group,
  Radio,
  Slider,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

const schema = z.object({
  name: z.string(),
  weight: z.number(),
  variable: z.string(),
});

export function CreateForm({ factorsSetId, factors, state }: CreateFormProps) {
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      name: `${factors}`,
      weight: 1,
      variable: 'variable',
    },
    validate: zodResolver(schema),
  });

  // marks for Slider.
  const marks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  // Post request to create a new factor.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const close = state;
      const variable = form.values.variable === 'variable';
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/factors-sets/${factorsSetId}/${factors}`,
        {
          name: form.values.name,
          weight: form.values.weight,
          variable: variable,
        },
      );
      form.reset();
      close(); // close modal
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const options = [
    'motivator1',
    'motivator2',
    'motivator3',
    'motivator4',
    'motivator5',
  ];

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
          <Autocomplete
            withAsterisk
            label="名前"
            placeholder="名前"
            data={options}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Slider
            pt={20}
            pb={40}
            color="blue"
            radius="lg"
            min={1}
            max={5}
            marks={marks}
            step={1}
            value={form.values.weight} // Add this line
            {...form.getInputProps('weight')}
          />

          <Radio.Group
            name="variable"
            label="自分の意志で変更可能か"
            {...form.getInputProps('variable')}
          >
            <Group mt="xs">
              <Radio value={'variable'} label="変数" />
              <Radio value={'constant'} label="定数" />
            </Group>
          </Radio.Group>

          <Group justify="flex-end" mt="md">
            <Button type="submit">送信</Button>
          </Group>
        </form>
      }
    </>
  );
}
