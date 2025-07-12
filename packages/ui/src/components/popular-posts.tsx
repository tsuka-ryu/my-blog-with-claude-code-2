import { TrendingUp, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export interface PopularPost {
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  author?: string;
  views: number;
  rank: number;
}

export interface PopularPostsProps {
  posts: PopularPost[];
  title?: string;
  showViews?: boolean;
  showRank?: boolean;
  maxItems?: number;
  className?: string;
}

export const PopularPosts: React.FC<PopularPostsProps> = ({
  posts,
  title = '人気記事',
  showViews = true,
  showRank = true,
  maxItems,
  className = '',
}) => {
  const displayPosts = maxItems ? posts.slice(0, maxItems) : posts;

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-4 ${className}`}>
      <div className='flex items-center space-x-2'>
        <TrendingUp className='w-5 h-5 text-terminal-green-400' />
        <h2 className='text-lg font-bold text-terminal-green-100'>{title}</h2>
      </div>

      <div className='space-y-3'>
        {displayPosts.map(post => (
          <article
            key={post.slug}
            className='group p-4 rounded-lg border border-terminal-green-800 hover:border-terminal-green-700 transition-colors'
          >
            <div className='flex items-start space-x-3'>
              {showRank && (
                <div className='flex-shrink-0'>
                  <span
                    className={`
                      inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                      ${
                        post.rank <= 3
                          ? 'bg-terminal-green-400 text-terminal-black'
                          : 'bg-terminal-green-800 text-terminal-green-100'
                      }
                    `}
                  >
                    {post.rank}
                  </span>
                </div>
              )}

              <div className='flex-1 min-w-0'>
                <Link href={`/posts/${post.slug}`} className='block'>
                  <h3 className='text-terminal-green-100 font-medium group-hover:text-white transition-colors line-clamp-2 mb-2'>
                    {post.title}
                  </h3>
                </Link>

                {post.excerpt && (
                  <p className='text-sm text-terminal-green-300 line-clamp-2 mb-3'>
                    {post.excerpt}
                  </p>
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

                  {showViews && (
                    <div className='flex items-center space-x-1'>
                      <TrendingUp className='w-3 h-3' />
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
