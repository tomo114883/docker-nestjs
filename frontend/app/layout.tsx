import { Metadata } from 'next';
import localFont from 'next/font/local';
import axios from 'axios';
import '@mantine/charts/styles.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Auth',
  },
};

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'var(--font-geist-sans)',
});

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axios.defaults.withCredentials = true;

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased "flex w-screen flex-1 flex-col items-center justify-center"`}
      >
        {/* <QueryClientProvider client={queryClient}> */}
        <MantineProvider theme={theme}>{children}</MantineProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}
