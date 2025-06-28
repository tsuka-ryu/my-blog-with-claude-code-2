import { Header, Typography, Link } from '@repo/ui';

import { getPublishedPosts } from '../_mocks/mock-data';

import { SearchResults } from './_components/search-results';

import type { BlogPostSummary } from '@repo/utils';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  const allPosts = getPublishedPosts();

  let searchResults: BlogPostSummary[] = [];
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    searchResults = allPosts.filter(
      post =>
        post.title.toLowerCase().includes(searchTerm) ||
        (post.description && post.description.toLowerCase().includes(searchTerm)) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        (post.category && post.category.toLowerCase().includes(searchTerm))
    );
  }

  return (
    <div className='space-y-8'>
      <Header
        title='検索結果'
        description={query ? `"${query}" の検索結果` : '記事を検索してください'}
      />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ grep -r &quot;{query || '...'}&quot; posts/
          </Typography>

          {query ? (
            <Typography component='p' variant='body1' color='muted'>
              &quot;{query}&quot; の検索結果: {searchResults.length}件
            </Typography>
          ) : (
            <Typography component='p' variant='body1' color='muted'>
              検索クエリを入力してください
            </Typography>
          )}
        </div>

        <SearchResults query={query} results={searchResults} totalPosts={allPosts.length} />

        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ cd ../
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/posts'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              全記事を見る
            </Link>
            <Link
              href='/tags'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              タグから探す
            </Link>
            <Link
              href='/'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
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
