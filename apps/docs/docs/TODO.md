# 技術ブログ開発 TODO リスト

## 🎯 プロジェクト概要

- **ターゲット**: 誰でも（日本語圏メイン）
- **目的**: 技術共有・解説記事・Podcast感想
- **デザイン**: ターミナル風コンソールデザイン

## 🚀 Phase 1: プロジェクト基盤構築

### 1.1 開発環境セットアップ

- [x] **1.1.1** pnpm インストール・設定
- [x] **1.1.2** Turborepo モノレポ初期化
- [x] **1.1.3** TypeScript 設定（strict mode）
- [x] **1.1.4** Oxlint + ESLint + Prettier 設定
- [x] **1.1.5** lefthook 設定
- [x] **1.1.6** commitlint 設定（コミットメッセージ規約）
- [x] **1.1.7** .gitignore と .gitattributes 設定

### 1.2 モノレポ構造構築

```bash
my-blog-with-claude-code/
├── apps/
│   ├── web/               # Next.js 15+ メインアプリ
│   └── docs/              # Docusaurus ドキュメント
├── packages/
│   ├── ui/                # 共有UIコンポーネント
│   ├── utils/             # 共有ユーティリティ
│   ├── eslint-config/     # ESLint共有設定
│   └── typescript-config/ # TypeScript共有設定
└── tools/                 # 開発ツール（予定）
```

- [x] **1.2.1** apps/web ディレクトリ作成（Next.js 15 App Router）
- [x] **1.2.2** packages/ui パッケージ作成（Storybook v9導入済み）
- [x] **1.2.3** packages/utils パッケージ作成
- [x] **1.2.4** packages/eslint-config・typescript-config パッケージ作成
- [x] **1.2.5** apps/docs ドキュメントサイト整理（Docusaurus、不要チュートリアル削除済み）
- [x] **1.2.6** 各パッケージ間の依存関係設定
- [x] **1.2.7** pnpm catalog機能の導入（依存関係のバージョン統一管理）
- [x] **1.2.8** Storybook v9へのマイグレーション調査完了（エコシステム未対応のため延期）
- [x] **1.2.9** ESLint設定の厳密化（@typescript-eslint/strictルール追加、import/export順序、未使用変数検出強化）

### 1.3 CI/CD・開発ワークフロー

- [x] **1.3.1** GitHub Actions ワークフロー
- [x] **1.3.2** GitHub ActionsでTurbo設定コマンドのCI検証を追加（build, lint, typecheck等）

## 🎨 Phase 2: デザインシステム・UI基盤

### 2.1 デザインシステム構築

- [x] **2.1.1** Tailwind CSS セットアップ
- [x] **2.1.2** ターミナル風カラーパレット定義
- [x] **2.1.3** 等幅フォント設定（JetBrains Mono + Noto Sans JP）
- [x] **2.1.4** ダークモード対応（system/dark/light）
- [x] **2.1.5** Storybookターミナル風カスタムテーマ実装（プロジェクト統一デザイン）
- [x] **2.1.6** ColorPaletteコンポーネント動的テーマ対応（CSS変数使用）
- [x] **2.1.7** レスポンシブブレークポイント設定

### 2.2 共有UIコンポーネント

- [x] **2.2.1** Typography コンポーネント（アクセシビリティ考慮：見出し階層、読みやすさ）
- [x] **2.2.2** Button・Link コンポーネント（アクセシビリティ考慮：フォーカス、キーボード操作、ARIA）
- [x] **2.2.3** Card・Container コンポーネント（アクセシビリティ考慮：セマンティック構造）
- [x] **2.2.4** Navigation・Header コンポーネント（アクセシビリティ考慮：ランドマーク、キーボード操作）
- [x] **2.2.5** Footer コンポーネント（アクセシビリティ考慮：ランドマーク）
- [x] **2.2.6** Loading・Error コンポーネント（アクセシビリティ考慮：aria-live、スクリーンリーダー）

