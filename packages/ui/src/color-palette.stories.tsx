import { ColorPalette } from './color-palette';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Color Palette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Terminal Color Palette

技術ブログのターミナル風デザインテーマで使用するカラーパレットです。

## 使用方法

各色はTailwind CSSクラスとして利用できます：

\`\`\`html
<!-- 背景色 -->
<div class="bg-terminal-bg-primary">...</div>
<div class="bg-terminal-bg-secondary">...</div>

<!-- テキスト色 -->
<p class="text-terminal-text-primary">メインテキスト</p>
<p class="text-terminal-text-secondary">サブテキスト</p>

<!-- アクセント色 -->
<span class="text-terminal-accent-green">成功メッセージ</span>
<span class="text-terminal-accent-red">エラーメッセージ</span>

<!-- ボーダー -->
<div class="border border-terminal-ui-border">...</div>

<!-- シンタックスハイライト -->
<code class="text-terminal-syntax-keyword">function</code>
<code class="text-terminal-syntax-string">"Hello World"</code>
\`\`\`

## カラーカテゴリ

- **Background Colors**: 背景色（メイン、サブ、ホバー等）
- **Text Colors**: テキスト色（プライマリ、セカンダリ、ミュート等）
- **Accent Colors**: ANSIカラーに基づくアクセントカラー
- **Syntax Highlighting**: シンタックスハイライト用の色
- **UI Elements**: UI要素用の色（ボーダー、カーソル等）
- **Prompt Colors**: プロンプト記号用の色
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['full', 'compact'],
      description: '表示バリアント',
    },
    className: {
      control: 'text',
      description: '追加のCSSクラス',
    },
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    variant: 'full',
  },
  parameters: {
    docs: {
      description: {
        story:
          '全カテゴリの色を詳細に表示します。各色の名前、値、Tailwindクラス、説明が含まれます。',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'アクセント色とシンタックスハイライト色をコンパクトに表示します。',
      },
    },
  },
};

// カテゴリ別のプレビュー用ストーリー
export const BackgroundExample: Story = {
  name: 'Background Colors Example',
  render: () => (
    <div className='space-y-4 p-6'>
      <h3 className='text-lg font-semibold font-mono'>Background Colors Example</h3>
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-terminal-bg-primary text-terminal-text-primary p-4 rounded'>
          <div className='font-mono'>Primary Background</div>
          <div className='text-sm text-terminal-text-secondary'>bg-terminal-bg-primary</div>
        </div>
        <div className='bg-terminal-bg-secondary text-terminal-text-primary p-4 rounded'>
          <div className='font-mono'>Secondary Background</div>
          <div className='text-sm text-terminal-text-secondary'>bg-terminal-bg-secondary</div>
        </div>
        <div className='bg-terminal-bg-elevated text-terminal-text-primary p-4 rounded'>
          <div className='font-mono'>Elevated Background</div>
          <div className='text-sm text-terminal-text-secondary'>bg-terminal-bg-elevated</div>
        </div>
        <div className='bg-terminal-bg-hover text-terminal-text-primary p-4 rounded'>
          <div className='font-mono'>Hover Background</div>
          <div className='text-sm text-terminal-text-secondary'>bg-terminal-bg-hover</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '背景色の実際の使用例です。ターミナル風のダークテーマを表現します。',
      },
    },
  },
};

export const AccentColorsExample: Story = {
  name: 'Accent Colors Example',
  render: () => (
    <div className='bg-terminal-bg-primary text-terminal-text-primary p-6 rounded space-y-4'>
      <h3 className='text-lg font-semibold font-mono'>Accent Colors Example</h3>
      <div className='space-y-2'>
        <div className='flex items-center gap-2'>
          <span className='text-terminal-accent-green font-mono'>✓</span>
          <span>Success message</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-terminal-accent-red font-mono'>✗</span>
          <span>Error message</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-terminal-accent-yellow font-mono'>⚠</span>
          <span>Warning message</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-terminal-accent-blue font-mono'>ℹ</span>
          <span>Info message</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-terminal-accent-cyan font-mono'>$</span>
          <span>Command prompt</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'アクセント色の実際の使用例です。ターミナルでよく使われる記号と組み合わせて表示します。',
      },
    },
  },
};

export const SyntaxHighlightExample: Story = {
  name: 'Syntax Highlighting Example',
  render: () => (
    <div className='bg-terminal-bg-primary text-terminal-text-primary p-6 rounded space-y-4'>
      <h3 className='text-lg font-semibold font-mono'>Syntax Highlighting Example</h3>
      <pre className='font-mono text-sm bg-terminal-bg-secondary p-4 rounded overflow-x-auto'>
        <code>
          <span className='text-terminal-syntax-keyword'>function</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-function'>greet</span>
          <span className='text-terminal-syntax-punctuation'>(</span>
          <span className='text-terminal-syntax-variable'>name</span>
          <span className='text-terminal-syntax-punctuation'>: </span>
          <span className='text-terminal-syntax-keyword'>string</span>
          <span className='text-terminal-syntax-punctuation'>) {`{`}</span>
          {'\n  '}
          <span className='text-terminal-syntax-comment'>{`// This is a comment`}</span>
          {'\n  '}
          <span className='text-terminal-syntax-keyword'>const</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-constant'>message</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-operator'>=</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-string'>&quot;Hello, &quot;</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-operator'>+</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-variable'>name</span>
          <span className='text-terminal-syntax-punctuation'>;</span>
          {'\n  '}
          <span className='text-terminal-syntax-keyword'>return</span>
          <span className='text-terminal-syntax-punctuation'> </span>
          <span className='text-terminal-syntax-variable'>message</span>
          <span className='text-terminal-syntax-punctuation'>;</span>
          {'\n'}
          <span className='text-terminal-syntax-punctuation'>{`}`}</span>
        </code>
      </pre>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'シンタックスハイライト色の実際の使用例です。TypeScriptコードのハイライト表示を模しています。',
      },
    },
  },
};
