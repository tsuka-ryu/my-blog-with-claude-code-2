import { Error } from './error';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Error> = {
  title: 'Components/Error',
  component: Error,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'エラー状態を表示するコンポーネント。アクセシビリティを考慮し、適切なaria属性とスクリーンリーダー対応を実装。',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'エラーのタイトル',
    },
    message: {
      control: { type: 'text' },
      description: 'エラーメッセージ',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'critical', 'warning'],
      description: 'エラーの重要度',
    },
    retryText: {
      control: { type: 'text' },
      description: '再試行ボタンのテキスト',
    },
    onRetry: {
      action: 'retry',
      description: '再試行ボタンクリック時のコールバック',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'データの読み込みに失敗しました。',
  },
};

export const WithRetry: Story = {
  args: {
    title: 'ネットワークエラー',
    message: 'サーバーに接続できませんでした。インターネット接続を確認してから再試行してください。',
    onRetry: () => console.log('再試行'),
  },
};

export const Critical: Story = {
  args: {
    variant: 'critical',
    title: '重大なエラー',
    message: 'システムエラーが発生しました。しばらく時間をおいてから再試行してください。',
    onRetry: () => console.log('再試行'),
  },
  parameters: {
    docs: {
      description: {
        story: '重大なエラー表示。より目立つスタイルで表示される',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '注意',
    message: '一部のデータが正常に読み込めませんでした。',
    onRetry: () => console.log('再試行'),
    retryText: 'もう一度試す',
  },
  parameters: {
    docs: {
      description: {
        story: '警告レベルのエラー表示',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    title: 'ファイルアップロードエラー',
    onRetry: () => console.log('再試行'),
    children: (
      <div>
        <p>以下のファイルをアップロードできませんでした：</p>
        <ul className='list-disc list-inside mt-2 space-y-1'>
          <li>document.pdf （ファイルサイズが大きすぎます）</li>
          <li>image.png （サポートされていない形式です）</li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'カスタム内容を含むエラー表示。childrenプロパティを使用',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className='space-y-6 max-w-md'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Default</h3>
        <Error message='通常のエラーメッセージです。' onRetry={() => console.log('再試行')} />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Critical</h3>
        <Error
          variant='critical'
          title='重大なエラー'
          message='システムエラーが発生しました。'
          onRetry={() => console.log('再試行')}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Warning</h3>
        <Error
          variant='warning'
          title='警告'
          message='一部の処理が完了しませんでした。'
          onRetry={() => console.log('再試行')}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '各バリエーションのエラー表示',
      },
    },
  },
};

export const WithoutRetry: Story = {
  args: {
    title: '権限エラー',
    message: 'このリソースにアクセスする権限がありません。管理者にお問い合わせください。',
  },
  parameters: {
    docs: {
      description: {
        story: '再試行ボタンがないエラー表示',
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    title: '詳細なエラー情報',
    message:
      'データベース接続エラーが発生しました。このエラーは通常、一時的なネットワークの問題やサーバーメンテナンスが原因で発生します。問題が継続する場合は、システム管理者にお問い合わせください。エラーコード: DB_CONNECTION_TIMEOUT (Code: 500)',
    onRetry: () => console.log('再試行'),
  },
  parameters: {
    docs: {
      description: {
        story: '長いエラーメッセージの表示例',
      },
    },
  },
};
