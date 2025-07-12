import { type ComponentProps, type ReactNode } from 'react';

import { cn } from '../utils/cn';

export interface TagCloudItem {
  name: string;
  count: number;
  weight: number;
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export interface TagCloudProps extends ComponentProps<'div'> {
  tags: TagCloudItem[];
  onTagClick?: (tag: string) => void;
  variant?: 'default' | 'interactive' | 'minimal';
  spacing?: 'tight' | 'normal' | 'loose';
  maxItems?: number;
  showCount?: boolean;
  renderTag?: (tag: TagCloudItem, defaultElement: ReactNode) => ReactNode;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
} as const;

const spacingClasses = {
  tight: 'gap-1',
  normal: 'gap-2',
  loose: 'gap-4',
} as const;

const variantClasses = {
  default: {
    container: 'bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border',
    tag: 'inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md transition-colors',
  },
  interactive: {
    container: 'bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border',
    tag: 'inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md transition-all hover:bg-blue-200 dark:hover:bg-blue-800 hover:scale-105 cursor-pointer',
  },
  minimal: {
    container: '',
    tag: 'inline-block px-1 py-0.5 text-gray-600 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-gray-100',
  },
} as const;

export function TagCloud({
  tags,
  onTagClick,
  variant = 'default',
  spacing = 'normal',
  maxItems,
  showCount = false,
  renderTag,
  className,
  ...props
}: TagCloudProps) {
  const displayTags = maxItems ? tags.slice(0, maxItems) : tags;
  const classes = variantClasses[variant];

  if (displayTags.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center p-8 text-gray-500 dark:text-gray-400',
          classes.container,
          className
        )}
        role='region'
        aria-label='タグクラウド'
        {...props}
      >
        <p>表示するタグがありません</p>
      </div>
    );
  }

  return (
    <div
      className={cn('flex flex-wrap', spacingClasses[spacing], classes.container, className)}
      role='region'
      aria-label='タグクラウド'
      {...props}
    >
      {displayTags.map(tag => {
        const TagComponent = onTagClick ? 'button' : 'span';
        const tagElement = (
          <TagComponent
            key={tag.name}
            onClick={onTagClick ? () => onTagClick(tag.name) : undefined}
            className={cn(
              sizeClasses[tag.size],
              classes.tag,
              onTagClick && 'focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
            style={{
              opacity: 0.6 + tag.weight * 0.4, // 重みに応じて透明度を調整
            }}
            aria-label={`タグ: ${tag.name}${showCount ? ` (${tag.count}件)` : ''}`}
            {...(onTagClick && { role: 'button', tabIndex: 0 })}
          >
            {tag.name}
            {showCount && <span className='ml-1 text-xs opacity-70'>({tag.count})</span>}
          </TagComponent>
        );

        return renderTag ? renderTag(tag, tagElement) : tagElement;
      })}
    </div>
  );
}

export interface TagProps {
  tag: string;
  count?: number;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'outline' | 'ghost';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

const tagVariantClasses = {
  default: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  outline:
    'border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 bg-transparent',
  ghost: 'text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-950',
} as const;

export function Tag({
  tag,
  count,
  size = 'base',
  variant = 'default',
  interactive = false,
  onClick,
  className,
}: TagProps) {
  if (onClick || interactive) {
    return (
      <button
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium transition-colors',
          sizeClasses[size],
          tagVariantClasses[variant],
          interactive && 'hover:opacity-80 cursor-pointer',
          onClick && 'focus:outline-none focus:ring-2 focus:ring-blue-500',
          className
        )}
        onClick={onClick}
        aria-label={`タグ: ${tag}${count ? ` (${count}件)` : ''}`}
        role='button'
        tabIndex={0}
      >
        {tag}
        {count !== undefined && <span className='ml-1 text-xs opacity-70'>{count}</span>}
      </button>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full font-medium transition-colors',
        sizeClasses[size],
        tagVariantClasses[variant],
        className
      )}
      aria-label={`タグ: ${tag}${count ? ` (${count}件)` : ''}`}
    >
      {tag}
      {count !== undefined && <span className='ml-1 text-xs opacity-70'>{count}</span>}
    </span>
  );
}
