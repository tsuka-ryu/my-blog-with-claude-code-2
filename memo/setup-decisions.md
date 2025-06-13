# セットアップ決定事項メモ

## 1.1.1 pnpm インストール・設定

### 決定内容
- pnpm 9.6.0 が既にインストール済みであることを確認
- `pnpm init` でプロジェクトを初期化
- package.json を作成

### 意図・理由
- モノレポ管理に適したパッケージマネージャーとして pnpm を選択
- npm/yarn より高速でディスク使用量が少ない
- シンボリックリンクによる効率的な依存関係管理

### 実行内容
```bash
pnpm --version  # 9.6.0 確認
pnpm init       # package.json 初期化
```

## 1.1.2 Turborepo モノレポ初期化

### 決定内容
- turbo 2.5.4 をdevDependenciesとしてインストール
- turbo.json 設定ファイル作成
- pnpm-workspace.yaml 作成

### 意図・理由
- モノレポ構成でのビルド・タスク管理を効率化
- 依存関係を考慮した並列実行とキャッシュ機能
- Next.js プロジェクトに最適化された設定

### 設定内容

#### turbo.json
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

#### pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "packages/*"  
  - "tools/*"
```

### 設定の意図
- **build**: 依存パッケージのビルド後に実行、Next.jsの出力を指定
- **lint**: 依存パッケージのlint後に実行
- **dev**: 開発サーバーはキャッシュ無効・永続実行
- **workspace**: TODO.mdで定義された構造に合わせたパッケージ配置

## 1.1.7 .gitignore と .gitattributes 設定

### 決定内容
- .gitignore ファイル作成（Node.js/Next.js/モノレポ対応）
- .gitattributes ファイル作成（改行コード・言語設定）

### 意図・理由
- 不要なファイルのコミット防止
- 環境依存ファイル（.env, .DS_Store等）の除外
- ビルド成果物・キャッシュファイルの除外
- 改行コードの統一（LF）とバイナリファイルの適切な処理

### 設定内容

#### .gitignore の主要除外項目
```
# Dependencies
node_modules/
.pnpm-store/

# Production builds  
.next/
out/
dist/
build/

# Environment variables
.env*
!.env.example

# Turbo
.turbo/

# Testing
.playwright/
test-results/
```

#### .gitattributes の設定意図
- **改行コード統一**: テキストファイルをLFに統一
- **バイナリファイル指定**: 画像・フォントファイルの適切な処理
- **言語検出**: .mdxをMarkdownとして認識、CSSをvendoredから除外