import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

import { expectNoA11yViolations } from '../test-utils/accessibility';

import { PostNavigation } from './post-navigation';
import { ThemeProvider } from './theme-provider';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('PostNavigation', () => {
  it('renders both previous and next posts', () => {
    const previousPost = {
      title: '前の記事',
      slug: 'previous-post',
      excerpt: '前の記事の説明',
    };

    const nextPost = {
      title: '次の記事',
      slug: 'next-post',
      excerpt: '次の記事の説明',
    };

    render(<PostNavigation previousPost={previousPost} nextPost={nextPost} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('記事間ナビゲーション')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /前の記事/ })).toBeInTheDocument();
    expect(screen.getByText('前の記事')).toBeInTheDocument();
    expect(screen.getByText('前の記事の説明')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /次の記事/ })).toBeInTheDocument();
    expect(screen.getByText('次の記事')).toBeInTheDocument();
    expect(screen.getByText('次の記事の説明')).toBeInTheDocument();
  });

  it('renders only previous post when next post is not available', () => {
    const previousPost = {
      title: '前の記事',
      slug: 'previous-post',
      excerpt: '前の記事の説明',
    };

    render(<PostNavigation previousPost={previousPost} />, { wrapper: TestWrapper });

    expect(screen.getByText('前の記事')).toBeInTheDocument();
    expect(screen.queryByText('次の記事')).not.toBeInTheDocument();
  });

  it('renders only next post when previous post is not available', () => {
    const nextPost = {
      title: '次の記事',
      slug: 'next-post',
      excerpt: '次の記事の説明',
    };

    render(<PostNavigation nextPost={nextPost} />, { wrapper: TestWrapper });

    expect(screen.getByText('次の記事')).toBeInTheDocument();
    expect(screen.queryByText('前の記事')).not.toBeInTheDocument();
  });

  it('renders empty state when no posts are available', () => {
    const { container } = render(<PostNavigation />, { wrapper: TestWrapper });

    // PostNavigationは空の場合nullを返すので、ナビゲーション要素は存在しない
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('前の記事')).not.toBeInTheDocument();
    expect(screen.queryByText('次の記事')).not.toBeInTheDocument();
  });

  it('creates correct links for posts', () => {
    const previousPost = {
      title: '前の記事',
      slug: 'previous-post',
      excerpt: '前の記事の説明',
    };

    const nextPost = {
      title: '次の記事',
      slug: 'next-post',
      excerpt: '次の記事の説明',
    };

    render(<PostNavigation previousPost={previousPost} nextPost={nextPost} />, {
      wrapper: TestWrapper,
    });

    const previousLink = screen.getByRole('link', { name: /前の記事/ });
    expect(previousLink).toHaveAttribute('href', '/posts/previous-post');

    const nextLink = screen.getByRole('link', { name: /次の記事/ });
    expect(nextLink).toHaveAttribute('href', '/posts/next-post');
  });

  it('handles posts without excerpts', () => {
    const previousPost = {
      title: '前の記事タイトル',
      slug: 'previous-post',
    };

    const nextPost = {
      title: '次の記事タイトル',
      slug: 'next-post',
    };

    render(<PostNavigation previousPost={previousPost} nextPost={nextPost} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('前の記事タイトル')).toBeInTheDocument();
    expect(screen.getByText('次の記事タイトル')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const previousPost = {
      title: '前の記事',
      slug: 'previous-post',
      excerpt: '前の記事の説明',
    };

    const nextPost = {
      title: '次の記事',
      slug: 'next-post',
      excerpt: '次の記事の説明',
    };

    const { container } = render(
      <PostNavigation previousPost={previousPost} nextPost={nextPost} />,
      { wrapper: TestWrapper }
    );
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations with single post', async () => {
    const previousPost = {
      title: '前の記事',
      slug: 'previous-post',
      excerpt: '前の記事の説明',
    };

    const { container } = render(<PostNavigation previousPost={previousPost} />, {
      wrapper: TestWrapper,
    });
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations when empty', async () => {
    const { container } = render(<PostNavigation />, { wrapper: TestWrapper });
    // 空の場合はnullを返すので、特にアクセシビリティ問題はない
    expect(container.firstChild).toBeNull();
  });
});
