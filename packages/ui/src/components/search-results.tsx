'use client';

import { cn } from '@repo/utils';
import { Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

export interface SearchResultItem {
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  date: string;
  tags?: string[];
  readingTime?: number;
  score?: number;
}

export interface SearchResultsProps {
  results: SearchResultItem[];
  query: string;
  loading?: boolean;
  className?: string;
  onResultClick?: (slug: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function SearchResults({
  results,
  query,
  loading = false,
  className,
  onResultClick,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        <p className='text-terminal-muted text-sm'>検索中...</p>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='p-4 rounded-lg border border-terminal-border bg-terminal-background animate-pulse'
          >
            <div className='h-6 bg-terminal-border rounded w-3/4 mb-2' />
            <div className='h-4 bg-terminal-border rounded w-full mb-2' />
            <div className='h-4 bg-terminal-border rounded w-2/3' />
          </div>
        ))}
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className='text-terminal-muted'>
          「<span className='text-terminal-foreground font-medium'>{query}</span>
          」に一致する記事が見つかりませんでした
        </p>
        <p className='text-terminal-muted text-sm mt-2'>別のキーワードで検索してみてください</p>
      </div>
    );
  }

  if (!query) {
    return null;
  }

  return (
    <div className={cn('space-y-4', className)}>
      <p className='text-terminal-muted text-sm'>{results.length}件の記事が見つかりました</p>
      {results.map(result => (
        <article
          key={result.slug}
          className={cn(
            'group relative rounded-lg border border-terminal-border bg-terminal-background p-4',
            'hover:border-terminal-primary/50 hover:bg-terminal-background/80',
            'transition-all duration-200'
          )}
        >
          <Link
            href={`/posts/${result.slug}`}
            onClick={() => onResultClick?.(result.slug)}
            className='absolute inset-0 z-10'
            aria-label={`${result.title}を読む`}
          />
          <h3
            className='text-lg font-semibold text-terminal-foreground mb-2 group-hover:text-terminal-primary transition-colors'
            dangerouslySetInnerHTML={{ __html: result.title }}
          />
          {(result.description || result.excerpt) && (
            <p
              className='text-terminal-muted text-sm mb-3 line-clamp-2'
              dangerouslySetInnerHTML={{
                __html: result.description || result.excerpt || '',
              }}
            />
          )}
          <div className='flex flex-wrap items-center gap-4 text-xs text-terminal-muted'>
            <div className='flex items-center gap-1'>
              <Calendar className='h-3 w-3' />
              <time dateTime={result.date}>{formatDate(result.date)}</time>
            </div>
            {result.readingTime && (
              <div className='flex items-center gap-1'>
                <Clock className='h-3 w-3' />
                <span>{result.readingTime}分</span>
              </div>
            )}
            {result.tags && result.tags.length > 0 && (
              <div className='flex items-center gap-1'>
                <Tag className='h-3 w-3' />
                <span>{result.tags.join(', ')}</span>
              </div>
            )}
            {result.score !== undefined && (
              <div className='ml-auto text-terminal-primary/70'>
                関連度: {Math.round((1 - result.score) * 100)}%
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
