import Fuse from 'fuse.js';

import type { ArticleMetadata } from './articles';

export interface SearchResult {
  item: ArticleMetadata;
  score?: number;
  matches?: Array<{
    indices: Array<[number, number]>;
    value?: string;
    key?: string;
  }>;
}

export function createSearchIndex(articles: ArticleMetadata[]) {
  const options = {
    keys: [
      { name: 'frontMatter.title', weight: 0.5 },
      { name: 'frontMatter.description', weight: 0.3 },
      { name: 'excerpt', weight: 0.15 },
      { name: 'frontMatter.tags', weight: 0.05 },
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
    findAllMatches: true,
    ignoreLocation: true,
  };

  return new Fuse(articles, options);
}

export function searchArticles(
  searchIndex: ReturnType<typeof createSearchIndex>,
  query: string,
  limit?: number
): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = searchIndex.search(query, limit ? { limit } : undefined);

  return results.map(result => ({
    item: result.item,
    score: result.score,
    matches: result.matches as SearchResult['matches'],
  }));
}

export function highlightSearchResult(text: string, indices: Array<[number, number]>): string {
  if (!indices || indices.length === 0) {
    return text;
  }

  let result = '';
  let lastIndex = 0;

  indices.forEach(([start, end]) => {
    result += text.slice(lastIndex, start);
    result += `<mark class="bg-terminal-warning/30 text-terminal-foreground rounded-sm px-0.5">${text.slice(
      start,
      end + 1
    )}</mark>`;
    lastIndex = end + 1;
  });

  result += text.slice(lastIndex);
  return result;
}

export function getMatchedField(
  matches: SearchResult['matches'],
  fieldKey: string
): string | undefined {
  if (!matches) return undefined;

  const match = matches.find(m => m.key === fieldKey);
  return match?.value;
}

export function formatSearchResultTitle(result: SearchResult): string {
  const titleMatch = result.matches?.find(m => m.key === 'frontMatter.title');

  if (titleMatch && titleMatch.indices && titleMatch.value) {
    return highlightSearchResult(titleMatch.value, titleMatch.indices);
  }

  return result.item.frontMatter.title;
}

export function formatSearchResultDescription(result: SearchResult): string {
  const descriptionMatch = result.matches?.find(m => m.key === 'frontMatter.description');
  const excerptMatch = result.matches?.find(m => m.key === 'excerpt');

  if (descriptionMatch && descriptionMatch.indices && descriptionMatch.value) {
    return highlightSearchResult(descriptionMatch.value, descriptionMatch.indices);
  }

  if (excerptMatch && excerptMatch.indices && excerptMatch.value) {
    return highlightSearchResult(excerptMatch.value, excerptMatch.indices);
  }

  return result.item.frontMatter.description || result.item.excerpt || '';
}
