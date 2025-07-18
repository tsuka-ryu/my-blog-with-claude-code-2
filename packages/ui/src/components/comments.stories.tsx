import { Comments } from './comments';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Comments> = {
  title: 'Components/Comments',
  component: Comments,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'giscus（GitHub Discussions）ベースのコメントシステムコンポーネント。記事ページでユーザーのコメントを表示・投稿するために使用します。',
      },
    },
  },
  args: {
    repo: 'tsukaryu/my-blog-with-claude-code',
    repoId: 'R_kgDOI4QgIQ',
    category: 'General',
    categoryId: 'DIC_kwDOI4QgIc4CdZv2',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    lang: 'ja',
    loading: 'lazy',
  },
  argTypes: {
    repo: {
      control: 'text',
      description: 'GitHubリポジトリ名（owner/repo形式）',
    },
    repoId: {
      control: 'text',
      description: 'GitHubリポジトリID',
    },
    category: {
      control: 'text',
      description: 'ディスカッションカテゴリ名',
    },
    categoryId: {
      control: 'text',
      description: 'ディスカッションカテゴリID',
    },
    mapping: {
      control: 'select',
      options: ['url', 'title', 'og:title', 'specific', 'number', 'pathname'],
      description: 'ディスカッションマッピング方法',
    },
    term: {
      control: 'text',
      description: 'ディスカッション用語（mappingが"specific"の場合）',
    },
    reactionsEnabled: {
      control: 'boolean',
      description: 'リアクション機能を有効にするか',
    },
    emitMetadata: {
      control: 'boolean',
      description: 'メタデータを送信するか',
    },
    inputPosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'コメント入力欄の位置',
    },
    lang: {
      control: 'select',
      options: ['ja', 'en', 'zh-CN', 'zh-TW', 'ko', 'de', 'fr', 'es', 'pt', 'it', 'ru'],
      description: '言語設定',
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: '読み込み方式',
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
        story: 'デフォルトのコメントシステム表示。記事ページの下部に配置されます。',
      },
    },
  },
};

export const InputPositionTop: Story = {
  name: 'コメント入力欄を上部に配置',
  args: {
    inputPosition: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: 'コメント入力欄を上部に配置したバージョン。',
      },
    },
  },
};

export const EnglishLanguage: Story = {
  name: '英語言語設定',
  args: {
    lang: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: '英語言語設定でのコメントシステム表示。',
      },
    },
  },
};

export const ReactionsDisabled: Story = {
  name: 'リアクション無効',
  args: {
    reactionsEnabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'リアクション機能を無効にしたバージョン。',
      },
    },
  },
};

export const TitleMapping: Story = {
  name: 'タイトルマッピング',
  args: {
    mapping: 'title',
  },
  parameters: {
    docs: {
      description: {
        story: 'ページタイトルをマッピングキーとして使用するバージョン。',
      },
    },
  },
};

export const SpecificMapping: Story = {
  name: '特定のマッピング',
  args: {
    mapping: 'specific',
    term: 'sample-post-comments',
  },
  parameters: {
    docs: {
      description: {
        story: '特定の用語をマッピングキーとして使用するバージョン。',
      },
    },
  },
};
