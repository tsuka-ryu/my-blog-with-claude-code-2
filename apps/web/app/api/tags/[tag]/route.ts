import { NextResponse } from 'next/server';

import { getArticlesByTag } from '../../../../lib/articles';
import { getRelatedTags } from '../../../../lib/tags';

export async function GET(_request: Request, { params }: { params: Promise<{ tag: string }> }) {
  try {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    const articles = getArticlesByTag(decodedTag);
    const relatedTags = getRelatedTags(decodedTag, 5);

    return NextResponse.json({
      tag: decodedTag,
      articles,
      relatedTags,
      count: articles.length,
    });
  } catch (error) {
    console.error('Error fetching articles by tag:', error);
    return NextResponse.json({ error: 'Failed to fetch articles by tag' }, { status: 500 });
  }
}
