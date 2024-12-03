import { Metadata } from 'next';
import localFont from 'next/font/local';
import '@mantine/charts/styles.css';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import { CustomAppShell } from './ui/custom-app-shell';
import { Provider } from './ui/provider';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <MantineProvider theme={theme}>
            <CustomAppShell>{children}</CustomAppShell>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
