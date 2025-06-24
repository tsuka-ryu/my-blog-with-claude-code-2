import { Header, Typography, Link, PostCard } from '@repo/ui';
import { getPostsByTag, getTagNameFromSlug, getAllTags } from '@repo/utils';
import { notFound } from 'next/navigation';

import { getPublishedPosts } from '../../../lib/mock-data';

import type { TagPageParams, TagInfo, BlogPostSummary } from '@repo/utils';

interface TagPageProps {
  params: Promise<TagPageParams>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagName = getTagNameFromSlug(tag);

  const allPosts = getPublishedPosts();
  const taggedPosts = getPostsByTag(allPosts, tag);

  if (taggedPosts.length === 0) {
    notFound();
  }

  const allTags = getAllTags(allPosts);
  const currentTag = allTags.find((t: TagInfo) => t.slug === tag || t.name === tagName);

  return (
    <div className='space-y-8'>
      <Header
        title={`#${tagName}`}
        description={`「${tagName}」に関する記事一覧（${taggedPosts.length}件）`}
      />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ ls -la posts/ | grep &quot;{tagName}&quot;
          </Typography>

          <Typography component='p' variant='body1' color='muted'>
            {taggedPosts.length}件の記事が見つかりました
          </Typography>

          {currentTag && (
            <div className='flex items-center gap-4 text-sm'>
              <Typography component='span' variant='caption' color='muted'>
                タグ情報:
              </Typography>
              <span className='px-2 py-1 bg-accent/10 text-accent rounded border border-accent/20'>
                #{currentTag.name} ({currentTag.count}件)
              </span>
            </div>
          )}
        </div>

        <section className='space-y-6'>
          <div className='grid gap-6'>
            {taggedPosts.map((post: BlogPostSummary) => (
              <PostCard key={post.slug} post={post} />
            ))}
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
              href='/tags'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              他のタグを見る
            </Link>
            <Link
              href='/'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const tagName = getTagNameFromSlug(tag);

  const allPosts = getPublishedPosts();
  const taggedPosts = getPostsByTag(allPosts, tag);

  return {
    title: `#${tagName} - 技術ブログ`,
    description: `「${tagName}」タグの記事一覧（${taggedPosts.length}件）`,
  };
}

export async function generateStaticParams(): Promise<TagPageParams[]> {
  const allPosts = getPublishedPosts();
  const allTags = getAllTags(allPosts);

  return allTags.map((tag: TagInfo) => ({
    tag: tag.slug,
  }));
}
