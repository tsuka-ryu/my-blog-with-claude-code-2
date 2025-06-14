# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

**TurboRepoとpnpmを使用したモノレポ**として構築された技術ブログプロジェクト。日本語圏の開発者をターゲットとし、ターミナル/コンソール風デザインテーマを特徴とする。

**現在のステータス**: フェーズ1 - プロジェクト基盤構築

## 開発環境設定

- **パッケージマネージャー**: pnpm 10.12.1
- **モノレポツール**: TurboRepo 2.5.4
- **言語**: TypeScript (strict mode)
- **ターゲットフレームワーク**: Next.js 15+ with App Router

## 一般的なbashコマンド

```bash
# 依存関係のインストール
pnpm install

# 将来利用可能（パッケージ作成後）:
pnpm turbo build    # 全パッケージをビルド
pnpm turbo lint     # 全パッケージをリント
pnpm turbo dev      # 開発サーバーを起動
```

## コアファイルとユーティリティ

### 重要なファイル

- `turbo.json` - TurboRepoパイプライン設定
- `pnpm-workspace.yaml` - ワークスペース定義
- `apps/docs/docs/TODO.md` - 開発ロードマップ（約120タスク）

### 現在の構造

```
my-blog-with-claude-code/
├── package.json           # ルートパッケージ設定
├── turbo.json            # TurboRepoパイプライン設定
├── pnpm-workspace.yaml   # ワークスペース定義
├── apps/
│   ├── docs/             # Docusaurus ドキュメントサイト
│   └── web/              # Next.js ウェブアプリ
└── packages/             # 共有パッケージ（現在空）
```

## コードスタイルガイドライン

- **厳格な開発プラクティス**: 包括的なリント、フォーマット、コミットメッセージ規約
- **TypeScript**: strict mode必須
- **モノレポベストプラクティス**: 明確な関心の分離

## テスト手順

現在設定中：

- **単体テスト**: Vitest + Testing Library（予定）
- **E2Eテスト**: Playwright（予定）
- **Visual Regression**: 設定予定

## リポジトリエチケット

### ブランチ命名

- フィーチャーブランチ: `feature/task-description`

### コミット規約

- **言語**: 日本語で記述すること
- **形式**: conventional commitsに準拠（予定）
- **コミット前**: TODO.mdで完了タスクを`[x]`でマーク

### PR作成

- **説明**: ブランチ内での変更を日本語で簡潔に記述
- **レビュー**: 設定予定

## プロジェクト特有の動作・警告

- 実際のアプリケーションパッケージ未作成のため、多くの開発コマンドは現在利用不可
- turbo.jsonのパイプライン設定:
  - **build**: `.next/**`キャッシュを除くNext.js出力キャッシュ
  - **lint**: パッケージ間カスケードlint
  - **dev**: キャッシュなし永続開発サーバー
  - **globalDependencies**: `**/.env.*local`

## 重要な開発ノート

- **進捗管理**: apps/docs/docs/TODO.mdが主要ロードマップ - 必ず参照・更新すること
- **コミット時**: 変更内容に応じてTODOファイルを更新し、Claude Codeにも自動的にTODO更新を指示すること
- **ドキュメント**: 主要決定はapps/docs/docs/ディレクトリに記録
