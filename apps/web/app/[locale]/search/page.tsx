import { Loading, Typography } from '@repo/ui';
import { Suspense } from 'react';

import { locales } from '../../../lib/i18n-config';

import SearchContent from './search-content';

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // パラメータを解決するが、localeは現在使用していない

  return (
    <main className='container mx-auto px-4 py-8 min-h-screen'>
      <Typography variant='h1' className='mb-8'>
        検索
      </Typography>
      <Suspense fallback={<Loading />}>
        <SearchContent />
      </Suspense>
    </main>
  );
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  searchParams,
  params,
}: {
  searchParams: Promise<{ q?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const searchParamsData = await searchParams;
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const query = searchParamsData.q || '';

  if (query) {
    return {
      title: messages.metadata.search.titleWithQuery.replace('{query}', query),
      description: messages.metadata.search.descriptionWithQuery.replace('{query}', query),
    };
  }

  return {
    title: messages.metadata.search.title,
    description: messages.metadata.search.description,
  };
}
