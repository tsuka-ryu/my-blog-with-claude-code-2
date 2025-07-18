'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '../utils/cn';

export interface LanguageSwitcherProps {
  locales: readonly string[];
  localeNames: Record<string, string>;
  className?: string;
}

export function LanguageSwitcher({ locales, localeNames, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const handleLocaleChange = (newLocale: string) => {
    // パスから現在のロケールを除去し、新しいロケールで置き換える
    const segments = pathname.split('/');
    const localeIndex = segments.findIndex(segment => locales.includes(segment));

    if (localeIndex !== -1) {
      segments[localeIndex] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className='text-sm text-muted-foreground'>Language:</span>
      <select
        value={currentLocale}
        onChange={e => handleLocaleChange(e.target.value)}
        className={cn(
          'bg-transparent text-sm border border-border rounded px-2 py-1',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'hover:bg-accent hover:text-accent-foreground transition-colors',
          'cursor-pointer'
        )}
        aria-label='Language selection'
      >
        {locales.map(locale => (
          <option key={locale} value={locale} className='bg-background'>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
