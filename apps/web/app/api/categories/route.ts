import { NextResponse } from 'next/server';

import {
  getCategoriesWithCount,
  getCategoryHierarchy,
  getCategoryTree,
  getPopularCategories,
} from '../../../lib/categories';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const limit = searchParams.get('limit');

    switch (format) {
      case 'hierarchy': {
        return NextResponse.json(getCategoryHierarchy());
      }
      case 'tree': {
        return NextResponse.json(getCategoryTree());
      }
      case 'popular': {
        const popularLimit = limit ? parseInt(limit, 10) : 10;
        return NextResponse.json(getPopularCategories(popularLimit));
      }
      default: {
        return NextResponse.json(getCategoriesWithCount());
      }
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
