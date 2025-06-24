---
title: 'Next.js App Routerの基本'
description: 'Next.js 15のApp Routerの使い方を解説'
date: '2025-06-23'
tags: ['nextjs', 'react', 'frontend']
---

# Next.js App Routerの基本

Next.js 15のApp Routerについて基本的な使い方を解説します。

## App Routerとは

App Routerは従来のPages Routerに代わる新しいルーティングシステムです。

### 特徴

- ファイルベースルーティング
- Server Componentsがデフォルト
- より柔軟なレイアウト
- ネストされたルーティング

## 基本的なファイル構造

```
app/
├── layout.tsx      # ルートレイアウト
├── page.tsx        # ホームページ
├── about/
│   └── page.tsx    # /about
└── posts/
    ├── page.tsx    # /posts
    └── [slug]/
        └── page.tsx # /posts/[slug]
```

## Server ComponentsとClient Components

App Routerでは、デフォルトでServer Componentsが使用されます。

```tsx
// Server Component (デフォルト)
export default function Page() {
  return <h1>Hello World</h1>;
}

// Client Component
('use client');
export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## まとめ

App RouterはNext.jsの新しいスタンダードとなりつつあります。Server Componentsとの組み合わせで、よりパフォーマンスの良いアプリケーションを構築できます。
