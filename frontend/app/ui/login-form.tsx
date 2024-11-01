'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { z } from 'zod';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {
  Alert,
  Anchor,
  Button,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconDatabase } from '@tabler/icons-react';
import { AuthForm } from '../lib/definitions';

const schema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, { message: 'No email provided ' }),
  password: z.string().min(5, { message: 'Password should be min 5 chars' }),
});

export default function LoginForm() {
  console.log(`start LoginForm()`);

  const router = useRouter();
  const [isRegister, setIsRegister] = useState(true);
  const [error, setError] = useState('');
  const form = useForm<AuthForm>({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async () => {
    try {
      // Implement signUp for backend.
      if (!isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
          email: form.values.email,
          password: form.values.password,
        });
      }
      // Implement signIn for backend.
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      });
      // Reset form to initial values after successful submission and redirect to dashboard.
      form.reset();
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="w-max-screen">
      {error && ( // if error is true, show the alert
        <Alert
          my="md" // style props to add inline styles to any Mantine component
          variant="filled" // props to fill Mantine components by a solid background color
          icon={<ExclamationCircleIcon />}
          title="Authentication Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)} className="">
        {/* wrapper function for form onSubmit and onReset event handler */}
        <TextInput
          mt="md"
          id="email"
          label="Email*"
          placeholder="example@example.com"
          {...form.getInputProps('email')} // Get the input props as email from the form
        />
        <PasswordInput
          mt="md"
          id="password"
          label="Password*"
          placeholder="Password"
          description="Must be min 5 char"
          {...form.getInputProps('password')}
        />
        {/* Compose elements and components in a horizontal flex container */}
        <Group mt="xl" justify="apart">
          {/* Create a clickable text to sign up or login */}
          <Anchor
            component="button" // !! i do not know how this prop works
            type="button" // !! i do not know how this prop works
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister
              ? "Don't have an account? SignUp"
              : 'Have an account? Login'}
          </Anchor>
          <Button
            leftSection={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {isRegister ? 'Login' : 'SignUp'}
          </Button>
        </Group>
      </form>
    </div>
  );
}
