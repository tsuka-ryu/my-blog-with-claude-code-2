import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export interface RecentPost {
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  author?: string;
  tags?: string[];
  readTime?: number;
}

export interface RecentPostsProps {
  posts: RecentPost[];
  title?: string;
  showReadTime?: boolean;
  showTags?: boolean;
  maxItems?: number;
  showViewAllLink?: boolean;
  viewAllHref?: string;
  className?: string;
}

export const RecentPosts: React.FC<RecentPostsProps> = ({
  posts,
  title = '最新記事',
  showReadTime = true,
  showTags = true,
  maxItems,
  showViewAllLink = false,
  viewAllHref = '/posts',
  className = '',
}) => {
  const displayPosts = maxItems ? posts.slice(0, maxItems) : posts;

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-4 ${className}`}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Clock className='w-5 h-5 text-terminal-green-400' />
          <h2 className='text-lg font-bold text-terminal-green-100'>{title}</h2>
        </div>

        {showViewAllLink && (
          <Link
            href={viewAllHref}
            className='flex items-center space-x-1 text-sm text-terminal-green-400 hover:text-terminal-green-300 transition-colors'
          >
            <span>すべて見る</span>
            <ArrowRight className='w-4 h-4' />
          </Link>
        )}
      </div>

      <div className='space-y-4'>
        {displayPosts.map(post => (
          <article
            key={post.slug}
            className='group p-4 rounded-lg border border-terminal-green-800 hover:border-terminal-green-700 transition-colors'
          >
            <Link href={`/posts/${post.slug}`} className='block'>
              <h3 className='text-terminal-green-100 font-medium group-hover:text-white transition-colors line-clamp-2 mb-2'>
                {post.title}
              </h3>
            </Link>

            {post.excerpt && (
              <p className='text-sm text-terminal-green-300 line-clamp-3 mb-3'>{post.excerpt}</p>
            )}

            {showTags && post.tags && post.tags.length > 0 && (
              <div className='flex flex-wrap gap-1 mb-3'>
                {post.tags.slice(0, 3).map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className='inline-block px-2 py-1 text-xs bg-terminal-green-800 text-terminal-green-300 rounded hover:bg-terminal-green-700 transition-colors'
                  >
                    #{tag}
                  </Link>
                ))}
                {post.tags.length > 3 && (
                  <span className='text-xs text-terminal-green-400'>+{post.tags.length - 3}</span>
                )}
              </div>
            )}

            <div className='flex items-center space-x-4 text-xs text-terminal-green-400'>
              <div className='flex items-center space-x-1'>
                <Calendar className='w-3 h-3' />
                <span>{post.date}</span>
              </div>

              {post.author && (
                <div className='flex items-center space-x-1'>
                  <User className='w-3 h-3' />
                  <span>{post.author}</span>
                </div>
              )}

              {showReadTime && post.readTime && (
                <div className='flex items-center space-x-1'>
                  <Clock className='w-3 h-3' />
                  <span>{post.readTime}分</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
