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
      title: 'TypeScriptの型安全性について',
      slug: 'typescript-type-safety',
      excerpt: 'TypeScriptの型システムの基礎について解説します',
    };

    const nextPost = {
      title: 'Reactのパフォーマンス最適化',
      slug: 'react-performance-optimization',
      excerpt: 'Reactアプリケーションのパフォーマンスを向上させる方法',
    };

    render(<PostNavigation previousPost={previousPost} nextPost={nextPost} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('記事間ナビゲーション')).toBeInTheDocument();

    // Use getAllByText for labels and check specific elements
    const previousLabels = screen.getAllByText('前の記事');
    expect(previousLabels).toHaveLength(1);
    expect(previousLabels[0]).toBeInTheDocument();

    const nextLabels = screen.getAllByText('次の記事');
    expect(nextLabels).toHaveLength(1);
    expect(nextLabels[0]).toBeInTheDocument();

    // Check for unique post titles
    expect(screen.getByText('TypeScriptの型安全性について')).toBeInTheDocument();
    expect(screen.getByText('TypeScriptの型システムの基礎について解説します')).toBeInTheDocument();

    expect(screen.getByText('Reactのパフォーマンス最適化')).toBeInTheDocument();
    expect(
      screen.getByText('Reactアプリケーションのパフォーマンスを向上させる方法')
    ).toBeInTheDocument();

    // Check links are present
    expect(screen.getByRole('link', { name: /TypeScriptの型安全性について/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Reactのパフォーマンス最適化/ })).toBeInTheDocument();
  });

  it('renders only previous post when next post is not available', () => {
    const previousPost = {
      title: 'Node.jsのベストプラクティス',
      slug: 'nodejs-best-practices',
      excerpt: 'Node.js開発における推奨パターンとアンチパターン',
    };

    render(<PostNavigation previousPost={previousPost} />, { wrapper: TestWrapper });

    // Check for the previous post label and content
    const previousLabels = screen.getAllByText('前の記事');
    expect(previousLabels).toHaveLength(1);
    expect(screen.getByText('Node.jsのベストプラクティス')).toBeInTheDocument();
    expect(screen.getByText('Node.js開発における推奨パターンとアンチパターン')).toBeInTheDocument();

    // Ensure next post label is not present
    expect(screen.queryByText('次の記事')).not.toBeInTheDocument();
  });

  it('renders only next post when previous post is not available', () => {
    const nextPost = {
      title: 'GraphQLのクエリ最適化',
      slug: 'graphql-query-optimization',
      excerpt: 'GraphQLクエリのパフォーマンスを改善する技術',
    };

    render(<PostNavigation nextPost={nextPost} />, { wrapper: TestWrapper });

    // Check for the next post label and content
    const nextLabels = screen.getAllByText('次の記事');
    expect(nextLabels).toHaveLength(1);
    expect(screen.getByText('GraphQLのクエリ最適化')).toBeInTheDocument();
    expect(screen.getByText('GraphQLクエリのパフォーマンスを改善する技術')).toBeInTheDocument();

    // Ensure previous post label is not present
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
      title: 'Docker入門ガイド',
      slug: 'docker-introduction',
      excerpt: 'Dockerの基本概念とコンテナ化のメリット',
    };

    const nextPost = {
      title: 'Kubernetes実践入門',
      slug: 'kubernetes-practical-guide',
      excerpt: 'Kubernetesクラスタの構築と運用方法',
    };

    render(<PostNavigation previousPost={previousPost} nextPost={nextPost} />, {
      wrapper: TestWrapper,
    });

    const previousLink = screen.getByRole('link', { name: /Docker入門ガイド/ });
    expect(previousLink).toHaveAttribute('href', '/posts/docker-introduction');

    const nextLink = screen.getByRole('link', { name: /Kubernetes実践入門/ });
    expect(nextLink).toHaveAttribute('href', '/posts/kubernetes-practical-guide');
  });

  it('handles posts without excerpts', () => {
    const previousPost = {
      title: 'Web APIの設計原則',
      slug: 'web-api-design-principles',
    };

    const nextPost = {
      title: 'マイクロサービスアーキテクチャ',
      slug: 'microservices-architecture',
    };

    render(<PostNavigation previousPost={previousPost} nextPost={nextPost} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('Web APIの設計原則')).toBeInTheDocument();
    expect(screen.getByText('マイクロサービスアーキテクチャ')).toBeInTheDocument();

    // Verify labels are still present
    expect(screen.getByText('前の記事')).toBeInTheDocument();
    expect(screen.getByText('次の記事')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const previousPost = {
      title: 'CSS GridとFlexboxの使い分け',
      slug: 'css-grid-vs-flexbox',
      excerpt: 'レイアウト手法の特徴と適切な使用場面',
    };

    const nextPost = {
      title: 'JavaScriptの非同期処理',
      slug: 'javascript-async-programming',
      excerpt: 'PromiseとAsync/Awaitの理解と実践',
    };

    const { container } = render(
      <PostNavigation previousPost={previousPost} nextPost={nextPost} />,
      { wrapper: TestWrapper }
    );
    await expectNoA11yViolations(container);
  });

  it('should not have accessibility violations with single post', async () => {
    const previousPost = {
      title: 'テスト駆動開発のすすめ',
      slug: 'test-driven-development',
      excerpt: 'TDDの基本サイクルと実践的なアプローチ',
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
