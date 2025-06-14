# Claude Codeで技術ブログをVibe codingしてみる

TurboRepoとpnpmを使用したモノレポ構成の技術ブログプラットフォームです。
日本語圏の開発者をターゲットとし、ターミナル/コンソール風のデザインテーマを特徴としています。

## プロジェクト構成

このモノレポには以下のアプリケーションとパッケージが含まれています：

### アプリケーション

- `docs`: [Docusaurus](https://docusaurus.io/)を使用したドキュメントサイト
- `web`: [Next.js 15+](https://nextjs.org/) App Routerを使用したメインブログサイト
- `packages/`: 共有パッケージ（将来実装予定）

全てのパッケージ/アプリは100% [TypeScript](https://www.typescriptlang.org/)で開発されています。

### 開発ツール

このプロジェクトには以下の開発ツールが設定済みです：

- [TypeScript](https://www.typescriptlang.org/) - 静的型チェック
- [ESLint](https://eslint.org/) - コードリント
- [Prettier](https://prettier.io) - コードフォーマット
- [commitlint](https://commitlint.js.org/) - コミットメッセージ規約
- [lefthook](https://github.com/evilmartians/lefthook) - Git フック管理

## 開発環境のセットアップ

### 依存関係のインストール

```bash
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

**フェーズ1: プロジェクト基盤構築** - 進行中

詳細な開発計画については `apps/docs/docs/TODO.md` を参照してください。

## 参考リンク

Turborepoの詳細については以下を参照してください：

- [タスク](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [キャッシング](https://turborepo.com/docs/crafting-your-repository/caching)
- [リモートキャッシング](https://turborepo.com/docs/core-concepts/remote-caching)
- [フィルタリング](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [設定オプション](https://turborepo.com/docs/reference/configuration)
- [CLI使用方法](https://turborepo.com/docs/reference/command-line-reference)
