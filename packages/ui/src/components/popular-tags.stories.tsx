import { PopularTags, TagRanking } from './popular-tags';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PopularTags> = {
  title: 'Components/PopularTags',
  component: PopularTags,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '人気タグを表示するコンポーネント。使用頻度に基づいてタグを表示し、ランキング形式でも表示できます。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'compact'],
      description: '表示スタイル',
    },
    showCount: {
      control: 'boolean',
      description: 'タグの使用回数を表示するかどうか',
    },
    limit: {
      control: 'number',
      description: '表示する最大タグ数',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PopularTags>;

const sampleTags = [
  { name: 'React', count: 25 },
  { name: 'TypeScript', count: 20 },
  { name: 'Next.js', count: 18 },
  { name: 'JavaScript', count: 15 },
  { name: 'CSS', count: 12 },
  { name: 'Node.js', count: 10 },
  { name: 'GraphQL', count: 8 },
  { name: 'MongoDB', count: 6 },
  { name: 'Docker', count: 5 },
  { name: 'AWS', count: 4 },
];

const japaneseTagsSample = [
  { name: 'フロントエンド', count: 30 },
  { name: 'バックエンド', count: 25 },
  { name: 'デザインシステム', count: 20 },
  { name: 'パフォーマンス', count: 15 },
  { name: 'アクセシビリティ', count: 12 },
  { name: 'セキュリティ', count: 10 },
  { name: 'データベース', count: 8 },
  { name: 'インフラ', count: 6 },
];

export const Default: Story = {
  args: {
    tags: sampleTags,
    title: '人気タグ',
    showCount: true,
    variant: 'default',
  },
};

export const WithoutCount: Story = {
  args: {
    tags: sampleTags,
    title: '人気タグ',
    showCount: false,
    variant: 'default',
  },
};

export const Minimal: Story = {
  args: {
    tags: sampleTags.slice(0, 6),
    title: '人気タグ',
    showCount: true,
    variant: 'minimal',
  },
};

export const Compact: Story = {
  args: {
    tags: sampleTags.slice(0, 8),
    title: 'タグ',
    showCount: true,
    variant: 'compact',
  },
};

export const Limited: Story = {
  args: {
    tags: sampleTags,
    title: 'Top 5 タグ',
    showCount: true,
    variant: 'default',
    limit: 5,
  },
};

export const Interactive: Story = {
  args: {
    tags: sampleTags,
    title: '人気タグ',
    showCount: true,
    variant: 'default',
    onTagClick: (tag: string) => {
      alert(`Clicked on tag: ${tag}`);
    },
  },
};

export const Japanese: Story = {
  args: {
    tags: japaneseTagsSample,
    title: '人気タグ',
    showCount: true,
    variant: 'default',
    onTagClick: (tag: string) => {
      alert(`タグをクリック: ${tag}`);
    },
  },
};

export const Empty: Story = {
  args: {
    tags: [],
    title: '人気タグ',
    showCount: true,
    variant: 'default',
  },
};

// TagRanking component stories
export const Ranking: StoryObj<typeof TagRanking> = {
  render: args => <TagRanking {...args} />,
  args: {
    tags: sampleTags,
    title: 'タグランキング',
    showRanking: true,
    limit: 10,
  },
};

export const RankingWithoutNumbers: StoryObj<typeof TagRanking> = {
  render: args => <TagRanking {...args} />,
  args: {
    tags: sampleTags,
    title: 'タグ使用状況',
    showRanking: false,
    limit: 8,
  },
};

export const RankingInteractive: StoryObj<typeof TagRanking> = {
  render: args => <TagRanking {...args} />,
  args: {
    tags: sampleTags,
    title: 'タグランキング',
    showRanking: true,
    limit: 5,
    onTagClick: (tag: string) => {
      alert(`ランキングからクリック: ${tag}`);
    },
  },
};

export const RankingJapanese: StoryObj<typeof TagRanking> = {
  render: args => <TagRanking {...args} />,
  args: {
    tags: japaneseTagsSample,
    title: 'タグランキング',
    showRanking: true,
    limit: 8,
    onTagClick: (tag: string) => {
      alert(`ランキングからクリック: ${tag}`);
    },
  },
};

export const RankingEmpty: StoryObj<typeof TagRanking> = {
  render: args => <TagRanking {...args} />,
  args: {
    tags: [],
    title: 'タグランキング',
    showRanking: true,
  },
};
