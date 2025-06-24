# MCP UI Fetcher Server

MCPサーバーで`@packages/ui/`ディレクトリの構造とファイルを取得するツールです。Claude Codeから`@packages/ui/`の内容を簡単に参照できるようになります。

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

## Claude Codeでのセットアップ

### プロジェクトスコープのMCPサーバー

プロジェクトスコープのサーバーは、プロジェクトのルートにある`.mcp.json`ファイルに保存されます。このファイルはバージョン管理にチェックインして、チームとサーバーを共有できます。

1. **前提条件**
   - このプロジェクトをローカルにクローンしていること
   - Node.jsがインストールされていること
   - pnpmがインストールされていること

2. **MCPサーバーのビルド**

   ```bash
   # プロジェクトルートで依存関係をインストール
   pnpm install

   # MCPサーバーをビルド
   cd tools/mcp-ui-fetcher
   pnpm build
   ```

3. **プロジェクトスコープのサーバーを追加**

   ```bash
   # プロジェクトルートで実行
   claude mcp add ui-fetcher -s project node tools/mcp-ui-fetcher/dist/index.js
   ```

   これにより、プロジェクトルートに以下の構造の`.mcp.json`ファイルが作成または更新されます：

   ```json
   {
     "mcpServers": {
       "ui-fetcher": {
         "command": "node",
         "args": ["tools/mcp-ui-fetcher/dist/index.js"],
         "env": {}
       }
     }
   }
   ```

4. **Claude Codeを再起動**

## 使用方法

Claude Codeで以下のようなプロンプトを使用できます：

```
MCPツールを使って@packages/ui/の構造を見せて
```

```
MCPツールでsrc/components/button.tsxの内容を読んで
```

## 開発時

```bash
# TypeScriptのウォッチモード
pnpm dev

# ビルド
pnpm build

# 実行
pnpm start
```

## トラブルシューティング

### MCPサーバーが認識されない場合

1. 設定ファイルのJSONが正しいか確認
2. ファイルパスが絶対パスになっているか確認
3. `dist/index.js`が存在するか確認（`pnpm build`を実行）
4. Claude Codeを完全に終了して再起動

### エラーが発生する場合

1. Node.jsのバージョンを確認（v18以上推奨）
2. 依存関係が正しくインストールされているか確認
3. ビルドが成功しているか確認

## セキュリティ

- ファイル読み取りは`@packages/ui/`ディレクトリ内に制限されています
- ディレクトリトラバーサル攻撃を防ぐためのパスチェックが実装されています

## 参考リンク

- [Claude Code MCP設定ドキュメント](https://docs.anthropic.com/ja/docs/claude-code/tutorials#model-context-protocol-mcp-%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)
