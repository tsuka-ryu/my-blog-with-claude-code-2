# Feature Implementation Command

## Name

feat-impl

## Description

新機能の実装をブランチ作成からPR作成まで一連の流れで実行します

## Prompt

$ARGUMENTS で指定された機能を実装してください。以下の手順で進めてください：

手順:

1. 機能に適した名前でfeatureブランチを作成
2. 指定された機能を実装
3. 必要に応じてテストを追加
4. playwright MCPで動作確認
5. コミットメッセージに日本語で変更内容を記述
6. リモートにpushしてPRを作成

実装前にTODO.mdを確認し、関連するタスクがあれば完了マークを付けてください。
