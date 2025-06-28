'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Typography, PostCard } from '@repo/ui';

import type { BlogPostSummary } from '@repo/utils';

interface SearchResultsProps {
  query: string;
  results: BlogPostSummary[];
  totalPosts: number;
}

export function SearchResults({ query, results, totalPosts }: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInput.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set('q', searchInput.trim());
      router.push(`/search?${params.toString()}`);
    } else {
      router.push('/search');
    }
  };

  const handleClear = () => {
    setSearchInput('');
    router.push('/search');
  };

  return (
    <div className='space-y-6'>
      <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
        <Typography component='h3' variant='h4' color='accent'>
          $ search --interactive
        </Typography>

        <form onSubmit={handleSearch} className='space-y-4'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder='記事タイトル、内容、タグで検索...'
              className='flex-1 px-3 py-2 border border-terminal-ui-border rounded-md bg-terminal-bg-primary text-terminal-text-primary placeholder:text-terminal-text-muted focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:border-terminal-ui-border-focus'
            />
            <button
              type='submit'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              検索
            </button>
            {query && (
              <button
                type='button'
                onClick={handleClear}
                className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
              >
                クリア
              </button>
            )}
          </div>
        </form>

        <div className='text-sm text-terminal-text-muted space-y-1'>
          <Typography component='p' variant='caption' color='muted'>
            ヒント: タイトル、説明、タグ、カテゴリから検索できます
          </Typography>
          <Typography component='p' variant='caption' color='muted'>
            全{totalPosts}件の記事から検索
          </Typography>
        </div>
      </div>

      {query && (
        <section className='space-y-6'>
          {results.length > 0 ? (
            <>
              <div className='border-l-2 border-accent pl-4'>
                <Typography component='h3' variant='h4' color='primary'>
                  検索結果 ({results.length}件)
                </Typography>
              </div>

              <div className='grid gap-6'>
                {results.map((post: BlogPostSummary) => (
                  <PostCard key={post.slug} post={post} highlightTerm={query} />
                ))}
              </div>
            </>
          ) : (
            <div className='bg-card border border-accent rounded-lg p-8 text-center space-y-4'>
              <Typography component='h3' variant='h3' color='muted'>
                $ grep: no matches found
              </Typography>
              <Typography component='p' variant='body1' color='muted'>
                &quot;{query}&quot; に一致する記事が見つかりませんでした
              </Typography>
              <div className='space-y-2'>
                <Typography component='p' variant='body2' color='muted'>
                  検索のヒント:
                </Typography>
                <ul className='text-sm text-terminal-text-muted space-y-1'>
                  <li>• 別のキーワードを試してみてください</li>
                  <li>• スペルを確認してください</li>
                  <li>• より一般的な用語を使用してください</li>
                  <li>• タグ名での検索も試してみてください</li>
                </ul>
              </div>
            </div>
          )}
        </section>
      )}

      {!query && (
        <div className='bg-card border border-accent rounded-lg p-8 text-center space-y-4'>
          <Typography component='h3' variant='h3' color='accent'>
            $ man search
          </Typography>
          <Typography component='p' variant='body1' color='muted'>
            上の検索フォームに検索したいキーワードを入力してください
          </Typography>
          <div className='space-y-2'>
            <Typography component='p' variant='body2' color='muted'>
              よく検索されるキーワード:
            </Typography>
            <div className='flex flex-wrap gap-2 justify-center'>
              {['React', 'TypeScript', 'Next.js', 'Frontend', 'Podcast'].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchInput(tag);
                    const params = new URLSearchParams(searchParams);
                    params.set('q', tag);
                    router.push(`/search?${params.toString()}`);
                  }}
                  className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
