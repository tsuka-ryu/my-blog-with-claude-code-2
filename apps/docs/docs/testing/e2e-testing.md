# E2Eテスト

Playwrightを使用したEnd-to-End（E2E）テストの実装と実行方法について説明します。

## 概要

E2Eテストは、アプリケーション全体の動作をユーザー視点で検証するテストです。実際のブラウザを使用して、ユーザーの操作をシミュレートし、期待される動作を確認します。

## セットアップ

### 依存関係のインストール

```bash
cd apps/web
pnpm add -D @playwright/test playwright
```

### ブラウザのインストール

```bash
pnpm playwright:install
```

## テストの実行

### 通常の実行

```bash
pnpm test:e2e
```

### UIモードでの実行（デバッグ用）

```bash
pnpm test:e2e:ui
```

### デバッグモード

```bash
pnpm test:e2e:debug
```

## テストの構成

### ディレクトリ構造

```bash
apps/web/
├── e2e/
│   ├── home.spec.ts      # ホームページのテスト
│   ├── posts.spec.ts     # 記事一覧・詳細のテスト
│   └── search.spec.ts    # 検索機能のテスト
└── playwright.config.ts  # Playwright設定ファイル
```

### 設定ファイル

`playwright.config.ts`では以下の設定を行っています：

- **テストディレクトリ**: `./e2e`
- **ベースURL**: `http://localhost:3000`
- **対象ブラウザ**: Chromium, Firefox, WebKit
- **開発サーバー**: テスト実行前に自動起動

## テストケースの例

### 基本的なテスト

```typescript
import { test, expect } from '@playwright/test';

test('ホームページが正しく表示される', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Tech Blog/);
  await expect(page.locator('header')).toBeVisible();
});
```

### ナビゲーションのテスト

```typescript
test('ナビゲーションが正しく動作する', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Posts' }).click();
  await expect(page).toHaveURL('/posts');
});
```

## CI/CDでの実行

GitHub Actionsでの自動実行が設定されています（`.github/workflows/e2e.yml`）：

- プルリクエスト時に自動実行
- テスト結果のレポートを保存
- 失敗時のスクリーンショットを含む

## playwright-mcpサーバー

プロジェクトには`playwright-mcp`サーバーの設定も含まれています（`tools/mcp-servers.json`）。これにより、Claude Codeから直接Playwrightを操作することが可能です。

## ベストプラクティス

1. **data-testid属性の使用**: UI要素の選択にはdata-testid属性を優先的に使用
2. **ページオブジェクトパターン**: 複雑なテストではページオブジェクトパターンを採用
3. **並列実行**: テストは並列で実行され、高速化を実現
4. **リトライ**: CI環境では自動的に2回までリトライ

## トラブルシューティング

### ブラウザがインストールされていない

```bash
pnpm playwright:install
```

### ポート3000が使用中

開発サーバーが既に起動している場合は、`reuseExistingServer: true`の設定により既存のサーバーを使用します。

### テストがタイムアウトする

`playwright.config.ts`でタイムアウト時間を調整できます。
