module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 日本語のコミットメッセージを許可
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新機能
        'fix',      // バグ修正
        'docs',     // ドキュメント
        'style',    // コードスタイル
        'refactor', // リファクタリング
        'test',     // テスト
        'chore',    // その他
        'perf',     // パフォーマンス改善
        'ci',       // CI/CD
        'build',    // ビルド
        'revert'    // リバート
      ]
    ]
  }
};