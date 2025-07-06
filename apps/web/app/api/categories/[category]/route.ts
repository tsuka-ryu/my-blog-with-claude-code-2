import { NextResponse } from 'next/server';

import { getArticlesByCategory } from '../../../../lib/articles';
import { getRelatedCategories, getCategoryBreadcrumb } from '../../../../lib/categories';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    const articles = getArticlesByCategory(decodedCategory);
    const relatedCategories = getRelatedCategories(decodedCategory);
    const breadcrumb = getCategoryBreadcrumb(decodedCategory);

    return NextResponse.json({
      category: decodedCategory,
      articles,
      relatedCategories,
      breadcrumb,
      count: articles.length,
    });
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return NextResponse.json({ error: 'Failed to fetch articles by category' }, { status: 500 });
  }
}
