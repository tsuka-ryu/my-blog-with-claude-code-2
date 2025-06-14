---
slug: storybook-v9-migration-investigation
title: Storybook v9マイグレーション調査結果
authors: [tsukaryu]
tags: [storybook, migration, frontend-tooling]
---

# Storybook v9マイグレーション調査結果

## 概要

Storybook v8.6.14からv9.0.9へのマイグレーションを試行した結果、現時点では安定版への移行が困難であることが判明。

## マイグレーション試行内容

### 実行コマンド
```bash
npx storybook@9 upgrade
```

### 発生した問題

1. **パッケージ依存関係の不整合**
   - `@storybook/test@^9.0.9`が存在しない
   - `@storybook/blocks@^9.0.9`が存在しない
   - 一部のアドオンパッケージがv9に対応していない

2. **バージョン確認結果**
   ```bash
   npm view storybook version
   # => 9.0.9 (安定版)
   
   npm view @storybook/addon-essentials version
   # => 8.6.14 (最新版)
   ```

### Storybook v9の主要変更点

#### パッケージ統合
- 複数のパッケージがメインの`storybook`パッケージに統合
- バンドルサイズが半分以下に削減

#### テスト機能の変更
- `@storybook/test`パッケージが廃止
- テスト機能は`storybook/test`モジュールから直接インポート
```typescript
import { expect, fn, userEvent } from 'storybook/test';
```

#### 新機能
- **Storybook Test**: Vitest + Playwright統合
- **Story Generation**: UIからのストーリー作成・編集
- **Enhanced Testing**: インタラクション、a11y、ビジュアルテスト

## 結論

- Storybook v9は安定版としてリリースされているが、エコシステム全体の対応が追いついていない
- 現段階では**v8.6.14を継続使用**が推奨
- 将来的な移行に向けて定期的な状況確認が必要

## 推奨アクション

1. 現在のv8.6.14での安定運用を継続
2. 四半期ごとにエコシステムの対応状況を確認
3. 全パッケージの対応完了後にマイグレーション実施

## 参考リンク

- [Storybook 9 Migration Guide](https://storybook.js.org/docs/migration-guide)
- [Storybook 9 Announcement](https://storybook.js.org/blog/storybook-9/)