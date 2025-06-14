# プロジェクト設定概要

## プロジェクト構成

このプロジェクトは **TurboRepo** と **pnpm** を使用したモノレポ構成で構築されており、技術ブログのための統合的なプラットフォームを提供します。

### 主要技術スタック

- **モノレポ管理**: TurboRepo 2.5.4
- **パッケージマネージャー**: pnpm 10.12.1
- **言語**: TypeScript (strict mode)
- **フレームワーク**: Next.js 15+ (App Router)
- **ドキュメント**: Docusaurus

## TurboRepo 設定

### パイプライン設定 (turbo.json)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 設定の意図

- **build**: 依存パッケージのビルド完了後に実行、Next.jsの出力ファイルを指定
- **lint**: 依存パッケージのlint完了後に実行
- **dev**: 開発サーバーはキャッシュを無効化し、永続実行モード

### 重要な制約

**永続タスクの依存関係問題**  
`persistent: true` のタスク同士は `dependsOn` で依存させると、デッドロックが発生します。

```json
// ❌ 問題のある設定
{
  "dev": {
    "dependsOn": ["storybook"],
    "persistent": true
  },
  "storybook": {
    "persistent": true
  }
}
```

**解決策**: `--parallel` オプションで並行実行

```bash
turbo run dev storybook --parallel
```

## pnpm ワークスペース設定

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'tools/*'
```

### 利点

- **効率的な依存関係管理**: シンボリックリンクによる共有
- **高速インストール**: npm/yarnより高速
- **ディスク容量の節約**: 重複パッケージの削減

## TypeScript設定

### 厳密モード (strict mode)

```json
{
  "strict": true,
  "noEmit": true,
  "isolatedModules": true
}
```

### モノレポ対応のパス解決

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./apps/blog/*"],
    "@ui/*": ["./packages/ui/*"],
    "@utils/*": ["./packages/utils/*"],
    "@config/*": ["./packages/config/*"]
  }
}
```

### プロジェクト参照

```json
{
  "references": [
    { "path": "./apps/blog" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" },
    { "path": "./packages/config" }
  ]
}
```

## パッケージ設計原則

### 共有パッケージ例 (packages/utils)

```typescript
// ESModule対応の型定義
export type BlogPost = {
  id: string;
  title: string;
  content: string;
  frontMatter: FrontMatter;
  publishedAt: Date;
  updatedAt: Date;
};

// 相対importにはJSファイル拡張子が必要
export type * from './types.js';
```

### 重要な注意点

1. **TypeScript設定**: `composite: true` には `incremental: true` が必須
2. **ESModule**: NodeNext module resolutionでは相対importに `.js` 拡張子が必要
3. **スクリプト統一**: turbo.jsonのタスク名とpackage.jsonのスクリプト名を統一

## 開発環境統合

### 利用可能なコマンド

```bash
# 依存関係のインストール
pnpm install

# 全パッケージビルド
pnpm turbo build

# 全パッケージリント
pnpm turbo lint

# 開発サーバー起動（並行実行）
pnpm turbo dev --parallel
```

### ポート設定

- **Next.js**: 3000
- **Docusaurus**: 4000
- **Storybook**: 6006（予定）

## 品質保証

### Git設定

- **改行コード**: LF統一 (.gitattributes)
- **除外ファイル**: node_modules, .next, .turbo, .env\* (.gitignore)

### 型安全性

- **strict mode**: 全ての厳密型チェック有効
- **null安全性**: undefined/null型の明示的な処理
- **未使用変数検出**: デッドコードの早期発見

## 今後の拡張計画

- **テスト**: Vitest + Testing Library
- **E2E**: Playwright
- **Visual Regression**: 設定予定
- **CI/CD**: GitHub Actions統合

この設定により、スケーラブルで保守性の高いモノレポ環境を実現しています。
