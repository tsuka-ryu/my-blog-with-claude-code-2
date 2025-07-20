'use client';

import { Footer, Navigation, LanguageSwitcher } from '@repo/ui';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';

import { AnalyticsTracker } from '../../components/analytics-tracker';
import { locales, localeNames } from '../../lib/i18n-config';

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();

  const navigationItems = [
    { label: t('home'), href: `/${locale}` },
    { label: t('blog'), href: `/${locale}/posts` },
    { label: t('tags'), href: `/${locale}/tags` },
    { label: t('search'), href: `/${locale}/search` },
  ];

  const metadata = useTranslations('metadata');

  return (
    <div className='min-h-screen flex flex-col bg-background text-primary'>
      <AnalyticsTracker />
      <Navigation
        title={metadata('siteTitle')}
        items={navigationItems}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        showThemeToggle={true}
        extraContent={
          <LanguageSwitcher locales={locales} localeNames={localeNames} className='ml-4' />
        }
      />
      <main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
      <Footer />
    </div>
  );
}
