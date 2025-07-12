/* eslint-disable import-x/order */
import { Header, Typography, Link, Breadcrumb, PostNavigation } from '@repo/ui';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import {
  getPublishedArticlesSortedByDate,
  CONSTANTS,
  getArticleNavigation,
} from '@/lib/article-utils';
/* eslint-enable import-x/order */

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

interface PostData {
  title: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  description?: string;
}

interface PostNavigationData {
  title: string;
  slug: string;
  excerpt?: string;
}

async function getPost(slug: string): Promise<PostData | null> {
  // 実際のMarkdownファイルから記事を読み込み
  const { getArticleBySlug } = await import('@/lib/articles');

  const article = getArticleBySlug(slug);

  if (!article || article.frontMatter.published === false) {
    return null;
  }

  return {
    title: article.frontMatter.title,
    date: article.frontMatter.date,
    author: article.frontMatter.author || CONSTANTS.DEFAULT_AUTHOR,
    tags: article.frontMatter.tags || [],
    description: article.frontMatter.description,
    content: article.content,
  };
}

async function getPostNavigation(currentSlug: string): Promise<{
  previousPost?: PostNavigationData;
  nextPost?: PostNavigationData;
}> {
  const { getAllArticles } = await import('@/lib/articles');
  const allArticles = getPublishedArticlesSortedByDate(getAllArticles());
  return getArticleNavigation(allArticles, currentSlug);
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: '記事が見つかりません - 技術ブログ',
      description: '指定された記事が見つかりませんでした。',
    };
  }

  return {
    title: `${post.title} - 技術ブログ`,
    description: post.description || `${post.title}に関する技術記事です。`,
    openGraph: {
      title: post.title,
      description: post.description || `${post.title}に関する技術記事です。`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { previousPost, nextPost } = await getPostNavigation(slug);

  const breadcrumbItems = [
    { label: 'ホーム', href: '/' },
    { label: '記事一覧', href: '/posts' },
    { label: post.title },
  ];

  return (
    <div className='space-y-8'>
      <Breadcrumb items={breadcrumbItems} />
      <Header title={post.title} description={post.description} />

      <article className='space-y-8'>
        {/* 記事メタ情報 */}
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='space-y-2'>
              <Typography component='p' variant='caption' color='muted' className='font-mono'>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                by {post.author}
              </Typography>
            </div>

            <div className='flex flex-wrap gap-2'>
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className='inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors'
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 記事コンテンツ */}
        <div className='bg-card border border-accent rounded-lg p-8'>
          <div className='prose prose-lg max-w-none prose-headings:text-primary prose-p:text-muted prose-strong:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-background prose-pre:border prose-pre:border-accent/30'>
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className='text-2xl font-bold text-primary mt-8 mb-4'>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className='text-xl font-semibold text-primary mt-6 mb-3'>{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className='text-lg font-semibold text-primary mt-4 mb-2'>{children}</h3>
                ),
                p: ({ children }) => <p className='text-muted my-3 leading-relaxed'>{children}</p>,
                ul: ({ children }) => (
                  <ul className='text-muted my-4 ml-6 list-disc space-y-1'>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className='text-muted my-4 ml-6 list-decimal space-y-1'>{children}</ol>
                ),
                li: ({ children }) => <li className='text-muted'>{children}</li>,
                code: ({ children, className }) => {
                  const isInline = !className?.includes('language-');
                  return isInline ? (
                    <code className='text-accent bg-accent/10 px-1 py-0.5 rounded font-mono text-sm'>
                      {children}
                    </code>
                  ) : (
                    <code className='block'>{children}</code>
                  );
                },
                pre: ({ children }) => (
                  <pre className='bg-background border border-accent/30 rounded p-4 overflow-x-auto my-4 text-sm'>
                    {children}
                  </pre>
                ),
                strong: ({ children }) => (
                  <strong className='text-primary font-semibold'>{children}</strong>
                ),
                em: ({ children }) => <em className='text-primary italic'>{children}</em>,
                a: ({ href, children }) => (
                  <Link
                    href={href || '#'}
                    className='text-accent hover:underline focus:underline focus:outline-none'
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </Link>
                ),
                blockquote: ({ children }) => (
                  <blockquote className='border-l-4 border-accent/50 pl-4 my-4 italic text-muted/80'>
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className='my-8 border-accent/20' />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* 記事間ナビゲーション */}
        <PostNavigation previousPost={previousPost} nextPost={nextPost} />

        {/* ナビゲーション */}
        <div className='bg-card border border-accent rounded-lg p-6'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <div className='text-center sm:text-left'>
              <Typography component='h3' variant='h4' color='accent' className='mb-2'>
                $ cd ../
              </Typography>
              <Link
                href='/posts'
                className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
              >
                記事一覧に戻る
              </Link>
            </div>

            <div className='text-center sm:text-right'>
              <Typography component='h3' variant='h4' color='accent' className='mb-2'>
                $ find . -name &quot;*.md&quot;
              </Typography>
              <Link
                href='/'
                className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
