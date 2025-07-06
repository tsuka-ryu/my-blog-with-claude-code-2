import { SearchResults } from './search-results';

import type { SearchResultItem } from './search-results';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/SearchResults',
  component: SearchResults,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    query: {
      control: 'text',
      description: '検索クエリ',
    },
    loading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
  },
} satisfies Meta<typeof SearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockResults: SearchResultItem[] = [
  {
    slug: 'typescript-tips-2024',
    title:
      '<mark class="bg-terminal-warning/30 text-terminal-foreground rounded-sm px-0.5">TypeScript</mark>の便利なTips集 2024年版',
    description:
      '<mark class="bg-terminal-warning/30 text-terminal-foreground rounded-sm px-0.5">TypeScript</mark>を使った開発で役立つテクニックやベストプラクティスを紹介します。',
    date: '2024-03-15',
    tags: ['TypeScript', 'JavaScript', 'Tips'],
    readingTime: 8,
    score: 0.1,
  },
  {
    slug: 'react-typescript-best-practices',
    title: 'ReactとTypeScriptのベストプラクティス',
    description:
      'ReactプロジェクトでTypeScriptを効果的に使用するための設計パターンとコーディング規約について解説します。',
    date: '2024-03-10',
    tags: ['React', 'TypeScript', 'Best Practices'],
    readingTime: 12,
    score: 0.25,
  },
  {
    slug: 'advanced-typescript-patterns',
    title: '高度なTypeScriptパターン',
    excerpt:
      'ジェネリクス、条件付き型、マップ型など、TypeScriptの高度な機能を活用したデザインパターンを紹介...',
    date: '2024-03-05',
    tags: ['TypeScript', 'Advanced'],
    readingTime: 15,
    score: 0.35,
  },
];

export const Default: Story = {
  args: {
    results: mockResults,
    query: 'TypeScript',
  },
};

export const Loading: Story = {
  args: {
    results: [],
    query: 'TypeScript',
    loading: true,
  },
};

export const NoResults: Story = {
  args: {
    results: [],
    query: 'Rust',
    loading: false,
  },
};

export const NoQuery: Story = {
  args: {
    results: [],
    query: '',
    loading: false,
  },
};

export const SingleResult: Story = {
  args: {
    results: mockResults.slice(0, 1),
    query: 'TypeScript',
  },
};

export const ManyResults: Story = {
  args: {
    results: [
      ...mockResults,
      {
        slug: 'typescript-5-features',
        title: 'TypeScript 5.0の新機能まとめ',
        description: 'TypeScript 5.0で追加された新機能と改善点について詳しく解説します。',
        date: '2024-02-28',
        tags: ['TypeScript', 'Release'],
        readingTime: 10,
        score: 0.4,
      },
      {
        slug: 'migrating-to-typescript',
        title: 'JavaScriptからTypeScriptへの移行ガイド',
        description: '既存のJavaScriptプロジェクトを段階的にTypeScriptに移行する方法を解説します。',
        date: '2024-02-20',
        tags: ['TypeScript', 'Migration', 'JavaScript'],
        readingTime: 20,
        score: 0.45,
      },
    ],
    query: 'TypeScript',
  },
};

export const WithoutOptionalFields: Story = {
  args: {
    results: [
      {
        slug: 'minimal-post',
        title: '最小限の記事データ',
        date: '2024-03-01',
      },
      {
        slug: 'another-minimal-post',
        title: 'もう一つの最小限記事',
        date: '2024-02-15',
      },
    ],
    query: 'minimal',
  },
};

export const Interactive: Story = {
  render: args => {
    const handleResultClick = (slug: string) => {
      console.log(`Clicked on article: ${slug}`);
      alert(`記事 "${slug}" がクリックされました`);
    };

    return <SearchResults {...args} onResultClick={handleResultClick} />;
  },
  args: {
    results: mockResults,
    query: 'TypeScript',
  },
};
