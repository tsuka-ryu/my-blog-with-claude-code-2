import { type ReactNode } from 'react';

import { locales } from '../lib/i18n-config';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