### 2.3 テスト・品質保証環境

- [x] **2.3.1** MCPサーバープロジェクト初期化
- [x] **2.3.2** Vitest + Testing Library セットアップ
- [x] **2.3.3** axe-core自動テスト導入
- [x] **2.3.4** markuplint セットアップ（HTML品質・アクセシビリティチェック）
- [x] **2.3.5** アクセシビリティガイドライン策定（コンポーネント作成時の観点整理）
- [x] **2.3.6** UIコンポーネントストーリー作成
- [x] **2.3.7** TypeScript型定義自動生成
- [x] **2.3.8** コンポーネントドキュメント生成（Storybookで実装済み）
- [x] **2.3.9** デザインシステムドキュメント
- [x] **2.3.10** コンポーネント単体テスト
- [x] **2.3.11** Storybook インタラクションテスト
- [ ] **2.3.12** Lighthouse Accessibility監査

### 2.4 アプリケーション構造

- [x] **2.4.1** app/layout.tsx 基本レイアウト
- [x] **2.4.2** app/page.tsx ホームページ
- [x] **2.4.3** app/posts/[slug]/page.tsx 記事詳細
- [x] **2.4.4** app/posts/page.tsx 記事一覧
- [x] **2.4.5** app/tags/[tag]/page.tsx タグ別記事一覧
- [x] **2.4.6** app/tags/page.tsx タグ一覧ページ
- [x] **2.4.7** app/search/page.tsx 検索結果ページ

## 🛠 Phase 3: 統合テスト・品質保証

### 3.1 アプリケーション統合テスト

- [x] **3.1.1** API ルートテスト
- [ ] **3.1.2** Playwright E2Eテスト
- [ ] **3.1.3** Playwright + axe-core アクセシビリティテスト
- [ ] **3.1.4** Visual Regression テスト
- [ ] **3.1.5** パフォーマンステスト

### 3.2 統合品質監査

- [ ] **3.2.1** アプリケーション全体のアクセシビリティ監査
- [ ] **3.2.2** markuplint統合テスト（全ページHTML品質チェック）

## 📝 Phase 4: コンテンツ管理・表示機能

### 4.1 Markdown処理システム

- [x] **4.1.1** MDX セットアップ（@next/mdx）
- [x] **4.1.2** Shiki シンタックスハイライト設定
- [x] **4.1.3** 目次生成（カスタム実装またはmarkdown-toc）
- [x] **4.1.4** 画像最適化（next/image統合）

### 4.2 記事管理機能

- [x] **4.2.1** Markdownファイル読み込み機能
- [x] **4.2.2** フロントマター解析（タイトル、日付、タグ等）
- [x] **4.2.3** 記事スラッグ生成・管理
- [x] **4.2.4** 記事プレビュー機能
- [x] **4.2.5** 記事公開/非公開制御

### 4.3 タグ・カテゴリシステム

- [x] **4.3.1** タグ管理システム
- [x] **4.3.2** カテゴリ管理システム
- [x] **4.3.3** タグクラウド表示
- [x] **4.3.4** タグ・カテゴリ別記事フィルタリング
- [x] **4.3.5** 人気タグ表示機能

## 🔍 Phase 5: 検索・ナビゲーション機能

### 5.1 検索機能

- [x] **5.1.1** あいまい検索実装（fuse.js使用）
- [x] **5.1.2** 検索UI（タイトル・コンテンツ対象）
- [x] **5.1.3** 検索結果表示
- [x] **5.1.4** 検索結果ハイライト

### 5.2 ナビゲーション強化

- [x] **5.2.1** パンくずナビゲーション
- [x] **5.2.2** 記事間ナビゲーション（前/次記事）
- [x] **5.2.3** 人気記事ランキング表示
- [x] **5.2.4** 最新記事一覧
- [x] **5.2.5** アーカイブページ（年月別）

### 5.3 コード品質改善（Claude Codeレビュー対応）

