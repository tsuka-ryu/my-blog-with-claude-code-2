import { Archive, Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

export interface ArchiveMonth {
  year: number;
  month: number;
  count: number;
  posts?: Array<{
    title: string;
    slug: string;
    date: string;
  }>;
}

export interface ArchiveYear {
  year: number;
  months: ArchiveMonth[];
  totalCount: number;
}

export interface ArchiveListProps {
  archives: ArchiveYear[];
  title?: string;
  showPostCount?: boolean;
  expandable?: boolean;
  defaultExpanded?: number[];
  className?: string;
}

export const ArchiveList: React.FC<ArchiveListProps> = ({
  archives,
  title = 'アーカイブ',
  showPostCount = true,
  expandable = false,
  defaultExpanded = [],
  className = '',
}) => {
  const [expandedYears, setExpandedYears] = React.useState<Set<number>>(new Set(defaultExpanded));

  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const getMonthName = (month: number): string => {
    const monthNames = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    return monthNames[month - 1] || `${month}月`;
  };

  if (archives.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-4 ${className}`}>
      <div className='flex items-center space-x-2'>
        <Archive className='w-5 h-5 text-terminal-green-400' />
        <h2 className='text-lg font-bold text-terminal-green-100'>{title}</h2>
      </div>

      <div className='space-y-2'>
        {archives.map(yearData => (
          <div key={yearData.year} className='space-y-2'>
            {/* Year Header */}
            <div
              className={`
                flex items-center justify-between p-3 rounded-lg border border-terminal-green-800 
                ${expandable ? 'cursor-pointer hover:border-terminal-green-700' : ''}
                transition-colors
              `}
              onClick={expandable ? () => toggleYear(yearData.year) : undefined}
            >
              <div className='flex items-center space-x-2'>
                {expandable &&
                  (expandedYears.has(yearData.year) ? (
                    <ChevronDown className='w-4 h-4 text-terminal-green-400' />
                  ) : (
                    <ChevronRight className='w-4 h-4 text-terminal-green-400' />
                  ))}
                <Calendar className='w-4 h-4 text-terminal-green-400' />
                <Link
                  href={`/archive/${yearData.year}`}
                  className='text-terminal-green-100 font-medium hover:text-white transition-colors'
                >
                  {yearData.year}年
                </Link>
              </div>
              {showPostCount && (
                <span className='text-sm text-terminal-green-400'>{yearData.totalCount}件</span>
              )}
            </div>

            {/* Months (shown when not expandable or when expanded) */}
            {(!expandable || expandedYears.has(yearData.year)) && (
              <div className='pl-6 space-y-1'>
                {yearData.months.map(monthData => (
                  <div key={`${yearData.year}-${monthData.month}`} className='space-y-1'>
                    <div className='flex items-center justify-between p-2 rounded border border-terminal-green-800/50 hover:border-terminal-green-700/50 transition-colors'>
                      <Link
                        href={`/archive/${yearData.year}/${monthData.month.toString().padStart(2, '0')}`}
                        className='text-terminal-green-300 hover:text-terminal-green-100 transition-colors'
                      >
                        {getMonthName(monthData.month)}
                      </Link>
                      {showPostCount && (
                        <span className='text-xs text-terminal-green-400'>{monthData.count}件</span>
                      )}
                    </div>

                    {/* Posts (if provided) */}
                    {monthData.posts && monthData.posts.length > 0 && (
                      <div className='pl-4 space-y-1'>
                        {monthData.posts.map(post => (
                          <Link
                            key={post.slug}
                            href={`/posts/${post.slug}`}
                            className='block p-2 text-sm text-terminal-green-300 hover:text-terminal-green-100 transition-colors line-clamp-1'
                          >
                            {post.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
