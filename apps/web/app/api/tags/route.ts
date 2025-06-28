import { NextResponse } from 'next/server';
import { getAllPosts } from '../../_mocks/mock-data';

export async function GET() {
  try {
    const posts = getAllPosts();
    const tagsMap = new Map<string, number>();

    posts.forEach(post => {
      post.tags.forEach(tag => {
        tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
      });
    });

    const tags = Array.from(tagsMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));

    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
