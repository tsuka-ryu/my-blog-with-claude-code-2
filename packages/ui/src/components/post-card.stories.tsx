import type { Meta, StoryObj } from '@storybook/react';
import type { BlogPostSummary } from '@repo/utils';
import { PostCard } from './post-card';

const meta: Meta<typeof PostCard> = {
  title: 'Components/PostCard',
  component: PostCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPost: BlogPostSummary = {
  slug: 'react-hooks-best-practices',
  title: 'React Hooksのベストプラクティス',
  description: 'React Hooksを効果的に使用するためのパターンとアンチパターンを解説します。',
  publishedAt: new Date('2024-01-15'),
  tags: ['React', 'JavaScript', 'Frontend'],
  category: 'Technology',
  readingTime: 8,
};

const longPost: BlogPostSummary = {
  ...mockPost,
  title: '非常に長いタイトルの記事：TypeScript Genericsの基礎から応用まで完全ガイド',
  description: '非常に長い説明文のサンプルです。TypeScriptのGenericsを理解して、型安全で再利用可能なコードを書くためのテクニックを詳しく解説します。実践的な例を交えながら、基礎から応用まで幅広くカバーしています。',
  tags: ['TypeScript', 'JavaScript', 'Programming', 'Advanced', 'Generics'],
  readingTime: 25,
};

export const Default: Story = {
  args: {
    post: mockPost,
  },
};

export const WithoutDescription: Story = {
  args: {
    post: {
      ...mockPost,
      description: undefined,
    },
  },
};

export const WithoutReadingTime: Story = {
  args: {
    post: {
      ...mockPost,
      readingTime: undefined,
    },
  },
};

export const LongContent: Story = {
  args: {
    post: longPost,
  },
};

export const ManyTags: Story = {
  args: {
    post: {
      ...mockPost,
      tags: ['React', 'JavaScript', 'TypeScript', 'Frontend', 'Hooks', 'Performance', 'Best Practices'],
    },
  },
};