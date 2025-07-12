import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label='パンくずナビゲーション' className={`text-sm ${className}`}>
      <ol className='flex items-center space-x-2'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && (
              <ChevronRight className='w-4 h-4 mx-2 text-terminal-green-400' aria-hidden='true' />
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className='text-terminal-green-400 hover:text-terminal-green-300 transition-colors'
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  index === items.length - 1
                    ? 'text-terminal-green-100 font-medium'
                    : 'text-terminal-green-400'
                }
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
