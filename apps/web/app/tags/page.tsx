import { Header, Typography, Link } from '@repo/ui';
import { getAllTags, sortTagsByFrequency, sortTagsByName } from '@repo/utils';

import { getPublishedPosts } from '../_mocks/mock-data';

import type { TagInfo } from '@repo/utils';

export default function TagsPage() {
  const allPosts = getPublishedPosts();
  const allTags = getAllTags(allPosts);
  const tagsByFrequency = sortTagsByFrequency(allTags);
  const tagsByName = sortTagsByName(allTags);

  return (
    <div className='space-y-8'>
      <Header title='タグ一覧' description={`すべてのタグ（${allTags.length}件）`} />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ ls tags/ | wc -l
          </Typography>

          <Typography component='p' variant='body1' color='muted'>
            {allTags.length}個のタグが見つかりました
          </Typography>
        </div>

        <section className='space-y-8'>
          <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <Typography component='h3' variant='h4' color='accent'>
              $ tags --sort=frequency
            </Typography>

            <Typography component='p' variant='body2' color='muted'>
              使用頻度順
            </Typography>

            <div className='flex flex-wrap gap-3'>
              {tagsByFrequency.map((tag: TagInfo) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className='inline-flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-md border border-accent/20 hover:bg-accent/20 hover:border-accent/30 transition-colors'
                >
                  <span className='text-sm font-medium'>#{tag.name}</span>
                  <span className='text-xs bg-accent/20 px-2 py-0.5 rounded-full'>{tag.count}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <Typography component='h3' variant='h4' color='accent'>
              $ tags --sort=name
            </Typography>

            <Typography component='p' variant='body2' color='muted'>
              名前順（50音順）
            </Typography>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              {tagsByName.map((tag: TagInfo) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className='inline-flex items-center justify-between px-3 py-2 bg-terminal-bg-secondary rounded-md border border-terminal-ui-border hover:bg-terminal-bg-hover hover:border-terminal-ui-border-hover transition-colors'
                >
                  <span className='text-sm font-medium text-terminal-text-primary'>
                    #{tag.name}
                  </span>
                  <span className='text-xs text-terminal-text-muted'>({tag.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ cd ../
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/posts'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              全記事を見る
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
  const allTags = getAllTags(allPosts);

  return {
    title: 'タグ一覧 - 技術ブログ',
    description: `すべてのタグ一覧（${allTags.length}件）。記事をタグから探すことができます。`,
  };
}
