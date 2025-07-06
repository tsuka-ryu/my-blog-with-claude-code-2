---
title: 'Next.js App Routerへの移行体験記'
description: 'Pages RouterからApp Routerへの移行で学んだことをまとめました。'
date: '2024-02-01'
tags: ['Next.js', 'React', 'Frontend']
category: 'Technology'
author: 'tsuka-ryu'
published: true
featured: false
slug: 'nextjs-app-router-migration'
---

# Next.js App Routerへの移行体験記

Next.js 13で導入されたApp Routerへの移行を実際に行った体験を共有します。Pages RouterからApp Routerへの移行で遭遇した課題と解決策をまとめました。

## 移行の背景

既存のNext.jsプロジェクト（Pages Router）をApp Routerに移行した理由：

- **React Server Components**の活用
- **改善されたパフォーマンス**
- **新しいファイルベースルーティング**の利点
- **並行レンダリング**のサポート

## 移行前の準備

### 1. Next.jsのアップデート

```bash
npm install next@latest react@latest react-dom@latest
```

### 2. TypeScript設定の確認

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## ディレクトリ構造の変更

### Pages Router（変更前）

```
pages/
├── _app.tsx
├── _document.tsx
├── index.tsx
├── about.tsx
├── blog/
│   ├── index.tsx
│   └── [slug].tsx
└── api/
    └── users.ts
```

### App Router（変更後）

```
app/
├── layout.tsx
├── page.tsx
├── about/
│   └── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── api/
    └── users/
        └── route.ts
```

## 主要な変更点

### 1. レイアウトシステム

**Pages Router（\_app.tsx）**

```typescript
// pages/_app.tsx
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header>My App</header>
      <Component {...pageProps} />
    </div>
  );
}
```

**App Router（layout.tsx）**

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>My App</header>
        {children}
      </body>
    </html>
  );
}
```

### 2. ページコンポーネント

**Pages Router**

```typescript
// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';

interface Props {
  post: Post;
}

export default function BlogPost({ post }: Props) {
  return <div>{post.title}</div>;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params?.slug as string);
  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};
```

**App Router**

```typescript
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);
  return <div>{post.title}</div>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}
```

## 遭遇した課題と解決策

### 1. データフェッチングの変更

**課題**: `getServerSideProps`や`getStaticProps`の代替方法

**解決策**: Server Componentsでの直接データフェッチ

```typescript
// Pages Router
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchData();
  return { props: { data } };
};

// App Router
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
```

### 2. クライアントサイドの状態管理

**課題**: useEffectでのデータフェッチングが必要な場合

**解決策**: 'use client'ディレクティブの使用

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchClientData().then(setData);
  }, []);

  return <div>{data ? 'Loaded' : 'Loading...'}</div>;
}
```

### 3. API Routesの変更

**Pages Router**

```typescript
// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  }
}
```

**App Router**

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

### 4. ミドルウェアの調整

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // App Routerでは一部のパスが変更される可能性
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

## パフォーマンスの改善

### 1. Server Componentsの活用

```typescript
// Server Component（デフォルト）
async function UserList() {
  const users = await getUsers(); // サーバーサイドで実行

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Client Componentは必要な場合のみ
'use client';

function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### 2. ストリーミングSSR

```typescript
// app/blog/page.tsx
import { Suspense } from 'react';

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}

async function PostList() {
  // 時間のかかるデータフェッチ
  const posts = await getPostsSlowly();

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

## SEOとメタデータ

### 1. メタデータAPI

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}
```

### 2. 動的なsitemap.xml

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postUrls = posts.map(post => ({
    url: `https://example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postUrls,
  ];
}
```

## テストの調整

### 1. Jest設定の更新

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

## 移行のベストプラクティス

### 1. 段階的移行

1. **新機能はApp Routerで実装**
2. **既存ページは動作確認後に移行**
3. **重要なページから順次移行**

### 2. 互換性の確保

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // App Routerを有効化
  },
};

module.exports = nextConfig;
```

## まとめ

App Routerへの移行で得られたメリット：

- **パフォーマンス向上**: Server Componentsによる最適化
- **開発体験の改善**: より直感的なファイル構造
- **SEO最適化**: 改善されたメタデータ管理
- **ストリーミング**: より良いユーザー体験

### 移行時の注意点

1. **Server ComponentとClient Componentの使い分け**を理解する
2. **既存のstate managementライブラリ**との互換性を確認
3. **テストコード**の更新を忘れずに
4. **段階的移行**でリスクを最小化

App Routerは学習コストがありますが、その価値は十分にあります。特にパフォーマンスとSEOの改善は大きなメリットです。
