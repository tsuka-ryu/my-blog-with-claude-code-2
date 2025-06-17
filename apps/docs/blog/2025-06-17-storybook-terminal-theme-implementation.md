---
slug: storybook-terminal-theme-implementation
title: Storybookターミナル風カスタムテーマの実装
authors: [tsuka-ryu]
tags: [storybook, ui, theme, design-system, terminal]
date: 2025-06-17
---

プロジェクトのターミナル風デザインに合わせたStorybookのカスタムテーマを実装しました。

<!-- truncate -->

## 背景

これまでStorybookはデフォルトテーマで使用していましたが、プロジェクトのメインテーマであるターミナル風デザインとの統一感がありませんでした。開発体験を向上させるため、プロジェクトのデザインシステムに合わせたカスタムテーマを作成することにしました。

## 実装内容

### 1. カスタムテーマファイルの作成

`packages/ui/.storybook/theme.ts`を作成し、プロジェクトのカラーパレットを使用したダークベースのテーマを定義：

```typescript
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
  appBorderColor: '#333333', // terminal-ui-border (dark)

  // テキスト色
  textColor: '#f4f4f4', // terminal-text-primary (dark)
  textMutedColor: '#6b6b6b', // terminal-text-muted (dark)

  // フォント設定（プロジェクトに合わせる）
  fontBase: '"JetBrains Mono", "Noto Sans JP", monospace',
  fontCode: '"JetBrains Mono", monospace',
});
```

### 2. マネージャー設定

`packages/ui/.storybook/manager.ts`でStorybookのメインUIにカスタムテーマを適用：

```typescript
import { addons } from '@storybook/manager-api';
import customTheme from './theme';

addons.setConfig({
  theme: customTheme,
});
```

### 3. プレビュー設定の更新

`packages/ui/.storybook/preview.tsx`でドキュメントテーマとダークモード設定を追加：

```typescript
import { themes } from '@storybook/theming';
import customTheme from './theme';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark', // ダークモードをデフォルトに
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#0c0c0c' },
        { name: 'terminal', value: '#000000' },
      ],
    },
    docs: {
      theme: customTheme, // ドキュメントにもカスタムテーマを適用
    },
    darkMode: {
      dark: { ...customTheme, appBg: '#0c0c0c' },
      light: { ...themes.light, appBg: '#fafafa' },
      current: 'dark',
      stylePreview: true,
    },
  },
};
```

## テーマの特徴

### デザインシステムの統一

- **カラーパレット**: プロジェクトで定義されたターミナル風カラーを使用
- **フォント**: JetBrains Mono + Noto Sans JPでプロジェクト全体と統一
- **ブランディング**: "TsukaryuTech UI Components"として表示

### ダークモード対応

- デフォルトでダークモードを使用
- ライトモード/ダークモードの切り替えに対応
- プレビュー背景も3種類（light/dark/terminal）を用意

### 開発体験の向上

- プロジェクトのデザインと一貫した見た目
- コンポーネント開発時の没入感向上
- ドキュメント表示もカスタムテーマで統一

## 技術的なポイント

### 依存関係の追加

`@storybook/theming`パッケージを追加してテーマ作成機能を利用：

```bash
pnpm --filter @repo/ui add @storybook/theming
```

### インポート順序の最適化

ESLintルールに従って、Storybookの設定ファイルでも適切なインポート順序を維持：

```typescript
import { themes } from '@storybook/theming';

import customTheme from './theme';

import type { Preview } from '@storybook/react';

import '../src/styles/globals.css';
```

## 今後の課題

現在のColorPaletteコンポーネントは静的な色値を表示していますが、Storybookのテーマ切り替えに応じて動的に変更される仕様にはなっていません。今後は以下の改善を検討：

1. **動的カラーパレット**: Storybookのテーマに応じてColorPaletteが自動更新される機能
2. **TypeScript型定義**: `@storybook/theming`の型エラー解決
3. **テーマ切り替えの同期**: Storybook UI とコンポーネントプレビューのテーマ同期

## まとめ

Storybookにプロジェクト専用のターミナル風カスタムテーマを実装することで、開発環境全体の一貫性が向上しました。これにより、コンポーネント開発時にも実際のアプリケーションに近い環境で作業できるようになり、デザインシステムの統一感がより強化されました。

## 関連リンク

- [Storybook Theming Documentation](https://storybook.js.org/docs/configure/user-interface/theming)
