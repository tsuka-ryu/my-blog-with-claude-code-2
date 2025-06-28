import { NextResponse } from 'next/server';

import { getAllPosts } from '../../_mocks/mock-data';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
