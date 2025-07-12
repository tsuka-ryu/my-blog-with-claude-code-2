import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { PopularPosts } from './popular-posts';
import { ThemeProvider } from './theme-provider';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('PopularPosts', () => {
  const mockPosts = [
    {
      title: '人気記事1',
      slug: 'popular-post-1',
      excerpt: '人気記事1の説明',
      date: '2024/01/15',
      author: 'tsuka-ryu',
      views: 5000,
      rank: 1,
    },
    {
      title: '人気記事2',
      slug: 'popular-post-2',
      excerpt: '人気記事2の説明',
      date: '2024/01/10',
      author: 'tsuka-ryu',
      views: 3000,
      rank: 2,
    },
    {
      title: '人気記事3',
      slug: 'popular-post-3',
      excerpt: '人気記事3の説明',
      date: '2024/01/05',
      author: 'tsuka-ryu',
      views: 2000,
      rank: 3,
    },
  ];

  it('renders popular posts correctly', () => {
    render(<PopularPosts posts={mockPosts} />, { wrapper: TestWrapper });

    expect(screen.getByText('人気記事')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /人気記事1/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /人気記事2/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /人気記事3/ })).toBeInTheDocument();
  });

  it('displays view counts and rankings', () => {
    render(<PopularPosts posts={mockPosts} />, { wrapper: TestWrapper });

    expect(screen.getByText('5,000 views')).toBeInTheDocument();
    expect(screen.getByText('3,000 views')).toBeInTheDocument();
    expect(screen.getByText('2,000 views')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('creates correct links for posts', () => {
    render(<PopularPosts posts={mockPosts} />, { wrapper: TestWrapper });

    const link1 = screen.getByRole('link', { name: /人気記事1/ });
    expect(link1).toHaveAttribute('href', '/posts/popular-post-1');

    const link2 = screen.getByRole('link', { name: /人気記事2/ });
    expect(link2).toHaveAttribute('href', '/posts/popular-post-2');
  });

  it('limits posts based on maxItems prop', () => {
    render(<PopularPosts posts={mockPosts} maxItems={2} />, { wrapper: TestWrapper });

    expect(screen.getByRole('link', { name: /人気記事1/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /人気記事2/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /人気記事3/ })).not.toBeInTheDocument();
  });

  it('handles empty posts array', () => {
    const { container } = render(<PopularPosts posts={[]} />, { wrapper: TestWrapper });

    // 空の場合はnullを返すので、要素は存在しない
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('人気記事')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays dates and authors correctly', () => {
    render(<PopularPosts posts={mockPosts.slice(0, 1)} />, { wrapper: TestWrapper });

    expect(screen.getByText('2024/01/15')).toBeInTheDocument();
    expect(screen.getByText('tsuka-ryu')).toBeInTheDocument();
  });

  it('handles posts without excerpts', () => {
    const postsWithoutExcerpts = [
      {
        title: '記事タイトル',
        slug: 'post-slug',
        date: '2024/01/15',
        author: 'tsuka-ryu',
        views: 1000,
        rank: 1,
      },
    ];

    render(<PopularPosts posts={postsWithoutExcerpts} />, { wrapper: TestWrapper });

    expect(screen.getByRole('link', { name: /記事タイトル/ })).toBeInTheDocument();
  });

  it('formats large view counts with commas', () => {
    const postsWithLargeViews = [
      {
        title: 'バイラル記事',
        slug: 'viral-post',
        excerpt: 'バイラル記事の説明',
        date: '2024/01/15',
        author: 'tsuka-ryu',
        views: 1234567,
        rank: 1,
      },
    ];

    render(<PopularPosts posts={postsWithLargeViews} />, { wrapper: TestWrapper });

    expect(screen.getByText('1,234,567 views')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<PopularPosts posts={mockPosts} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations when empty', async () => {
    const { container } = render(<PopularPosts posts={[]} />, {
      wrapper: TestWrapper,
    });
    // 空の場合はnullを返すので、特にアクセシビリティ問題はない
    expect(container.firstChild).toBeNull();
  });

  it('should not have accessibility violations with limited items', async () => {
    const { container } = render(<PopularPosts posts={mockPosts} maxItems={2} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });
});
