'use client';

import localFont from 'next/font/local';
import './globals.css';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@mantine/charts/styles.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// export const metadata: Metadata = {
//   title: {
//     template: '%s',
//     default: 'Auth',
//   },
// };

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'var(--font-geist-sans)',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`,
      );
      axios.defaults.headers.common['csrf-token'] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased "flex w-screen flex-1 flex-col items-center justify-center"`}
      >
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>{children}</MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
