import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MarkdownContent } from '../../../components/markdown-content';
import { getPostBySlug, getAllPostSlugs } from '../../../lib/posts';

import type { Metadata } from 'next';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className='max-w-4xl mx-auto px-4 py-8'>
      <div className='mb-8'>
        <Link href='/posts' className='text-green-400 hover:text-green-300 text-sm font-mono'>
          ← 記事一覧に戻る
        </Link>
      </div>

      <header className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-green-400 mb-4 font-mono'>
          {post.title}
        </h1>

        <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono'>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          {post.tags.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {post.tags.map(tag => (
                <span key={tag} className='px-2 py-1 bg-gray-800 text-green-400 rounded text-xs'>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.description && <p className='mt-4 text-gray-300 text-lg'>{post.description}</p>}
      </header>

      <main className='text-gray-100'>
        <MarkdownContent content={post.content} />
      </main>

      <footer className='mt-12 pt-8 border-t border-gray-700'>
        <Link href='/posts' className='text-green-400 hover:text-green-300 font-mono'>
          ← 記事一覧に戻る
        </Link>
      </footer>
    </article>
  );
}
