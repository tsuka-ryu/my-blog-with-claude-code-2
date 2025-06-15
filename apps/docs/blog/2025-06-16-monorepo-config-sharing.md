---
slug: monorepo-config-sharing
title: モノレポでのTailwind CSS設定共通化とColorPaletteコンポーネント開発
authors: tsuka-ryu
tags: [monorepo, tailwindcss, config, ui-components, design-system]
---

技術ブログのモノレポ構築において、Tailwind CSS設定の共通化とUIコンポーネントシステムを実装しました。今回は設定共通化のアプローチとColorPaletteコンポーネントの開発について紹介します。

<!-- truncate -->

## プロジェクト構成

```
my-blog-with-claude-code/
├── apps/
│   ├── docs/          # Docusaurus
│   └── web/           # Next.js
├── packages/
│   ├── ui-config/     # 共通設定
│   └── ui/            # UIコンポーネント
└── turbo.json         # TurboRepo設定
```

## 課題：設定の重複と一貫性の欠如

当初、各アプリケーションでTailwind CSSを個別に設定していましたが、以下の問題が発生していました：

- **設定の重複**: 同じ色やテーマを複数箇所で定義
- **一貫性の欠如**: アプリ間でデザインが微妙に異なる
- **保守性の低下**: 色を変更する際に複数ファイルを修正が必要

## 解決策：`@repo/ui-config`パッケージでの共通化

### 1. 設定パッケージの作成

```typescript
// packages/ui-config/src/tailwind.config.ts
import type { Config } from 'tailwindcss';

export const baseConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        // ターミナル風カラーパレット
        terminal: {
          bg: {
            primary: 'var(--terminal-bg-primary)',
            secondary: 'var(--terminal-bg-secondary)',
            elevated: 'var(--terminal-bg-elevated)',
            hover: 'var(--terminal-bg-hover)',
          },
          text: {
            primary: 'var(--terminal-text-primary)',
            secondary: 'var(--terminal-text-secondary)',
            muted: 'var(--terminal-text-muted)',
            bright: 'var(--terminal-text-bright)',
          },
          accent: {
            red: 'var(--terminal-accent-red)',
            green: 'var(--terminal-accent-green)',
            yellow: 'var(--terminal-accent-yellow)',
            blue: 'var(--terminal-accent-blue)',
            // ... 他の色
          },
        },
      },
    },
  },
  plugins: [],
};

export function createTailwindConfig(contentPaths: string[]): Config {
  return {
    content: contentPaths,
    ...baseConfig,
  } as Config;
}
```

### 2. CSS変数での実際の色定義

```css
/* packages/ui-config/src/colors.css */
:root {
  /* ターミナル風カラーパレット */
  --terminal-bg-primary: #0c0c0c;
  --terminal-bg-secondary: #1a1a1a;
  --terminal-bg-elevated: #252525;
  --terminal-bg-hover: #2a2a2a;

  --terminal-text-primary: #f4f4f4;
  --terminal-text-secondary: #a8a8a8;
  --terminal-text-muted: #6b6b6b;
  --terminal-text-bright: #ffffff;

  --terminal-accent-red: #ff5f56;
  --terminal-accent-green: #5af78e;
  --terminal-accent-yellow: #f3f99d;
  --terminal-accent-blue: #57c7ff;
  /* ... */
}
```

## 各アプリケーションでの使用

### Next.js アプリ

```typescript
// apps/web/tailwind.config.ts
import { createTailwindConfig } from '@repo/ui-config/tailwind';

const config = createTailwindConfig([
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
]);

export default config;
```

### UIコンポーネントパッケージ

```typescript
// packages/ui/tailwind.config.ts
import { createTailwindConfig } from '@repo/ui-config/tailwind';

export default createTailwindConfig(['./src/**/*.{js,ts,jsx,tsx}']);
```

## ColorPaletteコンポーネントの実装

共通化された設定を活用して、カラーパレット表示コンポーネントを開発しました。

### 主な機能

- **色の視覚的表示**: 16進数値を背景色として表示
- **コピー機能**: クリックで色コードをクリップボードにコピー
- **フィードバック**: コピー成功時の視覚的フィードバック
- **レスポンシブ**: グリッドレイアウトで自動調整

```typescript
function ColorSwatch({ name, value }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className='group relative flex flex-col items-center p-4 m-2 rounded-lg transition-colors'>
      <div
        className='w-16 h-16 rounded-lg border-2 border-gray-200 shadow-sm transition-all'
        style={{ backgroundColor: value, minHeight: '4rem', minWidth: '4rem' }}
      />
      <div className='mt-2 text-center'>
        <div className='font-mono text-xs font-medium text-gray-800 truncate max-w-[80px]'>
          {name.replace('terminal-', '').replace('-', ' ')}
        </div>
        <div className='font-mono text-xs text-gray-500 mt-1'>{value}</div>
      </div>
      <button
        onClick={handleClick}
        className={`mt-1 px-2 py-1 text-xs text-white rounded transition-all duration-200 ${
          copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        title={copied ? 'コピーしました！' : `${value}をクリップボードにコピー`}
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
    </div>
  );
}
```

## Storybookでの表示とTailwind CSS統合

開発中にStorybookでTailwind CSSが読み込まれない問題が発生しました。

### 問題

```
Failed to fetch dynamically imported module: .storybook/preview.tsx
```

### 解決策

```typescript
// packages/ui/.storybook/preview.tsx
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';  // Tailwind CSSを読み込み

// packages/ui/src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import '@repo/ui-config/src/colors.css';  // 色変数を読み込み
```

## 開発フローでの課題と解決

### ESLintとの統合

```typescript
// インポート順序のlintエラー修正
import { useState } from 'react';

import type { ComponentProps } from 'react';
```

### CI/CDでの依存関係エラー

```bash
# pnpm-lock.yamlの不整合を修正
pnpm install
git add pnpm-lock.yaml
git commit -m "fix: pnpm-lock.yamlを更新してCI依存関係エラーを修正"
```

## メリットと効果

### 設定共通化のメリット

- **一元管理**: 色やテーマを1箇所で管理
- **一貫性**: 全アプリで統一されたデザイン
- **保守性**: 変更時の影響範囲を最小化
- **再利用性**: 新しいアプリでも簡単に設定を継承

### 開発効率の向上

- **Storybook統合**: コンポーネントの独立開発
- **TypeScript**: 型安全な設定共有
- **Hot Reload**: 設定変更の即座反映

## まとめ

モノレポでの設定共通化により、以下を実現できました：

1. **統一されたデザインシステム**
2. **効率的なコンポーネント開発**
3. **保守しやすい設定管理**
4. **型安全な開発環境**

特に`createTailwindConfig`関数を使ったアプローチにより、各パッケージで必要なcontentパスのみを指定して、共通設定を継承できる柔軟な仕組みを構築できました。

今回開発したColorPaletteコンポーネントは、デザインシステムの可視化とチーム内での色使い統一に大きく貢献しています。
