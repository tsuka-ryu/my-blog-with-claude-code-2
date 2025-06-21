# MCP UI Fetcher Server

MCPサーバーで`@packages/ui/`ディレクトリの構造とファイルを取得するツールです。

## 機能

### `fetch_ui_structure`

`@packages/ui/`ディレクトリの構造をJSON形式で取得します。

**パラメータ:**

- `includeNodeModules` (boolean, optional): node_modulesを含めるかどうか (デフォルト: false)
- `maxDepth` (number, optional): 探索する最大深度 (デフォルト: 5)

### `read_ui_file`

`@packages/ui/`内の特定のファイルを読み取ります。

**パラメータ:**

- `filePath` (string, required): `@packages/ui/`からの相対パス

## インストール

```bash
cd tools/mcp-ui-fetcher
pnpm install
pnpm build
```

## 使用方法

### Claude Desktop設定

`~/Library/Application Support/Claude/claude_desktop_config.json`に以下を追加:

```json
{
  "mcpServers": {
    "ui-fetcher": {
      "command": "node",
      "args": ["/path/to/my-blog-with-claude-code/tools/mcp-ui-fetcher/dist/index.js"]
    }
  }
}
```

### 開発時

```bash
# TypeScriptのウォッチモード
pnpm dev

# ビルド
pnpm build

# 実行
pnpm start
```

## セキュリティ

- ファイル読み取りは`@packages/ui/`ディレクトリ内に制限されています
- ディレクトリトラバーサル攻撃を防ぐためのパスチェックが実装されています
