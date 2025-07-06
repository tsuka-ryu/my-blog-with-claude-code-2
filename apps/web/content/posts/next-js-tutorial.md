---
title: 'Next.js アプリケーション開発入門'
description: 'Next.js 15を使った最新のWebアプリケーション開発の基礎を学びます。App Routerやサーバーコンポーネントについても詳しく解説します。'
date: '2025-01-15'
tags: ['Next.js', 'React', 'TypeScript', 'Web開発']
category: 'フロントエンド'
author: 'tsuka-ryu'
published: true
featured: true
image: '/images/nextjs-tutorial.jpg'
slug: 'next-js-tutorial'
---

# Next.js アプリケーション開発入門

Next.js 15の最新機能を活用したWebアプリケーション開発について解説します。

## 目次

1. [Next.js とは](#nextjs-とは)
2. [App Router の基本](#app-router-の基本)
3. [サーバーコンポーネント](#サーバーコンポーネント)
4. [実践的な開発テクニック](#実践的な開発テクニック)

## Next.js とは

Next.jsは、Reactベースのフルスタックフレームワークです。以下の特徴があります：

- **Zero Configuration**: 設定不要ですぐに開発開始
- **Server-Side Rendering**: SEOに優れたサーバーサイドレンダリング
- **Static Site Generation**: 高速な静的サイト生成
- **API Routes**: バックエンドAPIも一緒に構築可能

## App Router の基本

Next.js 13から導入されたApp Routerは、新しいルーティングシステムです。

### ディレクトリ構造

```
app/
├── layout.tsx      # ルートレイアウト
├── page.tsx        # ホームページ
├── about/
│   └── page.tsx    # /about ページ
└── blog/
    ├── page.tsx    # /blog ページ
    └── [slug]/
        └── page.tsx # /blog/[slug] 動的ページ
```

### 基本的なページコンポーネント

```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>App Routerを使った最新のNext.jsアプリケーションです。</p>
    </div>
  );
}
```

## サーバーコンポーネント

React Server Componentsにより、サーバーサイドでの処理が可能になりました。

### データフェッチング

```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>記事一覧</h1>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### クライアントコンポーネント

インタラクティブな機能が必要な場合は `'use client'` ディレクティブを使用：

```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        クリック
      </button>
    </div>
  );
}
```

## 実践的な開発テクニック

### 1. TypeScriptの活用

```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
```

### 2. エラーハンドリング

```typescript
// app/error.tsx
'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <p>{error.message}</p>
      <button onClick={reset}>再試行</button>
    </div>
  );
}
```

### 3. ローディング状態

```typescript
// app/loading.tsx
export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}
```

## まとめ

Next.js 15のApp Routerを使うことで、以下のメリットが得られます：

- **パフォーマンス向上**: サーバーコンポーネントによる最適化
- **開発体験の改善**: TypeScriptとの親和性
- **SEO対応**: サーバーサイドレンダリングによる検索エンジン最適化
- **スケーラビリティ**: 大規模アプリケーションにも対応

Next.jsは継続的に進化しているフレームワークです。最新の機能を活用して、効率的なWeb開発を実現しましょう。

---

_この記事は Next.js 15.1 をベースに執筆されています。最新の情報については [公式ドキュメント](https://nextjs.org/docs) をご確認ください。_
