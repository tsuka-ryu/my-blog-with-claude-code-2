/* eslint-disable import-x/order */
import {
  Header,
  Typography,
  Link,
  Breadcrumb,
  PostNavigation,
  ShareButtons,
  ReadingTime,
  TableOfContents,
  Comments,
} from '@repo/ui';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import {
  getPublishedArticlesSortedByDate,
  CONSTANTS,
  getArticleNavigation,
} from '@/lib/article-utils';
import { generateMetadata as createMetadata, generateBreadcrumbJsonLd } from '@/lib/metadata-utils';
import { type Locale } from '@/lib/i18n-config';
/* eslint-enable import-x/order */

interface PostPageProps {
  params: Promise<{ slug: string; locale: Locale }>;
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

// ISR設定: 静的生成のパフォーマンス最適化
export const dynamic = 'force-static';
export const revalidate = 3600; // 1時間ごとに再生成

export async function generateStaticParams() {
  // ビルド時に生成する記事パスを取得
  const { getAllArticles } = await import('@/lib/articles');
  const allArticles = getPublishedArticlesSortedByDate(getAllArticles());

  return allArticles.map(article => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug);

  if (!post) {
    return createMetadata({
      title: '記事が見つかりません',
      description: '指定された記事が見つかりませんでした。',
      locale,
      url: `/${locale}/posts/${slug}`,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description || `${post.title}に関する技術記事です。`,
    locale,
    url: `/${locale}/posts/${slug}`,
    type: 'article',
    publishedTime: post.date,
    authors: [post.author],
    tags: post.tags,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, locale } = await params;
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

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'ホーム', url: '/' },
    { name: '記事一覧', url: '/posts' },
    { name: post.title },
  ]);

  // 記事のURL
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/posts/${slug}`;

  // 記事から見出しを抽出して目次を生成
  const generateTableOfContents = (content: string) => {
    const lines = content.split('\n');
    const items: Array<{ id: string; title: string; level: number }> = [];

    lines.forEach(line => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match && match[1] && match[2]) {
        const level = match[1].length;
        const title = match[2].trim();
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-');
        items.push({ id, title, level });
      }
    });

    return items;
  };

  const tableOfContentsItems = generateTableOfContents(post.content);

  return (
    <>
      {/* 構造化データ */}
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      <div className='space-y-8'>
        <Breadcrumb items={breadcrumbItems} />
        <Header title={post.title} description={post.description} />

        <article className='space-y-8'>
          {/* 記事メタ情報 */}
          <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='space-y-2'>
                <div className='flex items-center gap-4'>
                  <Typography component='p' variant='caption' color='muted' className='font-mono'>
                    {new Date(post.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                  <ReadingTime content={post.content} />
                </div>
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

            {/* シェアボタン */}
            <ShareButtons title={post.title} url={currentUrl} description={post.description} />
          </div>

          {/* メインコンテンツエリア */}
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* 記事コンテンツ */}
            <div className='lg:col-span-3'>
              <div className='bg-card border border-accent rounded-lg p-8'>
            <div className='prose prose-lg max-w-none prose-headings:text-primary prose-p:text-muted prose-strong:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-background prose-pre:border prose-pre:border-accent/30'>
              <ReactMarkdown
                components={{
                  h1: ({ children }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/[\s_-]+/g, '-');
                    return (
                      <h1 id={id} className='text-2xl font-bold text-primary mt-8 mb-4'>
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/[\s_-]+/g, '-');
                    return (
                      <h2 id={id} className='text-xl font-semibold text-primary mt-6 mb-3'>
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/[\s_-]+/g, '-');
                    return (
                      <h3 id={id} className='text-lg font-semibold text-primary mt-4 mb-2'>
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children }) => (
                    <p className='text-muted my-3 leading-relaxed'>{children}</p>
                  ),
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
            </div>

            {/* サイドバー - 目次 */}
            <div className='lg:col-span-1 order-first lg:order-last'>
              {tableOfContentsItems.length > 0 && (
                <div className='lg:sticky lg:top-4 lg:max-h-screen lg:overflow-y-auto mb-8 lg:mb-0'>
                  <TableOfContents 
                    items={tableOfContentsItems} 
                    sticky={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 記事間ナビゲーション */}
          <PostNavigation previousPost={previousPost} nextPost={nextPost} />

          {/* コメントセクション */}
          <div className='bg-card border border-accent rounded-lg p-8'>
            <Comments
              repo='tsukaryu/my-blog-with-claude-code'
              repoId='R_kgDONcHjVA'
              category='General'
              categoryId='DIC_kwDONcHjVM4ClsVa'
              mapping='pathname'
              lang={locale === 'ja' ? 'ja' : 'en'}
            />
          </div>

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
    </>
  );
}
