import { NextResponse } from 'next/server';

import { getTagsWithCount, getTagCloudData, getPopularTags } from '../../../lib/tags';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');
    const limit = searchParams.get('limit');

    switch (format) {
      case 'cloud': {
        return NextResponse.json(getTagCloudData());
      }
      case 'popular': {
        const popularLimit = limit ? parseInt(limit, 10) : 10;
        return NextResponse.json(getPopularTags(popularLimit));
      }
      default: {
        return NextResponse.json(getTagsWithCount());
      }
    }
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
