import { type ComponentProps } from 'react';

import { cn } from '../utils/cn';

import { Tag } from './tag-cloud';

export interface PopularTagsProps extends ComponentProps<'div'> {
  tags: Array<{
    name: string;
    count: number;
  }>;
  title?: string;
  showCount?: boolean;
  variant?: 'default' | 'minimal' | 'compact';
  limit?: number;
  onTagClick?: (tag: string) => void;
}

const variantClasses = {
  default: {
    container: 'bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border',
    title: 'text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100',
    tags: 'gap-3',
  },
  minimal: {
    container: 'p-2',
    title: 'text-base font-medium mb-3 text-gray-800 dark:text-gray-200',
    tags: 'gap-2',
  },
  compact: {
    container:
      'p-3 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700',
    title: 'text-sm font-medium mb-2 text-gray-700 dark:text-gray-300',
    tags: 'gap-1.5',
  },
} as const;

export function PopularTags({
  tags,
  title = '人気タグ',
  showCount = true,
  variant = 'default',
  limit,
  onTagClick,
  className,
  ...props
}: PopularTagsProps) {
  const displayTags = limit ? tags.slice(0, limit) : tags;
  const classes = variantClasses[variant];

  if (displayTags.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center p-6 text-gray-500 dark:text-gray-400',
          classes.container,
          className
        )}
        role='region'
        aria-label='人気タグ'
        {...props}
      >
        <p className='text-sm'>表示する人気タグがありません</p>
      </div>
    );
  }

  return (
    <div
      className={cn(classes.container, className)}
      role='region'
      aria-label='人気タグ'
      {...props}
    >
      {title && <h3 className={classes.title}>{title}</h3>}

      <div className={cn('flex flex-wrap', classes.tags)}>
        {displayTags.map((tag, index) => (
          <Tag
            key={tag.name}
            tag={tag.name}
            count={showCount ? tag.count : undefined}
            size={variant === 'compact' ? 'sm' : 'base'}
            variant={index < 3 ? 'default' : 'outline'}
            interactive={Boolean(onTagClick)}
            onClick={onTagClick ? () => onTagClick(tag.name) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export interface TagRankingProps extends ComponentProps<'div'> {
  tags: Array<{
    name: string;
    count: number;
  }>;
  title?: string;
  showRanking?: boolean;
  limit?: number;
  onTagClick?: (tag: string) => void;
}

export function TagRanking({
  tags,
  title = 'タグランキング',
  showRanking = true,
  limit = 10,
  onTagClick,
  className,
  ...props
}: TagRankingProps) {
  const displayTags = tags.slice(0, limit);

  if (displayTags.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center p-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg border',
          className
        )}
        role='region'
        aria-label='タグランキング'
        {...props}
      >
        <p className='text-sm'>表示するタグがありません</p>
      </div>
    );
  }

  return (
    <div
      className={cn('bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border', className)}
      role='region'
      aria-label='タグランキング'
      {...props}
    >
      {title && (
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>{title}</h3>
      )}

      <div className='space-y-3'>
        {displayTags.map((tag, index) => {
          const rank = index + 1;
          const TagComponent = onTagClick ? 'button' : 'div';

          return (
            <TagComponent
              key={tag.name}
              onClick={onTagClick ? () => onTagClick(tag.name) : undefined}
              className={cn(
                'flex items-center justify-between w-full p-3 rounded-md transition-colors',
                'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
                onTagClick &&
                  'hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
              {...(onTagClick && { role: 'button', tabIndex: 0 })}
            >
              <div className='flex items-center gap-3'>
                {showRanking && (
                  <div
                    className={cn(
                      'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                      rank === 1 && 'bg-yellow-400 text-yellow-900',
                      rank === 2 && 'bg-gray-400 text-gray-900',
                      rank === 3 && 'bg-orange-400 text-orange-900',
                      rank > 3 && 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {rank}
                  </div>
                )}
                <span className='font-medium text-gray-900 dark:text-gray-100'>{tag.name}</span>
              </div>

              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{tag.count}件</span>
                <div
                  className='h-2 bg-blue-500 rounded-full'
                  style={{
                    width: `${Math.max(10, (tag.count / (displayTags[0]?.count || 1)) * 60)}px`,
                  }}
                  aria-hidden='true'
                />
              </div>
            </TagComponent>
          );
        })}
      </div>
    </div>
  );
}
