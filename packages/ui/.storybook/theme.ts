import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',

  // ブランド情報
  brandTitle: 'TsukaryuTech UI Components',
  brandUrl: 'https://tsukaryu.tech',
  brandTarget: '_self',

  // カラーパレット（ターミナル風デザインに合わせる）
  colorPrimary: '#57c7ff', // terminal-accent-blue
  colorSecondary: '#57c7ff',

  // UI色設定
  appBg: '#0c0c0c', // terminal-bg-primary (dark)
  appContentBg: '#1a1a1a', // terminal-bg-secondary (dark)
  appPreviewBg: '#0c0c0c',
  appBorderColor: '#333333', // terminal-ui-border (dark)
  appBorderRadius: 4,

  // テキスト色
  textColor: '#f4f4f4', // terminal-text-primary (dark)
  textInverseColor: '#1a1a1a',
  textMutedColor: '#6b6b6b', // terminal-text-muted (dark)

  // ツールバー色
  barTextColor: '#f4f4f4',
  barSelectedColor: '#57c7ff',
  barBg: '#1a1a1a',

  // 入力フォーム色
  inputBg: '#252525', // terminal-bg-elevated (dark)
  inputBorder: '#333333',
  inputTextColor: '#f4f4f4',
  inputBorderRadius: 4,

  // フォント設定（プロジェクトに合わせる）
  fontBase: '"JetBrains Mono", "Noto Sans JP", monospace',
  fontCode: '"JetBrains Mono", monospace',
});
