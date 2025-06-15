import type { ComponentProps } from 'react';

interface ColorSwatchProps {
  name: string;
  value: string;
  className: string;
  description?: string;
}

function ColorSwatch({ name, value, className, description }: ColorSwatchProps) {
  return (
    <div className='flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors'>
      {/* 色見本 - 大きくて見やすく */}
      <div className='flex-shrink-0'>
        <div
          className='w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm'
          style={{ backgroundColor: value }}
          title={`${name}: ${value}`}
        />
        {/* 小さい色見本も追加（比較用） */}
        <div
          className='w-8 h-2 mt-1 rounded-sm border border-gray-300'
          style={{ backgroundColor: value }}
        />
      </div>

      {/* 情報部分 */}
      <div className='flex-1 min-w-0'>
        <div className='font-mono text-base font-semibold text-gray-900 mb-1'>{name}</div>
        <div className='font-mono text-sm text-gray-600 mb-1'>
          <span className='inline-block bg-gray-100 px-2 py-1 rounded text-xs'>{value}</span>
        </div>
        <div className='font-mono text-xs text-gray-500 mb-1'>
          <code className='bg-blue-50 text-blue-700 px-1 py-0.5 rounded'>{className}</code>
        </div>
        {description && <div className='text-sm text-gray-700 mt-2 italic'>{description}</div>}
      </div>
    </div>
  );
}

interface ColorPaletteSectionProps {
  title: string;
  colors: ColorSwatchProps[];
}

function ColorPaletteSection({ title, colors }: ColorPaletteSectionProps) {
  return (
    <div className='mb-10'>
      <h3 className='text-xl font-bold mb-6 font-mono text-gray-800 border-b-2 border-gray-200 pb-2'>
        {title}
      </h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {colors.map((color, index) => (
          <ColorSwatch key={index} {...color} />
        ))}
      </div>
    </div>
  );
}

export interface ColorPaletteProps extends ComponentProps<'div'> {
  variant?: 'full' | 'compact';
}

