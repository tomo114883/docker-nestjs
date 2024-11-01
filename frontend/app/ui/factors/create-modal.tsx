'use client';

import { useState } from 'react';
import axios from 'axios';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import {
  Alert,
  Button,
  Group,
  Modal,
  Radio,
  Slider,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

export default function CreateModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState('');

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      weight: 1,
      variable: true,
    },

    validate: {
      name: (value) => (value ? null : '名前を入力してください'),
    },
  });

  const marks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  // TODO: Post request to create a new factor.
  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/motivators`, {
        name: form.values.name,
        weight: form.values.weight,
        variable: form.values.variable,
      });
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
      <Modal opened={opened} onClose={close} title="要因の新規作成">
        {
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="名前"
              placeholder="名前"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Slider
              color="blue"
              radius="lg"
              min={1}
              max={5}
              marks={marks}
              step={1}
            />

            <Radio.Group name="variable" label="自分の意志で変更可能か">
              <Group mt="xs">
                <Radio value="true" label="変数" />
                <Radio value="false" label="定数" />
              </Group>
            </Radio.Group>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        }
      </Modal>

      <Button className="mr-auto px-4" onClick={open}>
        新規作成
      </Button>
    </>
  );
}
