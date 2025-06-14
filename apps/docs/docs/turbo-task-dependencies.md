# TurboRepo タスク依存関係と循環問題

## 概要

TurboRepoでタスクの依存関係を設定する際に発生する循環（デッドロック）問題と解決策について。

## 問題のあるパターン

### 永続タスク間の依存関係

```json
// ❌ 問題のある設定
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["storybook"]
    },
    "storybook": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 何が問題か

1. **`dev`タスク**が`storybook`の完了を待つ
2. **`storybook`タスク**は`persistent: true`で終了しない
3. 結果として`dev`が永久に開始されない（デッドロック）

## 解決策

### 1. 並行実行（--parallel）

```json
// package.json
{
  "scripts": {
    "dev": "turbo run dev storybook --parallel"
  }
}

// turbo.json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "storybook": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 2. 実行結果

- **Next.js** (port 3000)
- **Docusaurus** (port 4000)  
- **Storybook** (port 6006)

すべてが並行起動される。

## 重要なポイント

- **`persistent: true`なタスク同士は`dependsOn`で依存させない**
- **並行実行が必要な場合は`--parallel`オプションを使用**
- **依存関係は完了可能なタスク間でのみ設定**

## 参考

- [TurboRepo - Running Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [TurboRepo - Task Dependencies](https://turbo.build/repo/docs/core-concepts/monorepos/task-dependencies)