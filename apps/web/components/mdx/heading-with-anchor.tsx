'use client';

import { useState } from 'react';

interface HeadingWithAnchorProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  id: string;
  children: React.ReactNode;
}

export function HeadingWithAnchor({ level, id, children }: HeadingWithAnchorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Tag = `h${level}` as const;

  const sizeClasses = {
    1: 'text-2xl font-bold mt-8 mb-4',
    2: 'text-xl font-semibold mt-6 mb-3',
    3: 'text-lg font-semibold mt-4 mb-2',
    4: 'text-base font-semibold mt-3 mb-2',
    5: 'text-sm font-semibold mt-2 mb-1',
    6: 'text-xs font-semibold mt-2 mb-1',
  };

  const iconSizes = {
    1: 'w-5 h-5',
    2: 'w-4 h-4',
    3: 'w-4 h-4',
    4: 'w-3 h-3',
    5: 'w-3 h-3',
    6: 'w-3 h-3',
  };

  return (
    <Tag id={id} className={`${sizeClasses[level]} text-primary group relative`}>
      <span className='flex items-center gap-2'>
        {children}
        <button
          onClick={handleCopyLink}
          className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-accent hover:text-accent-hover focus:opacity-100 focus:outline-none'
          aria-label='見出しのリンクをコピー'
          title={copied ? 'コピーしました！' : '見出しのリンクをコピー'}
        >
          {copied ? (
            <svg className={iconSizes[level]} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          ) : (
            <svg className={iconSizes[level]} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
              />
            </svg>
          )}
        </button>
      </span>
    </Tag>
  );
}
