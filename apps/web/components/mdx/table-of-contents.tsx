'use client';

import { cn } from '@repo/ui';
import { useEffect, useState } from 'react';

import type { TocItem } from '@/lib/mdx/toc';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -80% 0%',
        threshold: 0,
      }
    );

    // 全ての見出しを監視
    const headings = items.map(item => document.getElementById(item.id)).filter(Boolean);
    headings.forEach(heading => {
      if (heading) observer.observe(heading);
    });

    return () => {
      headings.forEach(heading => {
        if (heading) observer.unobserve(heading);
      });
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={cn('space-y-2', className)} aria-label='目次'>
      <h2 className='text-sm font-semibold text-terminal-green mb-4'>目次</h2>
      <ul className='space-y-2 text-sm'>
        {items.map(item => (
          <li
            key={item.id}
            style={{
              paddingLeft: `${(item.level - 1) * 1}rem`,
            }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 text-terminal-white/70 hover:text-terminal-green transition-colors',
                activeId === item.id && 'text-terminal-green font-medium'
              )}
              onClick={e => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