- [x] **5.3.1** Math.random()を使った非決定的なモックデータを修正（ハッシュベース一貫性生成）
- [x] **5.3.2** 重複するフィルタリング・ソートロジックを共有ユーティリティ関数として抽出
- [x] **5.3.3** マジックナンバー（読書時間計算等）を定数として定義
- [x] **5.3.4** 記事ナビゲーションの検索アルゴリズム最適化（O(1)検索）
- [x] **5.3.5** ナビゲーションコンポーネントの包括的単体テスト追加（Breadcrumb, PostNavigation, PopularPosts, RecentPosts, ArchiveList）

## 🌐 Phase 6: 多言語・SEO・パフォーマンス

### 6.1 多言語対応

- [x] **6.1.1** next-intl セットアップ
- [x] **6.1.2** 日本語・英語リソース作成
- [x] **6.1.3** 言語切り替えUI
- [x] **6.1.4** 記事の多言語版管理
- [x] **6.1.5** SEO対応（hreflang等）

### 6.2 SEO・メタデータ最適化

- [x] **6.2.1** Next.js Metadata API 実装
- [x] **6.2.2** 動的OGP画像生成（@vercel/og）
- [x] **6.2.3** サイトマップ自動生成
- [x] **6.2.4** robots.txt 設定
- [x] **6.2.5** JSON-LD 構造化データ
- [x] **6.2.6** RSS/Atom フィード生成

### 6.3 パフォーマンス最適化

- [x] **6.3.1** 画像最適化・WebP対応
- [x] **6.3.2** フォント最適化（@next/font）
- [x] **6.3.3** バンドルサイズ最適化
- [x] **6.3.4** ISR（Incremental Static Regeneration）設定
- [x] **6.3.5** Core Web Vitals 最適化

## 💬 Phase 7: ユーザー体験・交流機能

### 7.1 コメント・ソーシャル機能

- [ ] **7.1.1** giscus コメントシステム統合
- [ ] **7.1.2** 記事シェアボタン（Twitter, Facebook, LinkedIn）
- [ ] **7.1.3** コピーリンク機能
- [ ] **7.1.4** 記事読了時間表示
- [ ] **7.1.5** 目次ナビゲーション（スクロール連動）

### 7.2 アクセス解析

- [ ] **7.2.1** Google Analytics 4 統合
- [ ] **7.2.2** プライバシー配慮（Cookie同意）
- [ ] **7.2.3** ページビュー・滞在時間計測
- [ ] **7.2.4** 人気記事ランキング自動更新

## 🛠 Phase 8: デプロイ・運用・監視

### 8.1 デプロイ・CI/CD

- [ ] **8.1.1** Vercel デプロイ設定
- [ ] **8.1.2** プレビューデプロイメント
- [ ] **8.1.3** 環境変数管理

### 8.2 監視・エラー処理

- [ ] **8.2.1** エラー監視（Sentry）
- [ ] **8.2.2** Lighthouse CI自動実行
- [ ] **8.2.3** Web Vitals監視ダッシュボード
- [ ] **8.2.4** バンドルサイズ監視
- [ ] **8.2.5** ビルド時間・サイズレポート
- [ ] **8.2.6** ランタイムパフォーマンスプロファイリング
- [ ] **8.2.7** カスタム404ページデザイン
- [ ] **8.2.8** カスタム500ページデザイン
- [ ] **8.2.9** エラーバウンダリー実装
- [ ] **8.2.10** フォールバック戦略（画像・フォント）
- [ ] **8.2.11** エラーログ収集・分析

### 8.3 ツール・ライブラリ アップグレード

- [ ] **8.3.1** Tailwind CSS v4.1.10アップグレード検証・適用（CSS-first設定、自動コンテンツ検出対応）
- [ ] **8.3.2** Storybook v9.0.10アップグレード検証・適用（バンドルサイズ48%削減、コンポーネントテスト強化）

