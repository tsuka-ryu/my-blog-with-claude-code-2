# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code) にガイダンスを提供します。

## プロジェクト概要

**TurboRepoとpnpmを使用したモノレポ**として構築された技術ブログプロジェクト。日本語圏の開発者をターゲットとし、ターミナル/コンソール風デザインテーマを特徴とする。

**現在のステータス**: フェーズ3 - 統合テスト・品質保証

## 開発環境設定

- **パッケージマネージャー**: pnpm 10.12.1
- **モノレポツール**: TurboRepo 2.5.4
- **言語**: TypeScript (strict mode)
- **ターゲットフレームワーク**: Next.js 15+ with App Router

## 一般的なbashコマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm turbo dev

# ビルド
pnpm turbo build

# リント
pnpm turbo lint

# テスト実行
pnpm turbo test

# E2Eテスト（webアプリ）
pnpm --filter=web test:e2e

# Playwrightブラウザのインストール
pnpm --filter=web playwright:install
```

## コアファイルとユーティリティ

### 重要なファイル

- `turbo.json` - TurboRepoパイプライン設定
- `pnpm-workspace.yaml` - ワークスペース定義
- `apps/docs/docs/TODO.md` - 開発ロードマップ（約120タスク）
- `package.json` - ルートパッケージ設定
- `.github/workflows/` - CI/CD設定

### 現在の構造

```
my-blog-with-claude-code/
├── apps/
│   ├── docs/             # Docusaurus ドキュメントサイト
│   └── web/              # Next.js ウェブアプリ
│       ├── app/          # App Router
│       ├── __tests__/    # 単体テスト
│       └── e2e/          # E2Eテスト
├── packages/
│   ├── ui/               # 共有UIコンポーネント
│   ├── utils/            # 共有ユーティリティ
│   ├── ui-config/        # UI設定（Tailwind等）
│   ├── eslint-config/    # ESLint共有設定
│   └── typescript-config/# TypeScript共有設定
└── tools/
    └── mcp-ui-fetcher/   # MCPサーバー