export function ColorPalette({ variant = 'full', className, ...props }: ColorPaletteProps) {
  const backgroundColors: ColorSwatchProps[] = [
    {
      name: 'terminal-bg-primary',
      value: '#0c0c0c',
      className: 'bg-terminal-bg-primary',
      description: 'メイン背景（深い黒）',
    },
    {
      name: 'terminal-bg-secondary',
      value: '#1a1a1a',
      className: 'bg-terminal-bg-secondary',
      description: 'サブ背景（少し明るい黒）',
    },
    {
      name: 'terminal-bg-elevated',
      value: '#252525',
      className: 'bg-terminal-bg-elevated',
      description: 'カード、モーダルなど',
    },
    {
      name: 'terminal-bg-hover',
      value: '#2a2a2a',
      className: 'bg-terminal-bg-hover',
      description: 'ホバー時の背景',
    },
  ];

  const textColors: ColorSwatchProps[] = [
    {
      name: 'terminal-text-primary',
      value: '#f4f4f4',
      className: 'bg-terminal-text-primary',
      description: 'プライマリテキスト（明るい白）',
    },
    {
      name: 'terminal-text-secondary',
      value: '#a8a8a8',
      className: 'bg-terminal-text-secondary',
      description: 'セカンダリテキスト（グレー）',
    },
    {
      name: 'terminal-text-muted',
      value: '#6b6b6b',
      className: 'bg-terminal-text-muted',
      description: 'ミュートテキスト（暗いグレー）',
    },
    {
      name: 'terminal-text-bright',
      value: '#ffffff',
      className: 'bg-terminal-text-bright',
      description: '明るい白（強調用）',
    },
  ];

  const accentColors: ColorSwatchProps[] = [
    {
      name: 'terminal-accent-red',
      value: '#ff5f56',
      className: 'bg-terminal-accent-red',
      description: 'エラー、削除',
    },
    {
      name: 'terminal-accent-green',
      value: '#5af78e',
      className: 'bg-terminal-accent-green',
      description: '成功、追加',
    },
    {
      name: 'terminal-accent-yellow',
      value: '#f3f99d',
      className: 'bg-terminal-accent-yellow',
      description: '警告、注意',
    },
    {
      name: 'terminal-accent-blue',
      value: '#57c7ff',
      className: 'bg-terminal-accent-blue',
      description: '情報、リンク',
    },
    {
      name: 'terminal-accent-magenta',
      value: '#ff6ac1',
      className: 'bg-terminal-accent-magenta',
      description: '特殊、装飾',
    },
    {
      name: 'terminal-accent-cyan',
      value: '#9aedfe',
      className: 'bg-terminal-accent-cyan',
      description: 'シアン（コマンド、関数）',
    },
    {
      name: 'terminal-accent-orange',
      value: '#ffb86c',
      className: 'bg-terminal-accent-orange',
      description: 'オレンジ（文字列、引用）',
    },
  ];

  const accentDarkColors: ColorSwatchProps[] = [
    {
      name: 'terminal-accent-red-dark',
      value: '#cc4b47',
      className: 'bg-terminal-accent-red-dark',
      description: 'エラー（暗め）',
    },
    {
      name: 'terminal-accent-green-dark',
      value: '#4bc775',
      className: 'bg-terminal-accent-green-dark',
      description: '成功（暗め）',
    },
    {
      name: 'terminal-accent-yellow-dark',
      value: '#d6d57e',
      className: 'bg-terminal-accent-yellow-dark',
      description: '警告（暗め）',
    },
    {
      name: 'terminal-accent-blue-dark',
      value: '#4ba6cc',
      className: 'bg-terminal-accent-blue-dark',
      description: '情報（暗め）',
    },
    {
      name: 'terminal-accent-magenta-dark',
      value: '#cc539a',
      className: 'bg-terminal-accent-magenta-dark',
      description: '特殊（暗め）',
    },
    {
      name: 'terminal-accent-cyan-dark',
      value: '#7bc5d3',
      className: 'bg-terminal-accent-cyan-dark',
      description: 'シアン（暗め）',
    },
    {
      name: 'terminal-accent-orange-dark',
      value: '#cc9256',
      className: 'bg-terminal-accent-orange-dark',
      description: 'オレンジ（暗め）',
    },
  ];

  const syntaxColors: ColorSwatchProps[] = [
    {
      name: 'terminal-syntax-keyword',
      value: '#ff6ac1',
      className: 'bg-terminal-syntax-keyword',
      description: 'キーワード（if, for, function など）',
    },
    {
      name: 'terminal-syntax-string',
      value: '#f3f99d',
      className: 'bg-terminal-syntax-string',
      description: '文字列',
    },
    {
      name: 'terminal-syntax-comment',
      value: '#6b6b6b',
      className: 'bg-terminal-syntax-comment',
      description: 'コメント',
    },
    {
      name: 'terminal-syntax-function',
      value: '#57c7ff',
      className: 'bg-terminal-syntax-function',
      description: '関数名',
    },
    {
      name: 'terminal-syntax-variable',
      value: '#9aedfe',
      className: 'bg-terminal-syntax-variable',
      description: '変数',
    },
    {
      name: 'terminal-syntax-constant',
      value: '#ff6ac1',
      className: 'bg-terminal-syntax-constant',
      description: '定数',
    },
    {
      name: 'terminal-syntax-operator',
      value: '#ff5f56',
      className: 'bg-terminal-syntax-operator',
      description: '演算子',
    },
    {
      name: 'terminal-syntax-punctuation',
      value: '#a8a8a8',
      className: 'bg-terminal-syntax-punctuation',
      description: '句読点、括弧など',
    },
  ];

  const uiColors: ColorSwatchProps[] = [
    {
      name: 'terminal-ui-border',
      value: '#333333',
      className: 'bg-terminal-ui-border',
      description: 'ボーダー（デフォルト）',
    },
    {
      name: 'terminal-ui-border-hover',
      value: '#444444',
      className: 'bg-terminal-ui-border-hover',
      description: 'ボーダー（ホバー時）',
    },
    {
      name: 'terminal-ui-border-focus',
      value: '#57c7ff',
      className: 'bg-terminal-ui-border-focus',
      description: 'ボーダー（フォーカス時）',
    },
    {
      name: 'terminal-ui-divider',
      value: '#2a2a2a',
      className: 'bg-terminal-ui-divider',
      description: '区切り線',
    },
    {
      name: 'terminal-ui-cursor',
      value: '#f4f4f4',
      className: 'bg-terminal-ui-cursor',
      description: 'カーソル',
    },
  ];

  const promptColors: ColorSwatchProps[] = [
    {
      name: 'terminal-prompt-user',
      value: '#5af78e',
      className: 'bg-terminal-prompt-user',
      description: 'ユーザープロンプト ($, >)',
    },
    {
      name: 'terminal-prompt-root',
      value: '#ff5f56',
      className: 'bg-terminal-prompt-root',
      description: 'ルートプロンプト (#)',
    },
    {
      name: 'terminal-prompt-path',
      value: '#57c7ff',
      className: 'bg-terminal-prompt-path',
      description: 'パス表示',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={`p-6 ${className}`} {...props}>
        <h2 className='text-2xl font-bold mb-8 font-mono text-gray-800'>
          Terminal Color Palette (Compact)
        </h2>
        <div className='space-y-6'>
          {/* アクセントカラー */}
          <div>
            <h3 className='text-lg font-semibold mb-4 font-mono text-gray-700'>Accent Colors</h3>
            <div className='flex flex-wrap gap-3'>
              {accentColors.map((color, index) => (
                <div key={index} className='flex flex-col items-center gap-2'>
                  <div
                    className='w-14 h-14 rounded-lg border-2 border-gray-300 shadow-sm hover:scale-105 transition-transform cursor-pointer'
                    style={{ backgroundColor: color.value }}
                    title={`${color.name}: ${color.value}`}
                  />
                  <span className='text-xs font-mono text-gray-600 text-center'>
                    {color.name.replace('terminal-accent-', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* シンタックスハイライトカラー */}
          <div>
            <h3 className='text-lg font-semibold mb-4 font-mono text-gray-700'>Syntax Colors</h3>
            <div className='flex flex-wrap gap-3'>
              {syntaxColors.map((color, index) => (
                <div key={index} className='flex flex-col items-center gap-2'>
                  <div
                    className='w-14 h-14 rounded-lg border-2 border-gray-300 shadow-sm hover:scale-105 transition-transform cursor-pointer'
                    style={{ backgroundColor: color.value }}
                    title={`${color.name}: ${color.value}`}
                  />
                  <span className='text-xs font-mono text-gray-600 text-center'>
                    {color.name.replace('terminal-syntax-', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 max-w-6xl bg-gray-50 min-h-screen ${className}`} {...props}>
      <div className='bg-white rounded-xl shadow-lg p-8'>
        <h2 className='text-3xl font-bold mb-10 font-mono text-gray-800 text-center border-b-4 border-blue-500 pb-4'>
          🎨 Terminal Color Palette
        </h2>

        <ColorPaletteSection title='🖥️ Background Colors' colors={backgroundColors} />
        <ColorPaletteSection title='📝 Text Colors' colors={textColors} />
        <ColorPaletteSection title='✨ Accent Colors' colors={accentColors} />
        <ColorPaletteSection title='🌙 Accent Colors (Dark Variants)' colors={accentDarkColors} />
        <ColorPaletteSection title='💻 Syntax Highlighting' colors={syntaxColors} />
        <ColorPaletteSection title='🔧 UI Elements' colors={uiColors} />
        <ColorPaletteSection title='💲 Prompt Colors' colors={promptColors} />
      </div>
    </div>
  );
}
