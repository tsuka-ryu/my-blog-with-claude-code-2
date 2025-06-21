# Cleanup Branch Command

## Name

cleanup-branch

## Description

現在のブランチからmainに移動し、作業ブランチを削除してからmainを最新に更新します

## Prompt

現在のブランチからmainブランチに移動して、現在の作業ブランチを削除し、mainでpullして最新の状態にしてください。

手順:

1. 現在のブランチ名を確認
2. mainブランチに切り替え
3. 元の作業ブランチを削除
4. origin/mainから最新の変更をpull

実行前に現在のブランチがmain以外であることを確認し、mainブランチの場合は何もしないでください。
