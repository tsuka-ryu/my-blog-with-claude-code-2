---
slug: font-setup-jetbrains-mono-noto-sans-jp
title: ターミナル風デザインのための等幅フォント設定 - JetBrains Mono + Noto Sans JP
authors: tsuka-ryu
tags: [fonts, design-system, jetbrains-mono, noto-sans-jp, next.js, storybook, docusaurus]
---

ターミナル風デザインの技術ブログプロジェクトで、英数字にJetBrains Mono、日本語にNoto Sans JPを組み合わせたフォント設定を実装しました。3つのプラットフォーム（Next.js、Storybook、Docusaurus）で統一したフォント体験を実現する方法を紹介します。

<!-- truncate -->

## フォント選定の理由

### JetBrains Mono（英数字用）

- プログラミング向けに設計された読みやすい等幅フォント
- ターミナル環境での使用を想定した視認性の高いデザイン
- Google Fontsで提供されており、Webでの使用が容易

### Noto Sans JP（日本語用）

- Googleが開発した高品質な日本語フォント
- 等幅フォントとの組み合わせでも違和感の少ないデザイン
- Google Fontsで提供されており、ロード時間も最適化されている

## 実装方法

### 1. Next.js アプリケーション

`app/layout.tsx`でGoogle Fontsを読み込み、CSS変数として設定：

```tsx
import { JetBrains_Mono, Noto_Sans_JP } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${jetbrainsMono.variable} ${notoSansJP.variable} font-mono`}>
        {children}
      </body>
    </html>
  );
}
```

### 2. Tailwind CSS 設定

`packages/ui-config/src/tailwind.config.ts`でフォントファミリーを定義：

```typescript
export const baseConfig: Partial<Config> = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'var(--font-noto-sans-jp)', 'monospace'],
        sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
      },
      // その他の設定...
    },
  },
};
```

### 3. Storybook 設定

`.storybook/preview.tsx`でdecoratorを使用してフォントを適用：

```tsx
const preview: Preview = {
  decorators: [
    Story => (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <div style={{ fontFamily: "'JetBrains Mono', 'Noto Sans JP', monospace" }}>
          <Story />
        </div>
      </>
    ),
  ],
  // その他の設定...
};
```

### 4. Docusaurus 設定

`src/css/custom.css`でInfima変数を使用：

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap');

:root {
  /* Font settings */
  --ifm-font-family-base: 'JetBrains Mono', 'Noto Sans JP', monospace;
  --ifm-font-family-monospace: 'JetBrains Mono', 'Noto Sans JP', monospace;

  /* その他の設定... */
}
```

## ポイントと注意事項

### 1. フォント読み込み順序

各フォントの指定で、JetBrains Monoを最初に、次にNoto Sans JP、最後にフォールバック（monospace/sans-serif）を指定することで、英数字は等幅フォント、日本語は適切なフォントで表示されます。

### 2. パフォーマンス最適化

- `display: 'swap'`でフォントロード中のテキスト表示を改善
- `preload: false`で日本語フォントの初期ロードを制御
- Google Fontsの`&display=swap`パラメータを使用

### 3. プラットフォーム間の統一

3つの異なるプラットフォームで同じフォント体験を実現するため、それぞれのフレームワークの仕組みに合わせた実装を行いました：

- **Next.js**: `next/font/google`とCSS変数
- **Storybook**: 直接的なGoogle Fontsの読み込み
- **Docusaurus**: Infima変数システムの活用

## 結果

これらの設定により、ターミナル風デザインに適した統一されたタイポグラフィを3つのプラットフォーム全体で実現できました。英数字はプログラミング向けの読みやすいJetBrains Mono、日本語は美しく読みやすいNoto Sans JPで表示され、ターミナル環境のような一体感のあるデザインが完成しました。

モノレポ環境でのデザインシステム構築において、複数のプラットフォーム間でのフォント統一は重要な要素です。今回の実装パターンは、他のプロジェクトでも応用できる汎用的なアプローチとなっています。
