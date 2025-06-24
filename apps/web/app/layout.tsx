/* eslint-disable import-x/order */
import { ThemeProvider } from '@repo/ui';
import { JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import type { Metadata } from 'next';

import { LayoutClient } from './layout-client';
import './globals.css';
/* eslint-enable import-x/order */

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: '技術ブログ',
  description: '技術共有・解説記事・Podcast感想を発信しています',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={`${jetbrainsMono.variable} ${notoSansJP.variable} font-mono`}>
        <ThemeProvider>
          <LayoutClient>{children}</LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
