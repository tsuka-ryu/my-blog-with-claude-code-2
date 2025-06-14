---
slug: packages-utils-setup
title: packages/utils パッケージセットアップ
authors: [tsuka-ryu]
tags: [packages, utils, monorepo, typescript, setup]
---

# packages/utils パッケージセットアップ

`packages/utils` パッケージの初期セットアップと設定の詳細を記録します。TypeScript設定の修正やESModule対応など、実際の開発で遭遇した問題と解決策をまとめています。

<!--truncate-->

## パッケージ構成

```
packages/utils/
├── src/
│   ├── index.ts          # エントリーポイント
│   └── types.ts          # 基本型定義
├── package.json          # パッケージ設定
├── tsconfig.json         # TypeScript設定
├── tsup.config.ts        # ビルド設定
└── README.md             # パッケージ概要
```

## 設定内容

### package.json の主要設定

- **name**: `@my-blog/utils`
- **type**: `"module"` (ESModule)
- **exports**: 型定義とビルド済みファイルをエクスポート
- **scripts**: turbo.json と統一されたコマンド体系

### 重要な修正事項

#### 1. TypeScript設定の修正

**問題**: 初期設定で存在しないルートtsconfig.jsonを参照していた

**修正内容**:
```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "composite": true,
    "incremental": true  // composite: true には必須
  }
}
```

#### 2. ESModule import の修正

**問題**: NodeNext module resolution で相対importに拡張子が必要

**修正内容**:
```typescript
// 修正前
export type * from './types';

// 修正後  
export type * from './types.js';
```

#### 3. スクリプトコマンドの統一

turbo.json のタスク名と統一:
- `typecheck` → `check-types`
- `format` スクリプトを追加
- prettier を devDependencies に追加

## 型定義

基本的なブログ記事関連の型を定義:

- `BlogPost`: 記事の完全な情報
- `FrontMatter`: Markdownファイルのメタデータ
- `BlogPostSummary`: 一覧表示用の簡略化された型
- `SearchResult`: 検索結果の型

## 今後の拡張予定

- 文字列処理ユーティリティ
- 日付処理ユーティリティ  
- URL処理ユーティリティ
- Markdown処理ユーティリティ

## 関連タスク

- TODO.md の 1.2.3 タスク完了
- PR #11 で実装内容を提供

## 学んだ教訓

1. **TypeScript設定**: composite プロジェクトでは incremental: true が必須
2. **ESModule**: NodeNext では相対importに .js 拡張子が必要
3. **モノレポ統一**: turbo.json のタスク名とpackage.jsonのスクリプト名を統一する重要性