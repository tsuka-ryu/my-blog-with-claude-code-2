---
slug: git-force-with-lease
title: git push --force-with-leaseで安全にforce pushする方法
authors: tsuka-ryu
tags: [git, development, best-practices]
---

開発中にコミットを修正したあと、リモートブランチにforce pushする必要が出てくることがあります。今回は`--force-with-lease`を使った安全なforce pushの方法について説明します。

<!-- truncate -->

## 状況：コミット修正が必要になった場面

今回、ColorPaletteコンポーネントの開発中に以下の状況になりました：

1. **機能実装完了** → コミット＆プッシュ
2. **ESLintエラー発覚** → インポート順序の修正が必要
3. **修正してamend** → 既にpushされたコミットを修正
4. **force pushが必要** → リモートとローカルの履歴が不一致

## `--force` vs `--force-with-lease`の違い

### 通常のforce push（危険）

```bash
git push origin feature/ui-components --force
```

**問題点**：

- リモートの状態を無視して強制上書き
- 他の人が同じブランチにpushしていても気づかない
- チーム開発では他の人の変更を消してしまう可能性

### 安全なforce push

```bash
git push origin feature/ui-components --force-with-lease
```

**メリット**：

- ローカルが最後に取得したリモートの状態と比較
- 他の人が先にpushしていた場合はpushを拒否
- 意図しない変更の上書きを防止

## 実際の使用例

今回の修正フローは以下の通りでした：

```bash
# 1. ESLintエラーを修正
# インポート順序を修正: react → type import

# 2. 前のコミットに修正を統合
git add src/color-palette.tsx
git commit --amend --no-edit

# 3. 安全なforce push
git push origin feature/ui-components --force-with-lease
```

## いつ使うべきか

### 適切な場面

- **個人開発ブランチ**での履歴修正
- **feature branch**でのコミット整理
- **pre-commit hook**でのlint修正後
- **typo修正**や**コミットメッセージ修正**

### 避けるべき場面

- **main/master branch**での使用
- **共有ブランチ**での履歴改変
- **チームメンバーが同時作業中**のブランチ

## force pushを避ける代替手段

場合によってはforce pushを避けて、新しいコミットで修正する方が安全です：

```bash
# 新しいコミットで修正（推奨）
git add .
git commit -m "fix: ESLintエラーを修正"
git push origin feature/ui-components

# vs force push（注意が必要）
git commit --amend --no-edit
git push origin feature/ui-components --force-with-lease
```

## まとめ

- `--force-with-lease`は通常の`--force`より安全
- 個人開発ブランチでは適切に使用可能
- チーム開発では慎重に判断する
- 可能であれば新しいコミットでの修正を検討する

force pushは強力なツールですが、適切に使えば開発効率を大きく向上させることができます。安全性を重視して`--force-with-lease`を活用しましょう。
