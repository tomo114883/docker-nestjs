'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { AuthForm } from './lib/definitions';
import axios from 'axios';
import {
  ExclamationCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';
import { Alert, Group, PasswordInput, TextInput } from '@mantine/core';

const schema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .min(1, { message: 'No email provided ' }),
  password: z
    .string()
    .min(1, { message: 'No password provided ' })
    .min(5, { message: 'Password should be min 5 chars' }),
});

export default function Home() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
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
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
          email: form.values.email,
          password: form.values.password,
        });
      }
      // Implement signIn for backend.
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
        email: form.values.email,
        password: form.values.password,
      });
      // Reset form to initial values after successful submission and redirect to dashboard.
      form.reset();
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  return (
    <main>
      <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
      </form>
    </main>
  );
}
