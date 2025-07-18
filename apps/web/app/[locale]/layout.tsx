/* eslint-disable import-x/order */
import { ThemeProvider } from '@repo/ui';
import { JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { LayoutClient } from './layout-client';
import { type Locale, locales } from '../../lib/i18n-config';
import '../globals.css';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    title: messages.metadata.siteTitle,
    description: messages.metadata.siteDescription,
    openGraph: {
      title: messages.metadata.siteTitle,
      description: messages.metadata.siteDescription,
      locale: locale,
      alternateLocale: locale === 'ja' ? ['en'] : ['ja'],
      type: 'website',
    },
    alternates: {
      languages: {
        ja: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    other: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/feed.xml`,
      'application/atom+xml': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/atom.xml`,
    },
  };
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  // ロケールの検証
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${jetbrainsMono.variable} ${notoSansJP.variable} font-mono`}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LayoutClient>{children}</LayoutClient>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
