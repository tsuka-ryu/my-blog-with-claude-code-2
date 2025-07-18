import { TableOfContents } from './table-of-contents';

import type { TableOfContentsItem } from './table-of-contents';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TableOfContents> = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'スクロール連動型の目次コンポーネント。現在読んでいる見出しをハイライトし、クリックで該当箇所にスクロールします。',
      },
    },
  },
  args: {
    items: [
      { id: 'intro', title: 'はじめに', level: 1 },
      { id: 'setup', title: '環境セットアップ', level: 2 },
      { id: 'nodejs', title: 'Node.jsのインストール', level: 3 },
      { id: 'pnpm', title: 'pnpmのインストール', level: 3 },
      { id: 'project', title: 'プロジェクトの作成', level: 2 },
      { id: 'init', title: '初期設定', level: 3 },
      { id: 'config', title: '設定ファイルの作成', level: 3 },
      { id: 'implementation', title: '実装', level: 1 },
      { id: 'components', title: 'コンポーネント', level: 2 },
      { id: 'button', title: 'Buttonコンポーネント', level: 3 },
      { id: 'form', title: 'Formコンポーネント', level: 3 },
      { id: 'styling', title: 'スタイリング', level: 2 },
      { id: 'tailwind', title: 'Tailwind CSS', level: 3 },
      { id: 'conclusion', title: 'まとめ', level: 1 },
    ] as TableOfContentsItem[],
    maxLevel: 3,
    sticky: false,
    topOffset: 100,
    scrollOffset: 100,
  },
  argTypes: {
    items: {
      control: 'object',
      description: '目次のアイテム配列',
    },
    maxLevel: {
      control: 'number',
      description: '最大表示レベル',
    },
    sticky: {
      control: 'boolean',
      description: '固定表示するか',
    },
    topOffset: {
      control: 'number',
      description: '上部からのオフセット（stickyの場合）',
    },
    scrollOffset: {
      control: 'number',
      description: 'スクロールオフセット（見出しがアクティブになるタイミング）',
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
        story: 'デフォルトの目次表示。3レベルまでの見出しを表示します。',
      },
    },
  },
};

export const TwoLevels: Story = {
  name: '2レベルまで',
  args: {
    maxLevel: 2,
  },
  parameters: {
    docs: {
      description: {
        story: '2レベルまでの見出しのみを表示するバージョン。',
      },
    },
  },
};

export const AllLevels: Story = {
  name: '全レベル',
  args: {
    maxLevel: 6,
    items: [
      { id: 'h1', title: 'レベル1見出し', level: 1 },
      { id: 'h2', title: 'レベル2見出し', level: 2 },
      { id: 'h3', title: 'レベル3見出し', level: 3 },
      { id: 'h4', title: 'レベル4見出し', level: 4 },
      { id: 'h5', title: 'レベル5見出し', level: 5 },
      { id: 'h6', title: 'レベル6見出し', level: 6 },
    ] as TableOfContentsItem[],
  },
  parameters: {
    docs: {
      description: {
        story: '全レベルの見出しを表示するバージョン。',
      },
    },
  },
};

export const Sticky: Story = {
  name: '固定表示',
  args: {
    sticky: true,
  },
  parameters: {
    docs: {
      description: {
        story: '固定表示（sticky）で画面上部に固定されるバージョン。',
      },
    },
  },
};

export const SimpleStructure: Story = {
  name: 'シンプルな構造',
  args: {
    items: [
      { id: 'overview', title: '概要', level: 1 },
      { id: 'features', title: '機能', level: 1 },
      { id: 'usage', title: '使用方法', level: 1 },
      { id: 'examples', title: '例', level: 1 },
    ] as TableOfContentsItem[],
  },
  parameters: {
    docs: {
      description: {
        story: 'レベル1の見出しのみのシンプルな構造。',
      },
    },
  },
};

export const DeepNesting: Story = {
  name: '深いネスト',
  args: {
    items: [
      { id: 'main', title: 'メイン', level: 1 },
      { id: 'section1', title: 'セクション1', level: 2 },
      { id: 'subsection1-1', title: 'サブセクション1-1', level: 3 },
      { id: 'detail1-1-1', title: '詳細1-1-1', level: 4 },
      { id: 'detail1-1-2', title: '詳細1-1-2', level: 4 },
      { id: 'subsection1-2', title: 'サブセクション1-2', level: 3 },
      { id: 'section2', title: 'セクション2', level: 2 },
      { id: 'subsection2-1', title: 'サブセクション2-1', level: 3 },
    ] as TableOfContentsItem[],
    maxLevel: 4,
  },
  parameters: {
    docs: {
      description: {
        story: '深いネスト構造の目次表示。',
      },
    },
  },
};

export const LongTitles: Story = {
  name: '長いタイトル',
  args: {
    items: [
      {
        id: 'long1',
        title:
          'これは非常に長いタイトルの例です。実際の記事では、このような長いタイトルも存在することがあります。',
        level: 1,
      },
      {
        id: 'long2',
        title: 'もう一つの長いタイトルの例。技術記事では詳細な説明が必要な場合があります。',
        level: 2,
      },
      { id: 'short', title: '短いタイトル', level: 2 },
      {
        id: 'long3',
        title:
          'Next.jsとTypeScriptを使用したモダンなウェブアプリケーション開発の実践的なアプローチ',
        level: 3,
      },
    ] as TableOfContentsItem[],
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルが含まれる場合の表示確認。',
      },
    },
  },
};

export const Empty: Story = {
  name: '空の目次',
  args: {
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '目次アイテムが空の場合。何も表示されません。',
      },
    },
  },
};
