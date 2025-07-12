import { Breadcrumb } from './breadcrumb';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '記事一覧', href: '/posts' },
      { label: 'TypeScriptの型システム入門' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: 'ホーム', href: '/' }, { label: 'タグ: TypeScript' }],
  },
};

export const SingleLevel: Story = {
  args: {
    items: [{ label: '検索結果' }],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'ホーム', href: '/' },
      { label: '記事一覧', href: '/posts' },
      { label: 'カテゴリ: プログラミング', href: '/category/programming' },
      { label: 'タグ: TypeScript', href: '/tags/typescript' },
      { label: 'TypeScriptの高度な型プログラミング' },
    ],
  },
};
