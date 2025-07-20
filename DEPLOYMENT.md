# Vercelデプロイガイド

このドキュメントでは、技術ブログアプリケーションをVercelにデプロイする方法を説明します。

## 📋 前提条件

- [Vercel](https://vercel.com)アカウント
- GitHubリポジトリとの接続
- Node.js 22+ (ローカル開発用)
- pnpm 10.12.4+ (ローカル開発用)

## 🚀 Vercelプロジェクトセットアップ

### 1. Vercelでのプロジェクト作成

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. "New Project"をクリック
3. GitHubリポジトリを選択
4. 下記の設定を適用:

```
Framework Preset: Next.js
Root Directory: apps/web
Build Command: pnpm turbo build --filter=web
Output Directory: .next
Install Command: pnpm install
```

### 2. 環境変数設定

Vercel Dashboardで以下の環境変数を設定:

#### 必須設定

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=TechBlog
NEXT_PUBLIC_APP_DESCRIPTION=技術ブログ - ターミナル風デザイン
```

#### giscusコメントシステム設定

```bash
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxxxxxxxxxxxxx
```

#### Google Analytics設定 (オプション)

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. giscus設定手順

1. [giscus.app](https://giscus.app/ja)にアクセス
2. リポジトリ名を入力（例: `username/repository`）
3. ページ ↔️ ディスカッション のマッピング設定
4. カテゴリを選択（通常は "General"）
5. 生成されたスクリプトから以下の値を取得:
   - `data-repo-id` → `NEXT_PUBLIC_GISCUS_REPO_ID`
   - `data-category-id` → `NEXT_PUBLIC_GISCUS_CATEGORY_ID`

## 🔧 GitHub Actions設定

### 必要なシークレット設定

GitHub リポジトリの Settings > Secrets and variables > Actions で以下を設定:

```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

### Vercel Token取得方法

1. [Vercel Dashboard](https://vercel.com/account/tokens)にアクセス
2. "Create Token"で新しいトークンを作成
3. 適切なスコープを設定（Deploy権限必須）

### ORG ID・PROJECT ID取得方法

```bash
# Vercel CLIをインストール
npm i -g vercel

# プロジェクトディレクトリでログイン
vercel login

# プロジェクト情報を確認
vercel link
# .vercel/project.json を確認してIDを取得
```

## 📱 デプロイフロー

### 自動デプロイ

- **本番デプロイ**: `main`ブランチへのpushで自動実行
- **プレビューデプロイ**: PRの作成・更新で自動実行

### 手動デプロイ

```bash
# Vercel CLIで手動デプロイ
vercel --prod
```

## 🔍 デプロイ後の確認項目

### 基本機能確認

- [ ] ホームページの表示
- [ ] 記事一覧の表示
- [ ] 記事詳細の表示
- [ ] 検索機能
- [ ] タグ・カテゴリ機能
- [ ] 多言語切り替え
- [ ] レスポンシブデザイン

### SEO確認

- [ ] sitemap.xml (`/sitemap.xml`)
- [ ] robots.txt (`/robots.txt`)
- [ ] RSS フィード (`/rss.xml`)
- [ ] OGP画像の生成
- [ ] JSON-LD構造化データ

### パフォーマンス確認

- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)でのスコア
- [ ] Core Web Vitals
- [ ] 画像最適化（WebP/AVIF）
- [ ] フォント最適化

### セキュリティ確認

- [ ] HTTPS証明書
- [ ] セキュリティヘッダー
- [ ] CSPポリシー

## 🚨 トラブルシューティング

### よくある問題

#### ビルドエラー

```bash
# ローカルでビルドテスト
pnpm turbo build --filter=web

# 型チェック
pnpm turbo typecheck --filter=web
```

#### 環境変数エラー

- Vercel Dashboardで環境変数が正しく設定されているか確認
- 変数名のタイプミスがないか確認
- `NEXT_PUBLIC_`プレフィックスの付け忘れがないか確認

#### giscusコメント表示されない

- リポジトリでDiscussions機能が有効になっているか確認
- giscusの設定値（REPO_ID、CATEGORY_ID）が正しいか確認
- HTTPSでアクセスしているか確認

### デバッグ方法

```bash
# Vercelログの確認
vercel logs

# 詳細なエラー情報
vercel logs --follow
```

## 📚 関連リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [giscus Documentation](https://giscus.app/)
- [GitHub Actions](https://docs.github.com/en/actions)
