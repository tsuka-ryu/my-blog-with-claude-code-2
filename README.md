# Claude Codeで技術ブログをVibe codingしてみる

TurboRepoとpnpmを使用したモノレポ構成の技術ブログプラットフォームです。
日本語圏の開発者をターゲットとし、ターミナル/コンソール風のデザインテーマを特徴としています。

## プロジェクト構成

このモノレポには以下のアプリケーションとパッケージが含まれています：

### アプリケーション

- `docs`: [Docusaurus](https://docusaurus.io/)を使用したドキュメントサイト
- `web`: [Next.js 15+](https://nextjs.org/) App Routerを使用したメインブログサイト（MDX・検索機能実装済み）

### 共有パッケージ

- `packages/ui`: Storybookを含むUIコンポーネントライブラリ
- `packages/utils`: 共通ユーティリティ関数
- `packages/eslint-config`: ESLint共有設定
- `packages/typescript-config`: TypeScript共有設定

全てのパッケージ/アプリは100% [TypeScript](https://www.typescriptlang.org/)で開発されています。

### 開発ツール

このプロジェクトには以下の開発ツールが設定済みです：

- [TypeScript](https://www.typescriptlang.org/) - 静的型チェック
- [ESLint](https://eslint.org/) - コードリント
- [Prettier](https://prettier.io) - コードフォーマット
- [commitlint](https://commitlint.js.org/) - コミットメッセージ規約
- [lefthook](https://github.com/evilmartians/lefthook) - Git フック管理

## 開発環境のセットアップ

### 前提条件

- [Node.js](https://nodejs.org/) 18.17以上
- [pnpm](https://pnpm.io/) 8.6.2以上
- [mise](https://mise.jdx.dev/) (推奨) - `.tool-versions`ファイルで適切なバージョンを自動管理

### 依存関係のインストール

```bash
# miseを使用する場合（推奨）
mise install

# 依存関係のインストール
pnpm install
```

### 開発サーバーの起動

```bash
pnpm turbo dev
```

### ビルド

```bash
pnpm turbo build
```

### リント

```bash
pnpm turbo lint
```

### ESLint設定の確認

ESLint設定を視覚的に確認するためのツールが利用できます：

```bash
# 全パッケージのConfig Inspectorを同時起動（各ポートでアクセス可能）
pnpm config:inspect

# 特定のパッケージのみ実行
pnpm turbo config:inspect --filter=@repo/ui

# 静的HTML版を生成
pnpm config:build
pnpm turbo config:build --filter=@repo/ui
```

各パッケージのConfig Inspectorは以下のポートで起動されます：

- eslint-config: http://localhost:7771
- utils: http://localhost:7772
- ui: http://localhost:7773
- web: http://localhost:7774
- docs: http://localhost:7775

## 開発ワークフロー

### ブランチ戦略

- フィーチャーブランチ: `feature/task-description`
- メインブランチ: `main`

### コミット規約

- **言語**: 日本語で記述
- **形式**: conventional commitsに準拠
- **例**: `feat: 新機能の追加`, `fix: バグ修正`

### 進捗管理

- `apps/docs/docs/TODO.md` - 開発ロードマップ（約120タスク）
- 完了したタスクは `[x]` でマーク

## 現在のステータス

**フェーズ7.1: コメント・ソーシャル機能** - 完了 ✅

### 実装済み機能

- ✅ モノレポ基盤構築（TurboRepo + pnpm）
- ✅ デザインシステム・UIコンポーネントライブラリ（Storybook付き）
- ✅ Next.js 15ブログアプリケーション（App Router）
- ✅ MDX記事管理システム
- ✅ タグ・カテゴリシステム
- ✅ fuse.jsを使用したあいまい検索機能
- ✅ テスト環境（Vitest + Playwright）
- ✅ パフォーマンス最適化（ISR、遅延読み込み、Bundle分析）
- ✅ 多言語対応（日本語・英語）
- ✅ SEO最適化（メタデータ、構造化データ）
- ✅ コメント機能（GitHub Discussions連携）
- ✅ 見出しアンカーリンク機能
- ✅ モバイル対応目次ドロワー

### 次フェーズ

**フェーズ7.2: 拡張ソーシャル機能**

詳細な開発計画については `apps/docs/docs/TODO.md` を参照してください。

## 参考リンク

Turborepoの詳細については以下を参照してください：

- [タスク](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [キャッシング](https://turborepo.com/docs/crafting-your-repository/caching)
- [フィルタリング](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [設定オプション](https://turborepo.com/docs/reference/configuration)
- [CLI使用方法](https://turborepo.com/docs/reference/command-line-reference)
