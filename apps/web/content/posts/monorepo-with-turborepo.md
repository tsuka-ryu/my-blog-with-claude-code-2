---
title: 'TurboRepoでモノレポ構築'
description: 'TurboRepoを使用したモノレポの構築とその利点について。'
date: '2024-02-10'
tags: ['TurboRepo', 'Monorepo', 'DevOps']
category: 'Technology'
author: 'tsuka-ryu'
published: true
featured: false
slug: 'monorepo-with-turborepo'
---

# TurboRepoでモノレポ構築

TurboRepoを使ってモノレポを構築した経験をまとめました。セットアップから運用まで、実際に遭遇した課題と解決策を紹介します。

## モノレポとは

モノレポ（Monorepo）は、複数のプロジェクトを単一のリポジトリで管理する手法です。

### メリット

- **コードの共有が容易**
- **依存関係の管理が統一される**
- **開発ツールの共通化**
- **リファクタリングが容易**

### デメリット

- **リポジトリサイズの増大**
- **ビルド時間の増加**
- **権限管理の複雑化**

## TurboRepoの特徴

TurboRepoは、Vercel（旧Zeit）が開発したモノレポ用のビルドツールです。

### 主な特徴

1. **高速なビルド**: インクリメンタルビルドとキャッシュ
2. **並列実行**: タスクの並列実行による高速化
3. **依存グラフ**: パッケージ間の依存関係を自動解析
4. **リモートキャッシュ**: チーム間でのビルドキャッシュ共有

## セットアップ

### 1. プロジェクト初期化

```bash
npx create-turbo@latest my-monorepo
cd my-monorepo
```

### 2. ディレクトリ構造

```
my-monorepo/
├── apps/
│   ├── web/          # Next.js アプリ
│   ├── docs/         # Docusaurus ドキュメント
│   └── mobile/       # React Native アプリ
├── packages/
│   ├── ui/           # 共通UIコンポーネント
│   ├── config/       # 共通設定
│   └── utils/        # ユーティリティ関数
├── turbo.json        # TurboRepo設定
├── package.json      # ルートpackage.json
└── pnpm-workspace.yaml # pnpmワークスペース設定
```

### 3. 基本設定

**turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  },
  "globalDependencies": ["**/.env.*local"]
}
```

## パッケージ設計

### 1. UI コンポーネントパッケージ

**packages/ui/package.json**

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup src/index.ts --format esm,cjs --dts --watch",
    "lint": "eslint .",
    "test": "jest"
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
    "@types/react": "^18.0.0",
    "tsup": "^6.0.0",
    "typescript": "^4.9.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```

**packages/ui/src/index.ts**

```typescript
export { Button } from './button';
export { Card } from './card';
export { Input } from './input';
export type { ButtonProps, CardProps, InputProps } from './types';
```

### 2. 共通設定パッケージ

**packages/config/package.json**

```json
{
  "name": "@repo/config",
  "version": "0.0.0",
  "private": true,
  "main": "./eslint.js",
  "files": ["eslint.js", "prettier.js", "tailwind.js"]
}
```

**packages/config/eslint.js**

```javascript
module.exports = {
  extends: ['next/core-web-vitals', '@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
```

## アプリケーションの設定

### 1. Next.js アプリ

**apps/web/package.json**

```json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@repo/ui": "*",
    "@repo/utils": "*",
    "next": "14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@repo/config": "*",
    "@repo/typescript-config": "*",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

**apps/web/next.config.js**

```javascript
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
  experimental: {
    esmExternals: true,
  },
};
```

## ビルドとキャッシュ戦略

### 1. ビルド最適化

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "env": ["NODE_ENV", "NEXT_PUBLIC_*"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**", "test/**", "jest.config.js"]
    }
  }
}
```

### 2. リモートキャッシュ設定

**Vercelでのリモートキャッシュ**

```bash
npx turbo login
npx turbo link
```

**.env.local**

```bash
TURBO_TOKEN=your-token
TURBO_TEAM=your-team
```

### 3. CI/CD最適化

**.github/workflows/ci.yml**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm turbo build
        env:
          TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: ${{ secrets.TURBO_TEAM }}

      - name: Test
        run: pnpm turbo test

      - name: Lint
        run: pnpm turbo lint
```

## 開発ワークフロー

### 1. 新しいパッケージの追加

```bash
mkdir packages/new-package
cd packages/new-package
pnpm init
```

### 2. 依存関係の管理

```bash
# 特定のワークスペースに依存関係を追加
pnpm add react --filter @repo/ui

# すべてのワークスペースに dev dependency を追加
pnpm add -D typescript --filter "*"

# ルートに依存関係を追加
pnpm add -w eslint
```

### 3. スクリプトの実行

```bash
# すべてのパッケージをビルド
pnpm turbo build

# 特定のパッケージのみビルド
pnpm turbo build --filter @repo/ui

# 依存関係も含めてビルド
pnpm turbo build --filter @repo/ui...

# 並列実行
pnpm turbo build test lint
```

## トラブルシューティング

### 1. 循環依存の解決

```bash
# 依存グラフの可視化
pnpm turbo build --graph

# 問題のあるパッケージの特定
pnpm turbo build --filter @repo/problematic-package --dry-run
```

### 2. キャッシュの問題

```bash
# キャッシュのクリア
pnpm turbo build --force

# 特定のタスクのキャッシュをクリア
rm -rf node_modules/.cache/turbo
```

### 3. TypeScript設定の共通化

**packages/typescript-config/base.json**

```json
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
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## パフォーマンス最適化

### 1. タスクの並列化

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": [],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "dependsOn": [],
      "outputs": []
    }
  }
}
```

### 2. 選択的実行

```bash
# 変更されたパッケージのみ実行
pnpm turbo build --filter '...[HEAD^]'

# 特定のパッケージと依存関係のみ
pnpm turbo build --filter '@repo/ui...'
```

## 運用のベストプラクティス

### 1. バージョン管理

**Changesets** を使用したバージョン管理

```bash
pnpm add -D @changesets/cli
pnpm changeset init
```

### 2. コード品質の維持

```json
{
  "scripts": {
    "format": "prettier --write .",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "test": "turbo test"
  }
}
```

### 3. 文書化

```markdown
# パッケージ追加時のチェックリスト

- [ ] package.json の設定
- [ ] TypeScript設定の継承
- [ ] ESLint設定の適用
- [ ] テストの設定
- [ ] turbo.json への追加
- [ ] READMEの作成
```

## まとめ

TurboRepoを使ったモノレポ構築のメリット：

1. **高速なビルド**: キャッシュとインクリメンタルビルド
2. **効率的な開発**: コードの共有と統一された開発環境
3. **スケーラビリティ**: 大規模プロジェクトでも管理可能
4. **開発体験の向上**: 統一されたツールチェーン

### 注意点

- **学習コスト**: 初期設定と運用ルールの習得
- **複雑性**: 大規模になると管理が複雑
- **ツールチェーン**: 統一されたツールの選択が重要

TurboRepoは特に大規模なプロジェクトや複数のアプリケーションを持つ場合に威力を発揮します。適切な設計と運用により、開発効率を大幅に向上させることができます。
