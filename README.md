# My Blog with Claude Code

技術ブログプロジェクト - TurboRepo + pnpm モノレポ構成

## 概要

ターミナル/コンソール風デザインテーマを特徴とする技術ブログ。日本語圏の開発者をターゲットとし、英語サポートも予定。

## 技術スタック

- **モノレポ**: TurboRepo 2.5.4
- **パッケージマネージャー**: pnpm 10.12.1
- **フレームワーク**: Next.js 14+ (App Router) - 予定
- **スタイリング**: Tailwind CSS
- **コンテンツ**: MDX
- **多言語**: next-intl

## 開発状況

**現在**: フェーズ1 - プロジェクト基盤構築

詳細な開発ロードマップは [TODO.md](./TODO.md) を参照してください。

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動（パッケージ作成後）
pnpm turbo dev
```

## プロジェクト構造

```
my-blog-with-claude-code/
├── apps/          # アプリケーション（予定）
├── packages/      # 共有パッケージ（予定）
├── tools/         # 開発ツール（予定）
└── memo/          # 設計ドキュメント
```

## ドキュメント

- [TODO.md](./TODO.md) - 開発ロードマップ
- [CLAUDE.md](./CLAUDE.md) - Claude Code向けガイダンス
- [memo/setup-decisions.md](./memo/setup-decisions.md) - セットアップ決定事項