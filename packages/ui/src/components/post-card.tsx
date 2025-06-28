import { Link } from './link';
import { Typography } from './typography';

import type { BlogPostSummary } from '@repo/utils';

export interface PostCardProps {
  post: BlogPostSummary;
  className?: string;
  highlightTerm?: string;
}

export function PostCard({ post, className = '', highlightTerm }: PostCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  const highlightText = (text: string) => {
    if (!highlightTerm) return text;

    const regex = new RegExp(`(${highlightTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className='bg-terminal-accent/20 text-terminal-accent px-1 rounded'>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article className={`border-l-2 border-accent pl-4 py-4 space-y-2 ${className}`}>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
        <Typography component='p' variant='caption' color='muted' className='font-mono'>
          {formatDate(post.publishedAt)}
        </Typography>
        {post.readingTime && (
          <Typography component='span' variant='caption' color='muted'>
            約{post.readingTime}分で読めます
          </Typography>
        )}
      </div>

      <Typography
        component='h3'
        variant='h4'
        color='primary'
        className='hover:text-accent transition-colors'
      >
        <Link href={`/posts/${post.slug}`} variant='underline'>
          {highlightText(post.title)}
        </Link>
      </Typography>

      {post.description && (
        <Typography component='p' variant='body2' color='muted'>
          {highlightText(post.description)}
        </Typography>
      )}

      <div className='flex flex-wrap gap-2 pt-2'>
        {post.tags.map((tag: string) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
            className='inline-block px-2 py-1 text-xs bg-accent/10 text-accent rounded border border-accent/20 hover:bg-accent/20 transition-colors'
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
