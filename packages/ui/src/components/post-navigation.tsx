import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export interface PostNavigationItem {
  title: string;
  slug: string;
  excerpt?: string;
}

export interface PostNavigationProps {
  previousPost?: PostNavigationItem;
  nextPost?: PostNavigationItem;
  className?: string;
}

export const PostNavigation: React.FC<PostNavigationProps> = ({
  previousPost,
  nextPost,
  className = '',
}) => {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav
      aria-label='記事間ナビゲーション'
      className={`border-t border-terminal-green-800 pt-8 mt-8 ${className}`}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Previous Post */}
        <div className='flex justify-start'>
          {previousPost ? (
            <Link
              href={`/posts/${previousPost.slug}`}
              className='group flex items-start space-x-3 p-4 rounded-lg border border-terminal-green-800 hover:border-terminal-green-700 transition-colors max-w-full'
            >
              <ArrowLeft className='w-5 h-5 text-terminal-green-400 mt-1 flex-shrink-0 group-hover:text-terminal-green-300 transition-colors' />
              <div className='min-w-0'>
                <p className='text-sm text-terminal-green-400 mb-1'>前の記事</p>
                <h3 className='text-terminal-green-100 font-medium group-hover:text-white transition-colors line-clamp-2'>
                  {previousPost.title}
                </h3>
                {previousPost.excerpt && (
                  <p className='text-sm text-terminal-green-300 mt-2 line-clamp-2'>
                    {previousPost.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ) : (
            <div className='md:col-span-1' />
          )}
        </div>

        {/* Next Post */}
        <div className='flex justify-end'>
          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className='group flex items-start space-x-3 p-4 rounded-lg border border-terminal-green-800 hover:border-terminal-green-700 transition-colors max-w-full text-right'
            >
              <div className='min-w-0'>
                <p className='text-sm text-terminal-green-400 mb-1'>次の記事</p>
                <h3 className='text-terminal-green-100 font-medium group-hover:text-white transition-colors line-clamp-2'>
                  {nextPost.title}
                </h3>
                {nextPost.excerpt && (
                  <p className='text-sm text-terminal-green-300 mt-2 line-clamp-2'>
                    {nextPost.excerpt}
                  </p>
                )}
              </div>
              <ArrowRight className='w-5 h-5 text-terminal-green-400 mt-1 flex-shrink-0 group-hover:text-terminal-green-300 transition-colors' />
            </Link>
          ) : (
            <div className='md:col-span-1' />
          )}
        </div>
      </div>
    </nav>
  );
};
