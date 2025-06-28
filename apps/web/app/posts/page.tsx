import { Header, Typography, Link, PostCard } from '@repo/ui';

import { getPublishedPosts } from '../_mocks/mock-data';

import type { BlogPostSummary } from '@repo/utils';

const POSTS_PER_PAGE = 10;

interface PostsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const allPosts = getPublishedPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <div className='space-y-8'>
      <Header title='記事一覧' description={`技術記事・思考の整理（全${totalPosts}件）`} />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ ls posts/ | wc -l
          </Typography>

          <Typography component='p' variant='body1' color='muted'>
            {totalPosts}件の記事が見つかりました
          </Typography>

          {totalPages > 1 && (
            <Typography component='p' variant='caption' color='muted'>
              ページ {currentPage} / {totalPages}
            </Typography>
          )}
        </div>

        <section className='space-y-6'>
          <div className='grid gap-6'>
            {currentPosts.map((post: BlogPostSummary) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {totalPages > 1 && (
          <nav className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <Typography component='h3' variant='h4' color='accent'>
              $ posts --page
            </Typography>

            <div className='flex justify-center items-center gap-2'>
              {currentPage > 1 && (
                <Link
                  href={`/posts?page=${currentPage - 1}`}
                  className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
                >
                  ← 前のページ
                </Link>
              )}

              <div className='flex gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  const isActive = page === currentPage;
                  const isNearCurrent = Math.abs(page - currentPage) <= 2;
                  const isEdge = page === 1 || page === totalPages;

                  if (!isNearCurrent && !isEdge) {
                    if (page === 2 && currentPage > 4) {
                      return (
                        <span key={page} className='px-2 text-terminal-text-muted'>
                          ...
                        </span>
                      );
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 3) {
                      return (
                        <span key={page} className='px-2 text-terminal-text-muted'>
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <Link
                      key={page}
                      href={`/posts?page=${page}`}
                      className={`inline-flex items-center justify-center font-medium rounded-md border transition-colors px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary ${
                        isActive
                          ? 'bg-terminal-accent text-terminal-accent-foreground border-terminal-accent'
                          : 'bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover'
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`/posts?page=${currentPage + 1}`}
                  className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
                >
                  次のページ →
                </Link>
              )}
            </div>
          </nav>
        )}

        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ cd ../
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/tags'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              タグから探す
            </Link>
            <Link
              href='/'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata() {
  const allPosts = getPublishedPosts();
  const totalPosts = allPosts.length;

  return {
    title: '記事一覧 - 技術ブログ',
    description: `技術記事・思考の整理（全${totalPosts}件）。プログラミング、開発ツール、技術トレンドについての記事。`,
  };
}
