import { Typography } from './typography';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Typography> = {
  title: 'UI Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography コンポーネントは、アクセシビリティを考慮した統一されたテキストスタイルを提供します。',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'overline'],
      description: 'テキストのスタイルバリアント',
    },
    component: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'レンダリングするHTML要素',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error'],
      description: 'テキストカラー',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'テキスト配置',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'フォントウェイト（バリアントのデフォルトを上書き）',
    },
    truncate: {
      control: 'boolean',
      description: 'テキストを1行で省略表示',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'デフォルトのTypographyコンポーネントです。',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">見出し1 - 最重要な見出し</Typography>
      <Typography variant="h2">見出し2 - セクション見出し</Typography>
      <Typography variant="h3">見出し3 - サブセクション見出し</Typography>
      <Typography variant="h4">見出し4 - 小見出し</Typography>
      <Typography variant="h5">見出し5 - 項目見出し</Typography>
      <Typography variant="h6">見出し6 - 最小見出し</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '見出し階層のアクセシビリティを考慮した適切なHTMLセマンティクス',
      },
    },
  },
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-4">
      <Typography variant="body1">
        これは本文テキスト（body1）です。記事の主要な内容や説明文に使用します。読みやすさを重視したライン高と文字サイズが設定されています。
      </Typography>
      <Typography variant="body2">
        これは小さめの本文テキスト（body2）です。補足説明やキャプション的な用途に適しています。
      </Typography>
      <Typography variant="caption">キャプションテキスト - 画像の説明や補助情報用</Typography>
      <Typography variant="overline">オーバーラインテキスト - ラベルやカテゴリ表示用</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography color="primary">プライマリカラー（デフォルト）</Typography>
      <Typography color="secondary">セカンダリカラー</Typography>
      <Typography color="muted">ミュートカラー</Typography>
      <Typography color="accent">アクセントカラー</Typography>
      <Typography color="success">成功状態（グリーン）</Typography>
      <Typography color="warning">警告状態（イエロー）</Typography>
      <Typography color="error">エラー状態（レッド）</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="w-full space-y-4">
      <Typography align="left">左寄せテキスト</Typography>
      <Typography align="center">中央寄せテキスト</Typography>
      <Typography align="right">右寄せテキスト</Typography>
      <Typography align="justify">
        均等割り付けテキスト。このテキストは行の両端に揃えられ、単語間のスペースが調整されて表示されます。長いテキストで効果が分かりやすくなります。
      </Typography>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Typography weight="normal">通常のフォントウェイト</Typography>
      <Typography weight="medium">ミディアムフォントウェイト</Typography>
      <Typography weight="semibold">セミボールドフォントウェイト</Typography>
      <Typography weight="bold">ボールドフォントウェイト</Typography>
    </div>
  ),
};

export const TruncatedText: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Typography truncate>
        これは非常に長いテキストで、コンテナの幅を超える場合に省略記号（...）で表示されます。
      </Typography>
      <Typography truncate={false}>
        これは省略されないテキストで、コンテナの幅を超える場合は通常通り改行されます。
      </Typography>
    </div>
  ),
};

export const SemanticExample: Story = {
  render: () => (
    <article className="space-y-4 max-w-2xl">
      <Typography variant="h1" component="h1">
        記事タイトル
      </Typography>

      <Typography variant="overline" color="muted">
        技術ブログ • 2024年6月17日
      </Typography>

      <Typography variant="h2" component="h2">
        はじめに
      </Typography>

      <Typography variant="body1">
        この記事では、Typographyコンポーネントの使い方とアクセシビリティについて説明します。
        適切な見出し階層とセマンティックなHTMLを使用することで、スクリーンリーダーユーザーにも
        理解しやすいコンテンツを作成できます。
      </Typography>

      <Typography variant="h3" component="h3">
        重要なポイント
      </Typography>

      <Typography variant="body2" color="muted">
        アクセシビリティは後付けではなく、最初から考慮することが重要です。
      </Typography>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: 'セマンティックなHTML構造とアクセシビリティを考慮した実際の使用例',
      },
    },
  },
};

export const CustomComponent: Story = {
  args: {
    variant: 'h3',
    component: 'div',
    children: 'h3スタイルのdiv要素',
    color: 'accent',
  },
  parameters: {
    docs: {
      description: {
        story: 'variantとcomponentを分けることで、見た目とセマンティクスを独立して制御可能',
      },
    },
  },
};
