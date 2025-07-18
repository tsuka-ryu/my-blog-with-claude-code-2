import { ShareButtons } from './share-buttons';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ShareButtons> = {
  title: 'Components/ShareButtons',
  component: ShareButtons,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ソーシャルメディアシェアボタンコンポーネント。記事をTwitter、Facebook、LinkedInでシェアしたり、リンクをコピーしたりできます。',
      },
    },
  },
  args: {
    title: 'Next.jsとTypeScriptで作るモダンなブログシステム',
    url: 'https://example.com/posts/nextjs-typescript-blog',
    description: 'Next.jsとTypeScriptを使った高性能なブログシステムの作り方を解説します。',
    direction: 'horizontal',
    platforms: ['twitter', 'facebook', 'linkedin', 'copy'],
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'シェアする記事のタイトル',
    },
    url: {
      control: 'text',
      description: 'シェアするページのURL',
    },
    description: {
      control: 'text',
      description: 'ページの概要（オプション）',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'ボタンの表示方向',
    },
    platforms: {
      control: 'check',
      options: ['twitter', 'facebook', 'linkedin', 'copy'],
      description: '表示するプラットフォーム',
    },
    onCopyComplete: {
      action: 'copied',
      description: 'リンクコピー完了時のコールバック',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'デフォルト',
  parameters: {
    docs: {
      description: {
        story: 'すべてのシェアボタンを横並びで表示するデフォルト状態。',
      },
    },
  },
};

export const Vertical: Story = {
  name: '縦並び',
  args: {
    direction: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'シェアボタンを縦並びで表示するバージョン。',
      },
    },
  },
};

export const TwitterOnly: Story = {
  name: 'Twitterのみ',
  args: {
    platforms: ['twitter'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Twitterシェアボタンのみを表示するバージョン。',
      },
    },
  },
};

export const SocialOnly: Story = {
  name: 'ソーシャルメディアのみ',
  args: {
    platforms: ['twitter', 'facebook', 'linkedin'],
  },
  parameters: {
    docs: {
      description: {
        story: 'ソーシャルメディアボタンのみを表示（コピー機能なし）。',
      },
    },
  },
};

export const CopyOnly: Story = {
  name: 'コピーのみ',
  args: {
    platforms: ['copy'],
  },
  parameters: {
    docs: {
      description: {
        story: 'リンクコピーボタンのみを表示するバージョン。',
      },
    },
  },
};

export const LongTitle: Story = {
  name: '長いタイトル',
  args: {
    title:
      'Next.jsとTypeScriptで作るモダンなブログシステム - パフォーマンス最適化とSEO対策を含む包括的な実装ガイド',
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルでのシェアボタンの表示確認。',
      },
    },
  },
};

export const WithDescription: Story = {
  name: '説明付き',
  args: {
    description:
      'この記事では、Next.js 15とTypeScriptを使用して高性能なブログシステムを構築する方法について詳しく解説します。SSG、ISR、SEO最適化などの実装方法も含まれています。',
  },
  parameters: {
    docs: {
      description: {
        story: '記事の説明文を含むバージョン。',
      },
    },
  },
};
