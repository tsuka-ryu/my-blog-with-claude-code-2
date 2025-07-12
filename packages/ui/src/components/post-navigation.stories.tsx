import { PostNavigation } from './post-navigation';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Navigation/PostNavigation',
  component: PostNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
} satisfies Meta<typeof PostNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BothPosts: Story = {
  args: {
    previousPost: {
      title: 'TypeScriptの基本的な型システム',
      slug: 'typescript-basic-types',
      excerpt: 'TypeScriptの型システムの基本概念について解説します。',
    },
    nextPost: {
      title: 'React HooksとTypeScriptの型安全性',
      slug: 'react-hooks-typescript',
      excerpt: 'React HooksをTypeScriptで型安全に使用する方法を紹介します。',
    },
  },
};

export const PreviousOnly: Story = {
  args: {
    previousPost: {
      title: 'JavaScriptからTypeScriptへの移行ガイド',
      slug: 'javascript-to-typescript',
      excerpt: '既存のJavaScriptプロジェクトをTypeScriptに移行する手順を説明します。',
    },
  },
};

export const NextOnly: Story = {
  args: {
    nextPost: {
      title: 'Node.jsでのTypeScript開発環境構築',
      slug: 'nodejs-typescript-setup',
      excerpt: 'Node.jsプロジェクトでTypeScriptを使用するための環境構築方法を解説します。',
    },
  },
};

export const WithoutExcerpts: Story = {
  args: {
    previousPost: {
      title: 'TypeScriptの基本的な型システム',
      slug: 'typescript-basic-types',
    },
    nextPost: {
      title: 'React HooksとTypeScriptの型安全性',
      slug: 'react-hooks-typescript',
    },
  },
};

export const LongTitles: Story = {
  args: {
    previousPost: {
      title: 'TypeScriptの高度な型プログラミング：条件型とマップ型を使った実践的なユースケース',
      slug: 'advanced-typescript-conditional-mapped-types',
      excerpt:
        'TypeScriptの条件型とマップ型を組み合わせた高度なテクニックを実例とともに詳しく解説します。',
    },
    nextPost: {
      title: 'React 18とTypeScriptによるパフォーマンス最適化：Concurrent Features活用法',
      slug: 'react18-typescript-performance-optimization',
      excerpt:
        'React 18の新機能を活用したパフォーマンス最適化の手法をTypeScriptで実装する方法を紹介します。',
    },
  },
};
