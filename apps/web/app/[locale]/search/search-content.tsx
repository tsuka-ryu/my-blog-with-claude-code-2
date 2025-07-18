'use client';

import { SearchBox, SearchResults, Typography } from '@repo/ui';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import type { SearchResultItem } from '@repo/ui';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery, performSearch]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      const params = new URLSearchParams(searchParams.toString());

      if (newQuery) {
        params.set('q', newQuery);
      } else {
        params.delete('q');
      }

      router.push(`/search?${params.toString()}`, { scroll: false });
      performSearch(newQuery);
    },
    [router, searchParams, performSearch]
  );

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setSearched(false);
    router.push('/search', { scroll: false });
  }, [router]);

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-8'>
        <SearchBox
          value={query}
          onChange={handleSearch}
          onClear={handleClear}
          placeholder='記事を検索...'
          autoFocus
        />
      </div>

      {!searched && !loading && (
        <div className='text-center py-12'>
          <Typography className='text-terminal-muted mb-4'>
            キーワードを入力して記事を検索してください
          </Typography>
          <Typography className='text-terminal-muted text-sm'>
            タイトル、説明文、タグなどから検索できます
          </Typography>
        </div>
      )}

      {searched && (
        <SearchResults
          results={results}
          query={query}
          loading={loading}
          onResultClick={() => {
            // 結果クリック時の処理（オプション）
          }}
        />
      )}
    </div>
  );
}
