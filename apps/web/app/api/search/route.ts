import { NextResponse } from 'next/server';

import { getPublishedArticleMetadata } from '../../../lib/articles';
import {
  createSearchIndex,
  formatSearchResultDescription,
  formatSearchResultTitle,
  searchArticles,
} from '../../../lib/search';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        results: [],
        query: '',
        total: 0,
      });
    }

    const articles = getPublishedArticleMetadata();
    const searchIndex = createSearchIndex(articles);
    const results = searchArticles(searchIndex, query, limit);

    const formattedResults = results.map(result => ({
      slug: result.item.slug,
      title: formatSearchResultTitle(result),
      description: formatSearchResultDescription(result),
      excerpt: result.item.excerpt,
      date: result.item.frontMatter.date,
      tags: result.item.frontMatter.tags,
      readingTime: result.item.readingTime,
      score: result.score,
    }));

    return NextResponse.json({
      results: formattedResults,
      query,
      total: formattedResults.length,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
