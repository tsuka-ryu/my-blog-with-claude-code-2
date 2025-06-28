import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '../../../_mocks/mock-data';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const posts = getAllPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
