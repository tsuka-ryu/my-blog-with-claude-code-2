import { RecentPosts } from './recent-posts';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Content/RecentPosts',
  component: RecentPosts,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'セクションのタイトル',
    },
    showReadTime: {
      control: 'boolean',
      description: '読了時間を表示するかどうか',
    },
    showTags: {
      control: 'boolean',
      description: 'タグを表示するかどうか',
    },
    maxItems: {
      control: 'number',
      description: '表示する最大記事数',
    },
    showViewAllLink: {
      control: 'boolean',
      description: '「すべて見る」リンクを表示するかどうか',
    },
    viewAllHref: {
      control: 'text',
      description: '「すべて見る」リンクのURL',
    },
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
} satisfies Meta<typeof RecentPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPosts = [
  {
    title: 'Next.js 15とTurbopackによる開発体験の向上',
    slug: 'nextjs15-turbopack-dx',
    excerpt:
      'Next.js 15で導入されたTurbopackによる高速なビルドとホットリロードの恩恵について詳しく解説します。',
    date: '2024-01-20',
    author: 'tsuka-ryu',
    tags: ['Next.js', 'Turbopack', 'Performance'],
    readTime: 8,
  },
  {
    title: 'TypeScript 5.3の新機能とbreaking changes',
    slug: 'typescript53-new-features',
    excerpt: 'TypeScript 5.3で追加された新機能と注意すべき破壊的変更について整理しました。',
    date: '2024-01-18',
    author: 'tsuka-ryu',
    tags: ['TypeScript', 'JavaScript', 'Language'],
    readTime: 12,
  },
  {
    title: 'React Server Componentsの実践的な使い方',
    slug: 'react-server-components-practical',
    excerpt:
      'React Server Componentsを実際のプロジェクトで活用するためのパターンとベストプラクティスを紹介します。',
    date: '2024-01-15',
    author: 'tsuka-ryu',
    tags: ['React', 'Server Components', 'SSR'],
    readTime: 15,
  },
  {
    title: 'Tailwind CSS v4のCSS-first設定とパフォーマンス改善',
    slug: 'tailwindcss-v4-css-first',
    excerpt:
      'Tailwind CSS v4で導入されたCSS-first設定によるビルドサイズの削減とパフォーマンス向上について説明します。',
    date: '2024-01-12',
    author: 'tsuka-ryu',
    tags: ['TailwindCSS', 'CSS', 'Performance', 'Build Tools'],
    readTime: 10,
  },
  {
    title: 'Storybook 8の新機能とテスト戦略',
    slug: 'storybook8-testing-strategy',
    excerpt:
      'Storybook 8で強化されたテスト機能とコンポーネント駆動開発における効果的なテスト戦略を解説します。',
    date: '2024-01-10',
    author: 'tsuka-ryu',
    tags: ['Storybook', 'Testing', 'Component', 'Development'],
    readTime: 14,
  },
];

export const Default: Story = {
  args: {
    posts: mockPosts,
  },
};

export const WithViewAllLink: Story = {
  args: {
    posts: mockPosts,
    showViewAllLink: true,
  },
};

export const WithoutReadTime: Story = {
  args: {
    posts: mockPosts,
    showReadTime: false,
  },
};

export const WithoutTags: Story = {
  args: {
    posts: mockPosts,
    showTags: false,
  },
};

export const CustomTitle: Story = {
  args: {
    posts: mockPosts,
    title: '新着記事',
    showViewAllLink: true,
  },
};

export const LimitedItems: Story = {
  args: {
    posts: mockPosts,
    maxItems: 3,
    showViewAllLink: true,
  },
};

export const WithoutExcerpts: Story = {
  args: {
    posts: mockPosts.map(post => ({ ...post, excerpt: undefined })),
  },
};

export const MinimalData: Story = {
  args: {
    posts: mockPosts.map(post => ({
      ...post,
      author: undefined,
      excerpt: undefined,
      tags: undefined,
      readTime: undefined,
    })),
    showReadTime: false,
    showTags: false,
  },
};
