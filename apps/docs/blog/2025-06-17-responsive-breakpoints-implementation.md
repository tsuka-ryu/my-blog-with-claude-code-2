---
slug: responsive-breakpoints-implementation
title: レスポンシブブレークポイント設定の実装
authors: [tsuka-ryu]
tags: [tailwind, css, レスポンシブデザイン, ui, モノレポ]
---

# レスポンシブブレークポイント設定の実装

本日、プロジェクトのレスポンシブデザイン基盤となるブレークポイント設定を実装しました。ターミナル風デザインテーマに適した独自のブレークポイントシステムを構築し、開発効率とデザインの一貫性を向上させました。

<!-- truncate -->

## 実装内容

### 1. 標準ブレークポイントの拡張

Tailwind CSSのデフォルトブレークポイントに加えて、超小型デバイス向けの`xs`ブレークポイントを追加：

```typescript
screens: {
  'xs': '475px',     // 超小型デバイス（追加）
  'sm': '640px',     // 小型デバイス
  'md': '768px',     // タブレット
  'lg': '1024px',    // デスクトップ
  'xl': '1280px',    // 大型デスクトップ
  '2xl': '1536px',   // 超大型デスクトップ
}
```

### 2. ターミナル専用ブレークポイント

ターミナル風デザインに特化した文字幅（`ch`単位）ベースのブレークポイントを新規実装：

```typescript
// ターミナル固有のブレークポイント
'terminal-sm': '80ch',   // 標準ターミナル幅（80文字）
'terminal-md': '100ch',  // 中型ターミナル幅（100文字）
'terminal-lg': '120ch',  // 大型ターミナル幅（120文字）
'terminal-xl': '160ch',  // 超大型ターミナル幅（160文字）
```

これにより、コードブロックやターミナル風UIコンポーネントが、文字幅を基準にレスポンシブに対応できるようになりました。

### 3. レスポンシブコンテナ設定

コンテナ要素の自動中央寄せと、画面サイズに応じた段階的なパディング設定を実装：

```typescript
container: {
  center: true,
  padding: {
    DEFAULT: '1rem',
    xs: '1rem',
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
    xl: '5rem',
    '2xl': '6rem',
  },
}
```

### 4. カスタムスペーシングユーティリティ

等幅フォントでの利用を想定した、文字幅ベースのスペーシングクラスを追加：

```typescript
spacing: {
  'ch': '1ch',    // 1文字分
  '2ch': '2ch',   // 2文字分
  '4ch': '4ch',   // 4文字分
  '8ch': '8ch',   // 8文字分
  '80ch': '80ch', // 標準ターミナル幅
}
```

## 使用例

### モバイルファーストのレスポンシブデザイン

```tsx
<div className="text-sm md:text-base lg:text-lg">
  画面サイズに応じてフォントサイズが変化
</div>

<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* レスポンシブグリッドレイアウト */}
</div>
```

### ターミナル幅に基づくレイアウト

```tsx
<div className="w-full terminal-sm:w-80ch terminal-md:w-100ch mx-auto">
  {/* ターミナル幅に応じてコンテナ幅が変化 */}
</div>

<pre className="max-w-full terminal-sm:max-w-80ch">
  {/* コードブロックの最大幅制御 */}
</pre>
```

## 技術的な詳細

### モノレポでの共有設定

`packages/ui-config`パッケージで定義した設定を、各アプリケーション・パッケージで共有：

```typescript
// packages/ui-config/src/tailwind.config.ts
export const baseConfig: Partial<Config> = {
  // ブレークポイント設定
};

export function createTailwindConfig(contentPaths: string[]): Config {
  return {
    content: contentPaths,
    ...baseConfig,
  } as Config;
}
```

### Storybookでのデモ実装

レスポンシブブレークポイントの動作を視覚的に確認できるStorybookストーリーも作成しました。画面サイズを変更しながら、各ブレークポイントでのレイアウト変化を確認できます。

## 設計思想

1. **モバイルファースト**: 小さい画面から大きい画面へ段階的にスタイルを追加
2. **文字幅ベース**: ターミナル風デザインに適した`ch`単位の活用
3. **段階的パディング**: 画面サイズに応じた適切な余白設定
4. **開発効率**: 直感的なクラス名と一貫性のある設計

## 今後の展望

- レスポンシブタイポグラフィシステムの構築
- ブレークポイント間のアニメーション最適化
- パフォーマンス測定とさらなる最適化

これらの設定により、様々なデバイスで快適に閲覧できるターミナル風ブログの基盤が整いました。
