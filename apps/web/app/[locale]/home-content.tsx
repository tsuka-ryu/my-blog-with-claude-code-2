'use client';

import { Header, Link, Typography, RecentPosts, PopularPosts } from '@repo/ui';
import { useTranslations } from 'next-intl';

import type { RecentPost, PopularPost } from '@repo/ui';

interface HomeContentProps {
  recentPosts: RecentPost[];
  popularPosts: PopularPost[];
  locale: string;
}

export function HomeContent({ recentPosts, popularPosts, locale }: HomeContentProps) {
  const t = useTranslations('common');
  const metadata = useTranslations('metadata');

  return (
    <div className='space-y-8'>
      <Header title={metadata('siteTitle')} description={metadata('siteDescription')} />

      <section className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-8 space-y-6'>
          <div className='text-center space-y-4'>
            <Typography component='h2' variant='h2' color='accent'>
              $ whoami
            </Typography>
            <Typography component='p' variant='body1' color='muted'>
              {locale === 'ja' ? (
                <>
                  技術者として学んだこと、体験したこと、考えたことを
                  <br />
                  ターミナル風のデザインで記録・共有する技術ブログです
                </>
              ) : (
                <>
                  A tech blog for sharing what I&apos;ve learned, experienced, and thought about
                  <br />
                  as a developer, designed with a terminal-inspired interface
                </>
              )}
            </Typography>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-6'>
            <div className='text-center space-y-3 p-4 bg-background border border-accent/30 rounded-lg'>
              <Typography component='h3' variant='h4' color='primary'>
                📝 {locale === 'ja' ? '技術記事' : 'Tech Articles'}
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                {locale === 'ja' ? (
                  <>
                    開発で学んだ技術や
                    <br />
                    ツールの使い方を共有
                  </>
                ) : (
                  <>
                    Sharing technologies and
                    <br />
                    tools learned in development
                  </>
                )}
              </Typography>
            </div>

            <div className='text-center space-y-3 p-4 bg-background border border-accent/30 rounded-lg'>
              <Typography component='h3' variant='h4' color='primary'>
                🎧 {locale === 'ja' ? 'Podcast感想' : 'Podcast Reviews'}
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                {locale === 'ja' ? (
                  <>
                    技術系Podcastを聞いた
                    <br />
                    感想や学びを記録
                  </>
                ) : (
                  <>
                    Recording thoughts and learnings
                    <br />
                    from tech podcasts
                  </>
                )}
              </Typography>
            </div>

            <div className='text-center space-y-3 p-4 bg-background border border-accent/30 rounded-lg'>
              <Typography component='h3' variant='h4' color='primary'>
                💭 {locale === 'ja' ? '思考の整理' : 'Thoughts'}
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                {locale === 'ja' ? (
                  <>
                    技術やキャリアについて
                    <br />
                    考えたことを整理・共有
                  </>
                ) : (
                  <>
                    Organizing and sharing
                    <br />
                    thoughts on tech and career
                  </>
                )}
              </Typography>
            </div>
          </div>
        </div>

        {/* 最新記事セクション */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-card border border-accent rounded-lg p-6'>
            <RecentPosts
              posts={recentPosts}
              maxItems={5}
              showViewAllLink={true}
              viewAllHref={`/${locale}/posts`}
            />
          </div>

          <div className='bg-card border border-accent rounded-lg p-6'>
            <PopularPosts posts={popularPosts} maxItems={5} />
          </div>
        </div>

        <div className='text-center space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ explore --help
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href={`/${locale}/posts`}
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              {t('allPosts')}
            </Link>
            <Link
              href={`/${locale}/tags`}
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              {t('tags')}
            </Link>
            <Link
              href={`/${locale}/search`}
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              {t('search')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
