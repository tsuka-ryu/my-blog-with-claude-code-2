import { Loading, Typography } from '@repo/ui';
import { Suspense } from 'react';

import SearchContent from './search-content';

export default function SearchPage() {
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';

  if (query) {
    return {
      title: `"${query}" の検索結果 - 技術ブログ`,
      description: `"${query}" の検索結果ページ。技術記事・思考の整理から関連する記事を検索できます。`,
    };
  }

  return {
    title: '検索 - 技術ブログ',
    description:
      '技術記事・思考の整理から記事を検索。タイトル、内容、タグから記事を見つけることができます。',
  };
}