---

## 🎯 技術スタック詳細

### 確定技術

- **Framework**: Next.js 15+ (App Router)
- **Monorepo**: Turborepo + pnpm
- **Language**: TypeScript (strict)
- **Type Utilities**: type-fest
- **Content Storage**: File-based (Markdown files)
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Text Balancing**: react-wrap-balancer
- **Deployment**: Vercel
- **Comments**: giscus (GitHub Discussions)

### 確定技術（追加）

- **Search**: fuse.js（あいまい検索）
- **State**: React Context
- **Testing**: Vitest + Playwright
- **Documentation**: Storybook + Docusaurus
- **Syntax Highlighting**: Shiki

### 検討中技術

- **Monitoring**: Sentry + Vercel Analytics

---

---

## 📋 更新履歴

- **2025/6/14**: CLAUDE.mdにコミット時のTODO更新指示を追加
- **2025/6/14**: pnpm catalog機能とStorybook v9マイグレーションのTODOを追加
- **2025/6/14**: ESLint設定厳密化のTODOを追加
- **2025/6/16**: Tailwind CSS v4・Storybook v9アップグレードタスクを追加

### 最終更新: 2025/7/18

#### Phase 5 検索・ナビゲーション機能 - 完了

- fuse.jsを使用したあいまい検索機能実装
- 検索UI・結果表示・ハイライト機能完成
- Markdownファイルからモックデータへの完全移行
- タグ・カテゴリシステム本格運用開始
- ナビゲーション強化（パンくず、記事間移動、人気・最新記事、アーカイブ）完成

#### コード品質改善（Claude Codeレビュー対応） - 完了

- Math.random()非決定的データをハッシュベース一貫性生成に修正
- 重複ロジックを共有ユーティリティ関数として抽出（apps/web/lib/article-utils.ts）
- マジックナンバー定数化（読書時間計算500文字/分、デフォルト作者名等）
- 記事ナビゲーション検索アルゴリズム最適化（findIndex→Map O(1)検索）
- ナビゲーションコンポーネント包括的テストスイート追加（アクセシビリティテスト含む）
- 全体品質向上：リント・ビルド・型チェック・テスト全て成功

#### Phase 6.1 多言語対応 - 完了

- next-intlライブラリを使用した多言語対応基盤構築
- 日本語・英語の翻訳リソースファイル作成
- 言語切り替えUIコンポーネント実装（LanguageSwitcher）
- 記事データの多言語対応（locale属性追加・ロケール別記事取得関数）
- SEO対応（hreflang、Open Graph、canonical URL）
- App Router [locale] 構造への移行完了

#### Phase 6.2 SEO・メタデータ最適化 - 完了

- Next.js Metadata API実装（多言語対応、動的メタデータ生成）
- @vercel/ogを使用した動的OGP画像生成（ターミナル風デザイン）
- サイトマップ自動生成（多言語・記事・タグ・カテゴリ対応）
- robots.txt設定（SEOクローラー最適化）
- JSON-LD構造化データ実装（記事・パンくず・WebSite）
- RSS/Atomフィード生成（最新20記事）
- metadata-utilsユーティリティ関数実装（OGP画像URL生成・メタデータ統合管理）
- 各ページでのSEOメタデータ強化

#### Phase 6.3 パフォーマンス最適化 - 完了

- 画像最適化・WebP対応強化（Next.js Image設定、AVIF/WebP形式、キャッシュ最適化）
- フォント最適化強化（@next/font、必要ウェイト指定、フォールバック調整）
- バンドルサイズ最適化（@next/bundle-analyzer導入、webpack設定、コード分割）
- ISR（Incremental Static Regeneration）設定（記事ページ1時間、一覧ページ30分）
- Core Web Vitals最適化（web-vitalsライブラリ、メトリクス収集、パフォーマンス監視）
- next.config.js包括的最適化（コンソール削除、ヘッダー最適化、React Strict Mode）
