# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

**TurboRepoとpnpmを使用したモノレポ**として構築された技術ブログプロジェクト。日本語圏の開発者をターゲットとし、ターミナル/コンソール風デザインテーマを特徴とする。

**現在のステータス**: フェーズ5完了 - コンテンツ管理・検索機能実装済み

## 開発環境設定

- **パッケージマネージャー**: pnpm 10.12.1
- **モノレポツール**: TurboRepo 2.5.4
- **言語**: TypeScript (strict mode)
- **ターゲットフレームワーク**: Next.js 15+ with App Router

## 一般的なbashコマンド

```bash
# 依存関係のインストール
pnpm install

# 利用可能なコマンド:
pnpm turbo build    # 全パッケージをビルド
pnpm turbo lint     # 全パッケージをリント
pnpm turbo typecheck # 型チェック
pnpm turbo dev      # 開発サーバーを起動
pnpm turbo test     # テスト実行

# webアプリケーション単体での開発
cd apps/web && pnpm dev
```

## コアファイルとユーティリティ

### 重要なファイル

- `turbo.json` - TurboRepoパイプライン設定
- `pnpm-workspace.yaml` - ワークスペース定義
- `apps/docs/docs/TODO.md` - 開発ロードマップ（約120タスク）

### 現在の構造

```bash
my-blog-with-claude-code/
├── package.json           # ルートパッケージ設定
├── turbo.json            # TurboRepoパイプライン設定
├── pnpm-workspace.yaml   # ワークスペース定義
├── apps/
│   ├── docs/             # Docusaurus ドキュメントサイト
│   └── web/              # Next.js ウェブアプリ（MDX・検索機能実装済み）
└── packages/             # 共有パッケージ
    ├── ui/               # UIコンポーネントライブラリ（Storybook付き）
    ├── utils/            # 共通ユーティリティ
    ├── eslint-config/    # ESLint共有設定
    └── typescript-config/ # TypeScript共有設定
```

## コードスタイルガイドライン

- **厳格な開発プラクティス**: 包括的なリント、フォーマット、コミットメッセージ規約
- **TypeScript**: strict mode必須
- **モノレポベストプラクティス**: 明確な関心の分離

## テスト手順

設定済み・実行可能：

- **単体テスト**: Vitest + Testing Library（packages/ui, apps/web対応）
- **E2Eテスト**: Playwright（設定済み、テスト拡充予定）
- **Visual Regression**: 設定予定
- **動作確認**: 実装後はPlaywright MCPを使用してブラウザでの動作確認を必須とする
- **Storybook**: UIコンポーネントのインタラクションテスト対応

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

- アプリケーション・パッケージ実装済み（全ての開発コマンドが利用可能）
- webアプリケーション: Markdownベースのブログ機能・検索機能実装済み
- turbo.jsonのパイプライン設定:
  - **build**: `.next/**`キャッシュを除くNext.js出力キャッシュ
  - **lint**: パッケージ間カスケードlint
  - **dev**: キャッシュなし永続開発サーバー
  - **test**: Vitestテスト実行
  - **globalDependencies**: `**/.env.*local`

## 重要な開発ノート

- **進捗管理**: apps/docs/docs/TODO.mdが主要ロードマップ - 必ず参照・更新すること
- **コミット時**: 変更内容に応じてTODOファイルを更新し、Claude Codeにも自動的にTODO更新を指示すること
- **ドキュメント**: 主要決定はapps/docs/docs/ディレクトリに記録
- **実装フロー**: 新機能実装時は最後に必ずPlaywright MCPを使用してブラウザでの動作確認を実施すること

## ブログ作成時の注意事項

- **作者名**: ブログ記事のauthorsフィールドでは必ず`tsuka-ryu`を使用すること（`tsukaryu`ではない）
- **参照**: apps/docs/blog/authors.ymlで定義されている正確な作者IDを確認すること
- **truncate**: 全てのブログ記事には必ず`<!-- truncate -->`コメントを含めること（フロントマッターの後、本文の適切な位置に配置）

## UIコンポーネント開発

- **配置場所**: 新しいUIコンポーネントは`packages/ui/src/components/`ディレクトリに配置すること
- **構成**: 各コンポーネントは`component-name.tsx`と`component-name.stories.tsx`の2ファイルで構成
- **エクスポート**: 作成したコンポーネントは`packages/ui/src/index.ts`からエクスポートすること