```

## コードスタイルガイドライン

- **厳格な開発プラクティス**: 包括的なリント、フォーマット、コミットメッセージ規約
- **TypeScript**: strict mode必須
- **モノレポベストプラクティス**: 明確な関心の分離
- **コメント**: 必要な場合のみ追加（過度なコメントは避ける）

## テスト手順

### 単体テスト

- **フレームワーク**: Vitest + Testing Library
- **実行**: `pnpm turbo test`
- **カバレッジ**: `pnpm turbo test -- --coverage`

### E2Eテスト

- **フレームワーク**: Playwright
- **実行**: `pnpm --filter=web test:e2e`
- **UIモード**: `pnpm --filter=web test:e2e:ui`
- **デバッグ**: `pnpm --filter=web test:e2e:debug`

### アクセシビリティテスト

- **ツール**: axe-core
- **実行**: 各コンポーネントテスト内で自動実行

## リポジトリエチケット

### ブランチ命名

- フィーチャーブランチ: `feature/task-description`
- バグ修正: `fix/issue-description`
- ドキュメント: `docs/documentation-update`

### コミット規約

- **言語**: 日本語で記述すること
- **形式**: conventional commitsに準拠
  - `feat`: 新機能
  - `fix`: バグ修正
  - `docs`: ドキュメント更新
  - `style`: コードスタイルの変更
  - `refactor`: リファクタリング
  - `test`: テストの追加・修正
  - `chore`: ビルドプロセスや補助ツールの変更
- **コミット前**: TODO.mdで完了タスクを`[x]`でマーク

### PR作成

- **説明**: ブランチ内での変更を日本語で簡潔に記述
- **テストプラン**: 実行したテスト内容を記載
- **スクリーンショット**: UI変更の場合は添付

## プロジェクト特有の動作・警告

- turbo.jsonのパイプライン設定:
  - **build**: `.next/**`キャッシュを除くNext.js出力キャッシュ
  - **lint**: パッケージ間カスケードlint
  - **dev**: キャッシュなし永続開発サーバー
  - **test**: テスト実行（キャッシュあり）
  - **globalDependencies**: `**/.env.*local`

## 重要な開発ノート

### 開発フロー

1. **タスク開始前**: apps/docs/docs/TODO.mdでタスクを確認
2. **実装中**: TodoWrite/TodoReadツールを活用して進捗管理
3. **動作確認**: 必ずPlaywright MCPを使用してブラウザで動作確認
4. **コミット時**: TODO.mdで完了タスクを`[x]`でマーク
5. **PR作成前**: リント・テストが全て通過することを確認

### ページ実装時の必須確認事項

新しいページやコンポーネントを実装した際は、**必ずPlaywright MCPを使用して実際のブラウザで動作確認を行うこと**：

1. 開発サーバーを起動: `pnpm --filter=web dev`
2. Playwright MCPでブラウザを操作して以下を確認:
   - ページが正しく表示される
   - ナビゲーションが機能する
   - レスポンシブデザインが適切に動作する
   - アクセシビリティ要件を満たしている
3. E2Eテストを作成して動作を保証

### MCPサーバー活用

- **playwright-mcp**: ブラウザ操作・動作確認用
- **mcp-ui-fetcher**: UIパッケージの構造確認用

## ブログ作成時の注意事項

- **作者名**: ブログ記事のauthorsフィールドでは必ず`tsuka-ryu`を使用すること（`tsukaryu`ではない）
- **参照**: apps/docs/blog/authors.ymlで定義されている正確な作者IDを確認すること
- **truncate**: 全てのブログ記事には必ず`<!-- truncate -->`コメントを含めること（フロントマッターの後、本文の適切な位置に配置）

## UIコンポーネント開発

- **配置場所**: 新しいUIコンポーネントは`packages/ui/src/components/`ディレクトリに配置すること
- **構成**: 各コンポーネントは以下のファイルで構成:
  - `component-name.tsx`: コンポーネント本体
  - `component-name.stories.tsx`: Storybookストーリー
  - `component-name.test.tsx`: 単体テスト
- **エクスポート**: 作成したコンポーネントは`packages/ui/src/index.ts`からエクスポートすること
- **アクセシビリティ**: 全てのコンポーネントはWCAG 2.1 AA準拠を目指す

## 品質保証チェックリスト

### コード提出前の確認事項

- [ ] TypeScriptの型エラーがない: `pnpm turbo check-types`
- [ ] リントエラーがない: `pnpm turbo lint`
- [ ] フォーマットが適用されている: `pnpm format`
- [ ] 単体テストが通過する: `pnpm turbo test`
- [ ] E2Eテストが通過する（該当する場合）: `pnpm --filter=web test:e2e`
- [ ] ブラウザで動作確認済み（Playwright MCP使用）
- [ ] TODO.mdが更新されている

### パフォーマンス考慮事項

- 画像は`next/image`を使用して最適化
- 動的インポートで必要に応じてコード分割
- `loading.tsx`と`error.tsx`で適切なローディング・エラー状態を提供

## トラブルシューティング

### よくある問題と解決方法

1. **依存関係エラー**: `pnpm install --frozen-lockfile`を実行
2. **ビルドエラー**: `pnpm turbo build --force`でキャッシュをクリア
3. **テストエラー**: `pnpm --filter=<package> test -- --no-cache`でキャッシュなしで実行
4. **Playwrightエラー**: `pnpm --filter=web playwright:install`でブラウザを再インストール

## 参考リンク

- [Next.js 15 ドキュメント](https://nextjs.org/docs)
- [TurboRepo ドキュメント](https://turbo.build/repo/docs)
- [Playwright ドキュメント](https://playwright.dev/)
- [pnpm ドキュメント](https://pnpm.io/)
