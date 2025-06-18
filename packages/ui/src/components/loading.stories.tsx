import { Loading } from './loading';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ローディング状態を表示するコンポーネント。アクセシビリティを考慮し、aria-live属性とスクリーンリーダー対応を実装。',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['spinner', 'pulse', 'skeleton'],
      description: 'ローディングの表示形式',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'ローディングのサイズ',
    },
    text: {
      control: { type: 'text' },
      description: 'ローディング中に表示するテキスト',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: '読み込み中...',
  },
};

export const Spinner: Story = {
  args: {
    variant: 'spinner',
    text: 'データを読み込んでいます',
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
    text: '処理中',
  },
};

export const Skeleton: Story = {
  args: {
    variant: 'skeleton',
  },
  parameters: {
    docs: {
      description: {
        story: 'コンテンツの読み込み中にスケルトンUIを表示',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-sm font-medium mb-4'>Small</h3>
        <Loading size='sm' text='小さいサイズ' />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-4'>Medium (Default)</h3>
        <Loading size='md' text='中サイズ' />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-4'>Large</h3>
        <Loading size='lg' text='大きいサイズ' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '各サイズのローディング表示',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-sm font-medium mb-4'>Spinner</h3>
        <Loading variant='spinner' text='スピナー' />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-4'>Pulse</h3>
        <Loading variant='pulse' text='パルス' />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-4'>Skeleton</h3>
        <Loading variant='skeleton' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '各種ローディングバリエーション',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    variant: 'spinner',
    text: 'カスタムスタイル',
    className: 'p-8 bg-gray-100 dark:bg-gray-800 rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'カスタムクラス名を使用してスタイリングをカスタマイズ',
      },
    },
  },
};
