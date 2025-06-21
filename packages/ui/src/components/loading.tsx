'use client';

import { forwardRef, type HTMLAttributes } from 'react';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'spinner' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ variant = 'spinner', size = 'md', text, className = '', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    };

    const textSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const renderSpinner = () => (
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-400 dark:border-gray-600 dark:border-t-green-400 ${sizeClasses[size]}`}
      />
    );

    const renderPulse = () => (
      <div
        className={`animate-pulse rounded-full bg-gray-300 dark:bg-gray-600 ${sizeClasses[size]}`}
      />
    );

    const renderSkeleton = () => (
      <div className='animate-pulse space-y-2'>
        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4' />
        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2' />
        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6' />
      </div>
    );

    const renderContent = () => {
      const content = (() => {
        switch (variant) {
          case 'pulse':
            return renderPulse();
          case 'skeleton':
            return renderSkeleton();
          default:
            return renderSpinner();
        }
      })();

      return (
        <div className={`flex flex-col items-center gap-2 ${className}`} {...props} ref={ref}>
          {content}
          {text && (
            <span
              className={`text-gray-600 dark:text-gray-400 font-mono ${textSizeClasses[size]}`}
              aria-live='polite'
            >
              {text}
            </span>
          )}
        </div>
      );
    };

    return (
      <div
        role='status'
        aria-live='polite'
        aria-label={text || '読み込み中'}
        className='flex justify-center items-center'
      >
        {renderContent()}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

export { Loading };
