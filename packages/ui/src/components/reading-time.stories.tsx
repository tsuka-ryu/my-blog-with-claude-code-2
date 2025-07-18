import { ReadingTime } from './reading-time';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ReadingTime> = {
  title: 'Components/ReadingTime',
  component: ReadingTime,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '記事の読了時間を表示するコンポーネント。記事の内容から文字数を計算し、読了時間を推定します。',
      },
    },
  },
  args: {
    content: 'これは記事の内容です。実際の記事では、もっと長い内容になります。'.repeat(10),
    wordsPerMinute: 500,
    format: 'short',
    showIcon: true,
  },
  argTypes: {
    content: {
      control: 'text',
      description: '記事の内容（文字数計算用）',
    },
    wordsPerMinute: {
      control: 'number',
      description: '1分あたりの読める文字数',
    },
    format: {
      control: 'select',
      options: ['short', 'long'],
      description: '表示形式',
    },
    showIcon: {
      control: 'boolean',
      description: 'アイコンを表示するか',
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
        story: 'デフォルトの読了時間表示。短い形式でアイコン付きで表示されます。',
      },
    },
  },
};

export const LongFormat: Story = {
  name: '長い形式',
  args: {
    format: 'long',
  },
  parameters: {
    docs: {
      description: {
        story: '「読了時間: 約X分」の形式で表示するバージョン。',
      },
    },
  },
};

export const WithoutIcon: Story = {
  name: 'アイコンなし',
  args: {
    showIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'アイコンを表示しないバージョン。',
      },
    },
  },
};

export const ShortContent: Story = {
  name: '短い記事',
  args: {
    content: 'これは短い記事です。',
  },
  parameters: {
    docs: {
      description: {
        story: '短い記事（最低1分として表示）。',
      },
    },
  },
};

export const LongContent: Story = {
  name: '長い記事',
  args: {
    content:
      'これは非常に長い記事の内容です。実際のブログ記事では、技術的な内容や詳細な説明が含まれることが多く、読了時間も長くなります。'.repeat(
        50
      ),
  },
  parameters: {
    docs: {
      description: {
        story: '長い記事での読了時間表示。',
      },
    },
  },
};

export const WithHTML: Story = {
  name: 'HTMLタグを含む記事',
  args: {
    content:
      '<h1>タイトル</h1><p>これは<strong>HTMLタグ</strong>を含む記事です。</p><ul><li>項目1</li><li>項目2</li></ul><p>HTMLタグは読了時間の計算時に除去されます。</p>'.repeat(
        20
      ),
  },
  parameters: {
    docs: {
      description: {
        story: 'HTMLタグを含む記事の場合、タグを除去して文字数を計算します。',
      },
    },
  },
};

export const FastReader: Story = {
  name: '早い読者',
  args: {
    wordsPerMinute: 800,
  },
  parameters: {
    docs: {
      description: {
        story: '1分あたり800文字読める早い読者向けの設定。',
      },
    },
  },
};

export const SlowReader: Story = {
  name: 'ゆっくり読む読者',
  args: {
    wordsPerMinute: 300,
  },
  parameters: {
    docs: {
      description: {
        story: '1分あたり300文字読むゆっくり読む読者向けの設定。',
      },
    },
  },
};
