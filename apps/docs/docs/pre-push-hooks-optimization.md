# Pre-pushフックのパフォーマンス最適化

このドキュメントは、Issue #98「pre-pushがめちゃくちゃ遅いかもしれない」の調査と解決の記録です。

## 問題の概要

pre-pushフックの実行時間が非常に長く（140秒超）、開発体験を大幅に阻害していました。

### 症状

- git pushが非常に遅い
- テストがタイムアウトして失敗することがある
- 開発者がpushを避けるようになる

## 原因調査

### 実行時間の詳細分析

改善前の各コマンドの実行時間：

| コマンド     | 実行時間                  | 問題点               |
| ------------ | ------------------------- | -------------------- |
| format-check | ~1.4秒                    | 正常                 |
| lint         | ~5.1秒                    | 許容範囲             |
| check-types  | ~6秒                      | 許容範囲             |
| **test**     | **120秒超でタイムアウト** | 🚨 重大な問題        |
| build        | ~11.6秒                   | pre-pushには重すぎる |

### 根本原因

1. **ブラウザテストの重さ**: webアプリでWebDriverIOを使ったブラウザテストが実行されていた
2. **順次実行**: `parallel: false`設定により、全コマンドが順次実行されていた
3. **不要なbuild**: pre-pushでbuildが実行されていた（CI/CDで実行すべき）

## 解決策

### 1. テスト環境の最適化

**変更前（vitest.config.ts）:**

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: 'webdriverio',
      name: 'chrome',
      headless: true,
    },
    // ...
  },
});
```

**変更後:**

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // 🎯 ブラウザ → jsdom
    include: ['__tests__/**/*.test.{ts,tsx}'],
    exclude: ['__tests__/api/**/*'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**効果**: テスト実行時間が120秒超 → 6.8秒（**95%短縮**）

### 2. ブラウザテストの分離

新しく`vitest.config.browser.ts`を作成し、ブラウザテストを分離：

```typescript
// vitest.config.browser.ts
export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      provider: 'webdriverio',
      name: 'chrome',
      headless: true,
    },
    // ... 元の設定
  },
});
```

**npm scripts更新:**

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:browser": "vitest --config vitest.config.browser.ts",
  "test:browser:run": "vitest run --config vitest.config.browser.ts"
}
```

### 3. Lefthookの並列実行化

**変更前（lefthook.yml）:**

```yaml
pre-push:
  parallel: false # 🐌 順次実行
  commands:
    # ...
    build: # 🚨 不要なbuild
      run: pnpm turbo build
      # ...
```

**変更後:**

```yaml
pre-push:
  parallel: true # ⚡️ 並列実行
  commands:
    format-check:
      run: pnpm run format:check
      # ...
    lint:
      run: pnpm turbo lint
      # ...
    check-types:
      run: pnpm turbo check-types
      # ...
    test:
      run: pnpm turbo test
      # ...
    # build削除 - CI/CDで実行

# 出力フォーマット設定
output:
  - execution
```

## 結果

### パフォーマンス改善

| 項目           | 改善前      | 改善後    | 短縮率  |
| -------------- | ----------- | --------- | ------- |
| **総実行時間** | **140秒超** | **8.5秒** | **94%** |
| lint           | 5.1秒       | 153ms     | 98%     |
| check-types    | 6秒         | 151ms     | 98%     |
| test           | 120秒超     | 6.8秒     | 95%     |
| format-check   | 1.4秒       | 1.3秒     | 7%      |

### TurboRepoキャッシュの効果

並列実行とTurboRepoキャッシュの組み合わせで、2回目以降の実行はさらに高速化：

- lint: 153ms（キャッシュヒット）
- check-types: 151ms（キャッシュヒット）

## 学習ポイント

### 1. テスト環境の選択

**jsdom vs ブラウザテスト:**

- **jsdom**: 高速、軽量、pre-pushに適している
- **ブラウザテスト**: より現実的だが重い、CI/CDや手動実行向け

### 2. pre-pushフックの設計原則

**含めるべきもの:**

- 高速なチェック（lint, typecheck, format）
- 軽量なテスト（unit tests）

**含めるべきでないもの:**

- 重いビルド処理
- E2Eテスト
- ブラウザテスト

### 3. 並列実行の重要性

モノレポでは複数のパッケージがあるため、並列実行により：

- TurboRepoキャッシュの恩恵を最大化
- 実行時間を大幅短縮
- 開発体験を向上

### 4. Lefthookの最適化

```yaml
# 推奨設定
pre-push:
  parallel: true # 並列実行
  commands:
    # 高速なチェックのみ

# 出力制御
output:
  - execution # 実行情報のみ表示

# CI環境での無効化
skip_in_ci: true
```

## 運用上の注意点

### 1. ブラウザテストの実行

通常の開発では：

```bash
# 高速テスト（pre-pushで実行）
pnpm test

# ブラウザテスト（手動実行）
pnpm test:browser
```

### 2. CI/CDでの対応

- ビルド処理はCI/CDで実行
- ブラウザテストもCI/CDで実行
- pre-pushは開発者の体験を重視

### 3. 段階的な最適化

1. **まず並列実行を有効化**
2. **重いコマンドを特定・分離**
3. **キャッシュ戦略を最適化**

## 今後の改善案

### 1. 部分テストの実装

変更されたファイルに関連するテストのみ実行：

```bash
# 例：変更されたパッケージのみテスト
pnpm turbo test --filter=...[HEAD^1]
```

### 2. より細かいキャッシュ戦略

- ファイル変更に基づくキャッシュ
- 依存関係の変更検出

### 3. 条件付き実行

```yaml
# 例：TypeScriptファイル変更時のみ型チェック
check-types:
  run: pnpm turbo check-types
  files: git diff --name-only HEAD | grep -E '\.(ts|tsx)$'
```

## まとめ

pre-pushフックの最適化により：

- **開発体験が劇的に向上**（8.5秒で完了）
- **開発者がpushを躊躇しなくなる**
- **CI/CDとの役割分担が明確化**

重要なのは、pre-pushフックは「高速なガードレール」として機能し、重い処理はCI/CDに委ねることです。

---

**関連リンク:**

- [Issue #98](https://github.com/tsuka-ryu/my-blog-with-claude-code-2/issues/98)
- [PR #110](https://github.com/tsuka-ryu/my-blog-with-claude-code-2/pull/110)
- [Lefthook Documentation](https://lefthook.dev/)
- [TurboRepo Documentation](https://turbo.build/repo/docs)
