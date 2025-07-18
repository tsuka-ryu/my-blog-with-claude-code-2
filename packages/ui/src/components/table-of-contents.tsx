'use client';

import { cn } from '@repo/utils';
import { useEffect, useState } from 'react';

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface TableOfContentsProps {
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
   * 固定表示するか
   */
  sticky?: boolean;
  /**
   * 上部からのオフセット（stickyの場合）
   */
  topOffset?: number;
  /**
   * スクロールオフセット（見出しがアクティブになるタイミング）
   */
  scrollOffset?: number;
}

export function TableOfContents({
  items,
  className,
  maxLevel = 3,
  sticky = false,
  topOffset = 100,
  scrollOffset = 100,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

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
    }
  };

  const filteredItems = items.filter(item => item.level <= maxLevel);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        'border border-terminal-green/30 rounded-lg p-4 bg-terminal-bg/50 backdrop-blur-sm',
        sticky && 'sticky top-4',
        className
      )}
      aria-label='目次'
    >
      <div className='mb-3'>
        <h3 className='text-sm font-semibold text-terminal-green'>目次</h3>
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
    </nav>
  );
}

/**
 * HTMLコンテンツから目次アイテムを抽出する関数
 * @param htmlContent HTMLコンテンツ
 * @returns 目次アイテムの配列
 */
export function extractTableOfContents(htmlContent: string): TableOfContentsItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  const items: TableOfContentsItem[] = [];

  headings.forEach(heading => {
    const level = parseInt(heading.tagName.substring(1), 10);
    const title = heading.textContent?.trim() || '';
    let id = heading.id;

    // idがない場合は、タイトルからIDを生成
    if (!id) {
      id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // 重複を避けるため、カウンターを追加
      let counter = 1;
      let uniqueId = id;
      while (items.some(item => item.id === uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      id = uniqueId;
    }

    if (title) {
      items.push({
        id,
        title,
        level,
      });
    }
  });

  return items;
}
