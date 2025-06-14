# @my-blog/utils

技術ブログプロジェクト用の共有ユーティリティパッケージ

## 概要

このパッケージは、モノレポ内の各アプリケーションで共通して使用するユーティリティ関数と型定義を提供します。

## 提供機能

### 型定義

- `BlogPost`: ブログ記事の基本情報
- `FrontMatter`: Markdownファイルのフロントマター
- `BlogPostSummary`: 記事一覧表示用の簡略化された型
- `SearchResult`: 検索結果の型定義

## 使用方法

```typescript
import type { BlogPost, BlogPostSummary } from '@my-blog/utils';

// 型定義の使用例
const post: BlogPost = {
  slug: 'example-post',
  title: 'サンプル記事',
  publishedAt: new Date(),
  tags: ['typescript', 'next.js'],
  published: true,
  content: '記事本文...',
};
```

## 開発

```bash
# 開発モード（ウォッチモード）
pnpm dev

# ビルド
pnpm build

# 型チェック
pnpm typecheck

# リント
pnpm lint
```

## 今後の拡張予定

- 文字列処理ユーティリティ
- 日付処理ユーティリティ
- URL処理ユーティリティ
- Markdown処理ユーティリティ
