'use client';

import { cn } from '@repo/utils';
import { useEffect, useState } from 'react';

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface TableOfContentsDrawerProps {
  /**
   * 目次のアイテム
   */
  items: TableOfContentsItem[];
  /**
   * クラス名
   */
  className?: string;
  /**
   * 最大表示レベル（デフォルト: 3）
   */
  maxLevel?: number;
  /**
   * スクロールオフセット（見出しがアクティブになるタイミング）
   */
  scrollOffset?: number;
  /**
   * 上部からのオフセット（見出しクリック時）
   */
  topOffset?: number;
}

export function TableOfContentsDrawer({
  items,
  className,
  maxLevel = 3,
  scrollOffset = 100,
  topOffset = 100,
}: TableOfContentsDrawerProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headings = items
        .filter(item => item.level <= maxLevel)
        .map(item => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      if (headings.length === 0) return;

      // 現在のスクロール位置
      const scrollTop = window.scrollY + scrollOffset;

      // 現在表示されている見出しを見つける
      let currentHeading = headings[0];
      for (const heading of headings) {
        if (heading.offsetTop <= scrollTop) {
          currentHeading = heading;
        } else {
          break;
        }
      }

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    // 初期化
    handleScroll();

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items, maxLevel, scrollOffset]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - topOffset;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
      // スマートフォンでは選択後にドロワーを閉じる
      setIsOpen(false);
    }
  };

  const filteredItems = items.filter(item => item.level <= maxLevel);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* ドロワー開閉ボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-4 right-4 z-40 md:hidden',
          'bg-terminal-green/90 text-terminal-bg rounded-full p-3',
          'shadow-lg hover:bg-terminal-green transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-terminal-green/50 focus:ring-offset-2',
          'focus:ring-offset-terminal-bg backdrop-blur-sm',
          className
        )}
        aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
      >
        {isOpen ? (
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>

      {/* バックドロップ */}
      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/50 md:hidden'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* ドロワー */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 md:hidden',
          'bg-terminal-bg border-t border-terminal-green/30 rounded-t-lg',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full',
          'max-h-[70vh] overflow-y-auto'
        )}
      >
        <div className='p-4'>
          <div className='mb-3 flex items-center justify-between'>
            <h3 className='text-sm font-semibold text-terminal-green'>目次</h3>
            <button
              onClick={() => setIsOpen(false)}
              className='text-terminal-green/70 hover:text-terminal-green p-1 rounded'
              aria-label='目次を閉じる'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <ul className='space-y-2'>
            {filteredItems.map(item => (
              <li key={item.id} className={cn('text-sm', `ml-${(item.level - 1) * 4}`)}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    'text-left w-full hover:text-terminal-green transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-terminal-green/50 focus:ring-offset-2',
                    'focus:ring-offset-terminal-bg rounded px-1 py-0.5',
                    activeId === item.id
                      ? 'text-terminal-green font-medium border-l-2 border-terminal-green pl-3'
                      : 'text-terminal-green/70 hover:border-l-2 hover:border-terminal-green/50 hover:pl-3'
                  )}
                  type='button'
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
