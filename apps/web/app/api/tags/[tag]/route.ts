import { NextResponse } from 'next/server';

import { getAllPosts } from '../../../_mocks/mock-data';

export async function GET(_request: Request, { params }: { params: Promise<{ tag: string }> }) {
  try {
    const { tag } = await params;
    const posts = getAllPosts();
    const filteredPosts = posts.filter(post =>
      post.tags.some(postTag => postTag.toLowerCase() === decodeURIComponent(tag).toLowerCase())
    );

    return NextResponse.json(filteredPosts);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts by tag' }, { status: 500 });
  }
}
