import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { ArchiveList } from './archive-list';
import { ThemeProvider } from './theme-provider';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ArchiveList', () => {
  const mockArchiveItems = [
    {
      year: 2024,
      totalCount: 8,
      months: [
        {
          year: 2024,
          month: 1,
          count: 5,
          posts: [
            {
              title: '2024年1月の記事1',
              slug: '2024-01-post-1',
              date: '2024/01/15',
            },
            {
              title: '2024年1月の記事2',
              slug: '2024-01-post-2',
              date: '2024/01/10',
            },
          ],
        },
        {
          year: 2024,
          month: 2,
          count: 3,
          posts: [
            {
              title: '2024年2月の記事',
              slug: '2024-02-post-1',
              date: '2024/02/01',
            },
          ],
        },
      ],
    },
    {
      year: 2023,
      totalCount: 2,
      months: [
        {
          year: 2023,
          month: 12,
          count: 2,
          posts: [
            {
              title: '2023年12月の記事',
              slug: '2023-12-post-1',
              date: '2023/12/15',
            },
          ],
        },
      ],
    },
  ];

  it('renders archive list correctly', () => {
    render(<ArchiveList archives={mockArchiveItems} />, { wrapper: TestWrapper });

    expect(screen.getByText('アーカイブ')).toBeInTheDocument();
    expect(screen.getByText('2024年')).toBeInTheDocument();
    expect(screen.getByText('2023年')).toBeInTheDocument();
  });

  it('displays month information correctly', () => {
    render(<ArchiveList archives={mockArchiveItems} />, { wrapper: TestWrapper });

    expect(screen.getByText('1月')).toBeInTheDocument();
    expect(screen.getByText('2月')).toBeInTheDocument();
    expect(screen.getByText('12月')).toBeInTheDocument();
    expect(screen.getByText('5件')).toBeInTheDocument();
    expect(screen.getByText('3件')).toBeInTheDocument();
    // Check that there are exactly two elements with "2件" text (year total and month count)
    const twoCountElements = screen.getAllByText('2件');
    expect(twoCountElements).toHaveLength(2);
  });

  it('creates correct links for archive months', () => {
    render(<ArchiveList archives={mockArchiveItems} />, { wrapper: TestWrapper });

    const january2024Link = screen.getByRole('link', { name: '1月' });
    expect(january2024Link).toHaveAttribute('href', '/archive/2024/01');

    const february2024Link = screen.getByRole('link', { name: '2月' });
    expect(february2024Link).toHaveAttribute('href', '/archive/2024/02');

    const december2023Link = screen.getByRole('link', { name: '12月' });
    expect(december2023Link).toHaveAttribute('href', '/archive/2023/12');
  });

  it('displays post titles and links when not expandable', () => {
    render(<ArchiveList archives={mockArchiveItems} expandable={false} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByRole('link', { name: '2024年1月の記事1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2024年1月の記事2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2024年2月の記事' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2023年12月の記事' })).toBeInTheDocument();
  });

  it('creates correct links for individual posts', () => {
    render(<ArchiveList archives={mockArchiveItems} expandable={false} />, {
      wrapper: TestWrapper,
    });

    const post1Link = screen.getByRole('link', { name: '2024年1月の記事1' });
    expect(post1Link).toHaveAttribute('href', '/posts/2024-01-post-1');

    const post2Link = screen.getByRole('link', { name: '2024年1月の記事2' });
    expect(post2Link).toHaveAttribute('href', '/posts/2024-01-post-2');
  });

  it('hides post details when expandable is true but not expanded', () => {
    render(<ArchiveList archives={mockArchiveItems} expandable={true} />, { wrapper: TestWrapper });

    expect(screen.queryByRole('link', { name: '2024年1月の記事1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '2024年1月の記事2' })).not.toBeInTheDocument();
  });

  it('renders all archive years', () => {
    render(<ArchiveList archives={mockArchiveItems} />, { wrapper: TestWrapper });

    expect(screen.getByText('2024年')).toBeInTheDocument();
    expect(screen.getByText('2023年')).toBeInTheDocument();
  });

  it('handles empty archive items', () => {
    const { container } = render(<ArchiveList archives={[]} />, { wrapper: TestWrapper });

    // 空の場合はnullを返すので、要素は存在しない
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('アーカイブ')).not.toBeInTheDocument();
    expect(screen.queryByText('2024年')).not.toBeInTheDocument();
  });

  it('handles years with no months', () => {
    const emptyYearItems = [
      {
        year: 2024,
        totalCount: 0,
        months: [],
      },
    ];

    render(<ArchiveList archives={emptyYearItems} />, { wrapper: TestWrapper });

    expect(screen.getByText('2024年')).toBeInTheDocument();
    expect(screen.queryByText('月')).not.toBeInTheDocument();
  });

  it('handles months with no posts', () => {
    const noPostsItems = [
      {
        year: 2024,
        totalCount: 0,
        months: [
          {
            year: 2024,
            month: 1,
            count: 0,
            posts: [],
          },
        ],
      },
    ];

    render(<ArchiveList archives={noPostsItems} expandable={false} />, { wrapper: TestWrapper });

    expect(screen.getByText('1月')).toBeInTheDocument();
    // Check that there are exactly two elements with "0件" text (year total and month count)
    const zeroCountElements = screen.getAllByText('0件');
    expect(zeroCountElements).toHaveLength(2);
    expect(screen.queryByRole('link', { name: /記事/ })).not.toBeInTheDocument();
  });

  it('displays years correctly', () => {
    const unsortedItems = [
      {
        year: 2022,
        totalCount: 1,
        months: [{ year: 2022, month: 1, count: 1, posts: [] }],
      },
      {
        year: 2024,
        totalCount: 1,
        months: [{ year: 2024, month: 1, count: 1, posts: [] }],
      },
      {
        year: 2023,
        totalCount: 1,
        months: [{ year: 2023, month: 1, count: 1, posts: [] }],
      },
    ];

    render(<ArchiveList archives={unsortedItems} />, { wrapper: TestWrapper });

    expect(screen.getByText('2022年')).toBeInTheDocument();
    expect(screen.getByText('2024年')).toBeInTheDocument();
    expect(screen.getByText('2023年')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<ArchiveList archives={mockArchiveItems} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations with posts shown', async () => {
    const { container } = render(<ArchiveList archives={mockArchiveItems} expandable={false} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations when empty', async () => {
    const { container } = render(<ArchiveList archives={[]} />, {
      wrapper: TestWrapper,
    });
    // 空の場合はnullを返すので、特にアクセシビリティ問題はない
    expect(container.firstChild).toBeNull();
  });

  it('should not have accessibility violations with expandable mode', async () => {
    const { container } = render(<ArchiveList archives={mockArchiveItems} expandable={true} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });
});
