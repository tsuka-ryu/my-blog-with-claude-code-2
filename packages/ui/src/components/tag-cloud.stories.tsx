import { TagCloud, Tag, type TagCloudItem } from './tag-cloud';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TagCloud> = {
  title: 'Components/TagCloud',
  component: TagCloud,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'タグクラウドコンポーネント。タグの使用頻度に応じてサイズを調整し、視覚的に表示します。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'interactive', 'minimal'],
      description: 'タグクラウドの表示スタイル',
    },
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'loose'],
      description: 'タグ間のスペース',
    },
    showCount: {
      control: 'boolean',
      description: '各タグの記事数を表示するかどうか',
    },
    maxItems: {
      control: 'number',
      description: '表示する最大タグ数',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TagCloud>;

const sampleTags: TagCloudItem[] = [
  { name: 'React', count: 25, weight: 1.0, size: '2xl' },
  { name: 'TypeScript', count: 20, weight: 0.8, size: 'xl' },
  { name: 'Next.js', count: 18, weight: 0.72, size: 'lg' },
  { name: 'JavaScript', count: 15, weight: 0.6, size: 'lg' },
  { name: 'CSS', count: 12, weight: 0.48, size: 'base' },
  { name: 'Node.js', count: 10, weight: 0.4, size: 'base' },
  { name: 'GraphQL', count: 8, weight: 0.32, size: 'sm' },
  { name: 'MongoDB', count: 6, weight: 0.24, size: 'sm' },
  { name: 'Docker', count: 5, weight: 0.2, size: 'xs' },
  { name: 'AWS', count: 4, weight: 0.16, size: 'xs' },
  { name: 'Kubernetes', count: 3, weight: 0.12, size: 'xs' },
  { name: 'Testing', count: 7, weight: 0.28, size: 'sm' },
];

const japaneseTagsSample: TagCloudItem[] = [
  { name: 'フロントエンド', count: 30, weight: 1.0, size: '2xl' },
  { name: 'バックエンド', count: 25, weight: 0.83, size: 'xl' },
  { name: 'デザインシステム', count: 20, weight: 0.67, size: 'lg' },
  { name: 'パフォーマンス', count: 15, weight: 0.5, size: 'base' },
  { name: 'アクセシビリティ', count: 12, weight: 0.4, size: 'base' },
  { name: 'セキュリティ', count: 10, weight: 0.33, size: 'sm' },
  { name: 'データベース', count: 8, weight: 0.27, size: 'sm' },
  { name: 'インフラ', count: 6, weight: 0.2, size: 'xs' },
  { name: 'モニタリング', count: 4, weight: 0.13, size: 'xs' },
];

export const Default: Story = {
  args: {
    tags: sampleTags,
    variant: 'default',
    spacing: 'normal',
    showCount: false,
  },
};

export const WithCount: Story = {
  args: {
    tags: sampleTags,
    variant: 'default',
    spacing: 'normal',
    showCount: true,
  },
};

export const Interactive: Story = {
  args: {
    tags: sampleTags,
    variant: 'interactive',
    spacing: 'normal',
    showCount: true,
    onTagClick: (tag: string) => {
      alert(`Clicked on tag: ${tag}`);
    },
  },
};

export const Minimal: Story = {
  args: {
    tags: sampleTags,
    variant: 'minimal',
    spacing: 'tight',
    showCount: false,
  },
};

export const Japanese: Story = {
  args: {
    tags: japaneseTagsSample,
    variant: 'interactive',
    spacing: 'normal',
    showCount: true,
    onTagClick: (tag: string) => {
      alert(`タグをクリック: ${tag}`);
    },
  },
};

export const LimitedItems: Story = {
  args: {
    tags: sampleTags,
    variant: 'default',
    spacing: 'normal',
    maxItems: 6,
    showCount: true,
  },
};

export const Empty: Story = {
  args: {
    tags: [],
    variant: 'default',
    spacing: 'normal',
  },
};

export const LooseSpacing: Story = {
  args: {
    tags: sampleTags.slice(0, 8),
    variant: 'interactive',
    spacing: 'loose',
    showCount: true,
  },
};

// Individual Tag component stories
export const SingleTag: StoryObj<typeof Tag> = {
  render: args => <Tag {...args} />,
  args: {
    tag: 'React',
    count: 25,
    size: 'base',
    variant: 'default',
  },
};

export const TagVariants: StoryObj<typeof Tag> = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Tag tag='Default' variant='default' count={10} />
      <Tag tag='Outline' variant='outline' count={8} />
      <Tag tag='Ghost' variant='ghost' count={5} />
    </div>
  ),
};

export const TagSizes: StoryObj<typeof Tag> = {
  render: () => (
    <div className='flex flex-wrap items-center gap-4'>
      <Tag tag='XS' size='xs' />
      <Tag tag='SM' size='sm' />
      <Tag tag='Base' size='base' />
      <Tag tag='LG' size='lg' />
      <Tag tag='XL' size='xl' />
      <Tag tag='2XL' size='2xl' />
    </div>
  ),
};

export const InteractiveTags: StoryObj<typeof Tag> = {
  render: () => (
    <div className='flex flex-wrap gap-4'>
      <Tag tag='Clickable' interactive count={15} onClick={() => alert('Tag clicked!')} />
      <Tag
        tag='Interactive'
        variant='outline'
        interactive
        count={8}
        onClick={() => alert('Outline tag clicked!')}
      />
      <Tag
        tag='Ghost'
        variant='ghost'
        interactive
        count={3}
        onClick={() => alert('Ghost tag clicked!')}
      />
    </div>
  ),
};
