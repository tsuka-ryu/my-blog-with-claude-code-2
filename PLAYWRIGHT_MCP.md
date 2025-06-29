# Playwright MCP 設定ガイド

このプロジェクトでは、Claude CodeのPlaywright MCPを使用してブラウザでの動作確認を行います。

## 設定概要

- **設定ファイル**: `playwright.config.ts`
- **テストディレクトリ**: `playwright-tests/`
- **ベースURL**: `http://localhost:3000`
- **対応ブラウザ**: Chromium, Firefox, WebKit, モバイル（Chrome/Safari）

## 利用可能なコマンド

```bash
# 基本的なテスト実行
pnpm playwright

# UIモードでテスト実行（ブラウザGUIで確認）
pnpm playwright:ui

# デバッグモードでテスト実行
pnpm playwright:debug

# テストレポートを表示
pnpm playwright:report
```

## MCP動作確認の手順

### 1. 開発サーバーの起動

```bash
pnpm turbo dev
```

### 2. Playwright MCPでの動作確認

Claude CodeのPlaywright MCPを使用して以下を確認：

- **基本的なページ表示**
  - ホームページ (`/`)
  - 記事一覧ページ (`/posts`)
  - タグ一覧ページ (`/tags`)
  - 検索ページ (`/search`)

- **レスポンシブデザイン**
  - モバイルビュー（375px × 667px）
  - タブレットビュー（768px × 1024px）
  - デスクトップビュー（1920px × 1080px）

- **機能確認**
  - ナビゲーション動作
  - 検索機能
  - フィルタリング機能
  - 動的コンテンツの表示

### 3. アクセシビリティ確認

- キーボードナビゲーション
- スクリーンリーダー対応
- 色のコントラスト
- フォーカスインジケーター

## テストファイル構成

```
playwright-tests/
├── basic-navigation.spec.ts  # 基本ナビゲーションテスト
└── ...                      # 追加のテストファイル
```

## 注意事項

- MCP使用時は開発サーバーが起動済みであることを前提
- テストは軽量化のため、重い自動E2Eテストよりも手動検証を優先
- 画面実装完了後は**必ず**Playwright MCPで動作確認すること

## トラブルシューティング

### ブラウザが起動しない場合

```bash
npx playwright install
```

### ポート3000が使用できない場合

`playwright.config.ts`の`baseURL`を変更してください。

### テストが失敗する場合

1. 開発サーバーが起動していることを確認
2. `playwright.config.ts`の設定を確認
3. ブラウザバイナリが正しくインストールされていることを確認
