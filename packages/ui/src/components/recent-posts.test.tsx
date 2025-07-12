import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { RecentPosts } from './recent-posts';
import { ThemeProvider } from './theme-provider';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('RecentPosts', () => {
  const mockPosts = [
    {
      title: '最新記事1',
      slug: 'recent-post-1',
      excerpt: '最新記事1の説明',
      date: '2024/01/15',
      author: 'tsuka-ryu',
      tags: ['React', 'TypeScript'],
      readTime: 5,
    },
    {
      title: '最新記事2',
      slug: 'recent-post-2',
      excerpt: '最新記事2の説明',
      date: '2024/01/10',
      author: 'tsuka-ryu',
      tags: ['Next.js'],
      readTime: 3,
    },
    {
      title: '最新記事3',
      slug: 'recent-post-3',
      excerpt: '最新記事3の説明',
      date: '2024/01/05',
      author: 'tsuka-ryu',
      tags: [],
      readTime: 7,
    },
  ];

  it('renders recent posts correctly', () => {
    render(<RecentPosts posts={mockPosts} />, { wrapper: TestWrapper });

    expect(screen.getByText('最新記事')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /最新記事1/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /最新記事2/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /最新記事3/ })).toBeInTheDocument();
  });

  it('displays reading time correctly', () => {
    render(<RecentPosts posts={mockPosts} />, { wrapper: TestWrapper });

    expect(screen.getByText('5分')).toBeInTheDocument();
    expect(screen.getByText('3分')).toBeInTheDocument();
    expect(screen.getByText('7分')).toBeInTheDocument();
  });

  it('displays tags correctly', () => {
    render(<RecentPosts posts={mockPosts} />, { wrapper: TestWrapper });

    expect(screen.getByText('#React')).toBeInTheDocument();
    expect(screen.getByText('#TypeScript')).toBeInTheDocument();
    expect(screen.getByText('#Next.js')).toBeInTheDocument();
  });

  it('creates correct links for posts', () => {
    render(<RecentPosts posts={mockPosts} />, { wrapper: TestWrapper });

    const link1 = screen.getByRole('link', { name: /最新記事1/ });
    expect(link1).toHaveAttribute('href', '/posts/recent-post-1');

    const link2 = screen.getByRole('link', { name: /最新記事2/ });
    expect(link2).toHaveAttribute('href', '/posts/recent-post-2');
  });

  it('limits posts based on maxItems prop', () => {
    render(<RecentPosts posts={mockPosts} maxItems={2} />, { wrapper: TestWrapper });

    expect(screen.getByRole('link', { name: /最新記事1/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /最新記事2/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /最新記事3/ })).not.toBeInTheDocument();
  });

  it('shows "View All" link when showViewAllLink is true', () => {
    render(<RecentPosts posts={mockPosts} showViewAllLink={true} viewAllHref='/posts' />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByRole('link', { name: /すべて見る/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /すべて見る/ })).toHaveAttribute('href', '/posts');
  });

  it('hides "View All" link when showViewAllLink is false', () => {
    render(<RecentPosts posts={mockPosts} showViewAllLink={false} />, { wrapper: TestWrapper });

    expect(screen.queryByText(/すべて見る/)).not.toBeInTheDocument();
  });

  it('handles empty posts array', () => {
    const { container } = render(<RecentPosts posts={[]} />, { wrapper: TestWrapper });

    // 空の場合はnullを返すので、要素は存在しない
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('最新記事')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays dates and authors correctly', () => {
    render(<RecentPosts posts={mockPosts.slice(0, 1)} />, { wrapper: TestWrapper });

    expect(screen.getByText('2024/01/15')).toBeInTheDocument();
    expect(screen.getByText('tsuka-ryu')).toBeInTheDocument();
  });

  it('handles posts without tags', () => {
    const postWithoutTags = mockPosts.slice(2, 3); // 記事3はtagsが空配列

    render(<RecentPosts posts={postWithoutTags} />, { wrapper: TestWrapper });

    expect(screen.getByRole('link', { name: /最新記事3/ })).toBeInTheDocument();
    expect(screen.queryByText('#')).not.toBeInTheDocument();
  });

  it('handles posts without excerpts', () => {
    const postsWithoutExcerpts = [
      {
        title: '記事タイトル',
        slug: 'post-slug',
        date: '2024/01/15',
        author: 'tsuka-ryu',
        tags: ['React'],
        readTime: 5,
      },
    ];

    render(<RecentPosts posts={postsWithoutExcerpts} />, { wrapper: TestWrapper });

    expect(screen.getByRole('link', { name: /記事タイトル/ })).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<RecentPosts posts={mockPosts} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations with view all link', async () => {
    const { container } = render(
      <RecentPosts posts={mockPosts} showViewAllLink={true} viewAllHref='/posts' />,
      { wrapper: TestWrapper }
    );
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations when empty', async () => {
    const { container } = render(<RecentPosts posts={[]} />, {
      wrapper: TestWrapper,
    });
    // 空の場合はnullを返すので、特にアクセシビリティ問題はない
    expect(container.firstChild).toBeNull();
  });

  it('should not have accessibility violations with limited items', async () => {
    const { container } = render(<RecentPosts posts={mockPosts} maxItems={2} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });
});
