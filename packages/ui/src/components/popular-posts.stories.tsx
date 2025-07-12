import { PopularPosts } from './popular-posts';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Content/PopularPosts',
  component: PopularPosts,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'セクションのタイトル',
    },
    showViews: {
      control: 'boolean',
      description: 'ビュー数を表示するかどうか',
    },
    showRank: {
      control: 'boolean',
      description: 'ランキング番号を表示するかどうか',
    },
    maxItems: {
      control: 'number',
      description: '表示する最大記事数',
    },
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
} satisfies Meta<typeof PopularPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPosts = [
  {
    title: 'TypeScriptの型システム完全ガイド',
    slug: 'typescript-type-system-guide',
    excerpt: 'TypeScriptの型システムを基本から応用まで徹底解説します。',
    date: '2024-01-15',
    author: 'tsuka-ryu',
    views: 15420,
    rank: 1,
  },
  {
    title: 'React 18の新機能とパフォーマンス最適化',
    slug: 'react18-new-features',
    excerpt: 'React 18で追加された新機能とパフォーマンス向上のテクニックを紹介します。',
    date: '2024-01-10',
    author: 'tsuka-ryu',
    views: 12350,
    rank: 2,
  },
  {
    title: 'Next.js App Routerによるモダンフロントエンド開発',
    slug: 'nextjs-app-router-guide',
    excerpt: 'Next.js App Routerを使った現代的なWebアプリケーション開発手法を解説します。',
    date: '2024-01-05',
    author: 'tsuka-ryu',
    views: 9870,
    rank: 3,
  },
  {
    title: 'TailwindCSSとコンポーネント設計の実践',
    slug: 'tailwindcss-component-design',
    excerpt: 'TailwindCSSを使った効率的なコンポーネント設計のパターンを学びます。',
    date: '2023-12-28',
    author: 'tsuka-ryu',
    views: 7640,
    rank: 4,
  },
  {
    title: 'Vitestによるモダンなテスト環境構築',
    slug: 'vitest-modern-testing',
    excerpt: 'Vitestを使った高速で現代的なテスト環境の構築方法を紹介します。',
    date: '2023-12-20',
    author: 'tsuka-ryu',
    views: 5890,
    rank: 5,
  },
];

export const Default: Story = {
  args: {
    posts: mockPosts,
  },
};

export const WithoutViews: Story = {
  args: {
    posts: mockPosts,
    showViews: false,
  },
};

export const WithoutRank: Story = {
  args: {
    posts: mockPosts,
    showRank: false,
  },
};

export const CustomTitle: Story = {
  args: {
    posts: mockPosts,
    title: 'トレンド記事',
  },
};

export const LimitedItems: Story = {
  args: {
    posts: mockPosts,
    maxItems: 3,
  },
};

export const WithoutExcerpts: Story = {
  args: {
    posts: mockPosts.map(post => ({ ...post, excerpt: undefined })),
  },
};

export const MinimalData: Story = {
  args: {
    posts: mockPosts.map(post => ({ ...post, author: undefined, excerpt: undefined })),
    showViews: false,
  },
};
