# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

**TurboRepoとpnpmを使用したモノレポ**として構築された技術ブログプロジェクト。日本語圏の開発者をターゲットとし、ターミナル/コンソール風デザインテーマを特徴とする。

**現在のステータス**: フェーズ2 - デザインシステム・UI基盤

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

### 開発フロー

1. **タスク開始前**: apps/docs/docs/TODO.mdでタスクを確認
2. **実装中**: TodoWrite/TodoReadツールを活用して進捗管理
3. **画面実装完了後**: **必ずPlaywright MCPを使用してブラウザで動作確認**
4. **コミット時**: TODO.mdで完了タスクを`[x]`でマーク
5. **PR作成前**: リント・テストが全て通過することを確認

### MCP動作確認の必須化

**画面・ページ実装時は必ずPlaywright MCPによる動作確認を実行すること**：

1. 開発サーバーを起動: `pnpm turbo dev`
2. Playwright MCPでブラウザを操作して以下を確認:
   - ページが正しく表示される
   - ナビゲーションが機能する
   - レスポンシブデザインが適切に動作する
   - 動的機能（検索、フィルタリングなど）が正常に動作する
   - アクセシビリティ要件を満たしている（基本的な確認）
   - エラー処理が適切に表示される

**注意**: 自動E2Eテストは重いため、MCPによる手動検証を優先する。

### その他の重要事項

- **進捗管理**: apps/docs/docs/TODO.mdが主要ロードマップ - 必ず参照・更新すること
- **コミット時**: 変更内容に応じてTODOファイルを更新し、Claude Codeにも自動的にTODO更新を指示すること
- **ドキュメント**: 主要決定はapps/docs/docs/ディレクトリに記録

## ブログ作成時の注意事項

- **作者名**: ブログ記事のauthorsフィールドでは必ず`tsuka-ryu`を使用すること（`tsukaryu`ではない）
- **参照**: apps/docs/blog/authors.ymlで定義されている正確な作者IDを確認すること
- **truncate**: 全てのブログ記事には必ず`<!-- truncate -->`コメントを含めること（フロントマッターの後、本文の適切な位置に配置）

## UIコンポーネント開発

- **配置場所**: 新しいUIコンポーネントは`packages/ui/src/components/`ディレクトリに配置すること
- **構成**: 各コンポーネントは`component-name.tsx`と`component-name.stories.tsx`の2ファイルで構成
- **エクスポート**: 作成したコンポーネントは`packages/ui/src/index.ts`からエクスポートすること
- **動作確認**: コンポーネント作成後は必ずStorybookとPlaywright MCPで動作確認を実行
