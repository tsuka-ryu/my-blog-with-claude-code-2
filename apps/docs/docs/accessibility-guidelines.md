# アクセシビリティガイドライン

このドキュメントは、プロジェクトのUIコンポーネント作成時に考慮すべきアクセシビリティの観点を整理したガイドラインです。

## 目的

- すべてのユーザーが技術ブログのコンテンツにアクセスできる環境を提供
- WCAG 2.1 AA レベルの準拠を目指す
- 開発者がアクセシビリティを意識したコンポーネントを作成できるよう支援

## 基本原則

### 1. 知覚可能（Perceivable）

ユーザーが情報を知覚できるように提示する

### 2. 操作可能（Operable）

インターフェースコンポーネントと操作が可能である

### 3. 理解可能（Understandable）

情報とUIの操作が理解可能である

### 4. 堅牢（Robust）

支援技術を含む様々なユーザーエージェントで解釈できる

## コンポーネント別ガイドライン

### Typography（テキスト要素）

#### 必須対応項目

- **適切な見出し階層**: `h1` → `h2` → `h3` の順序を守る
- **十分なコントラスト比**: 通常テキスト 4.5:1以上、大きなテキスト 3:1以上
- **読みやすいフォントサイズ**: 最小16px（1rem）以上
- **適切な行間**: 1.5倍以上を推奨

#### 実装時のチェックポイント

```tsx
// ✅ 良い例
<Typography variant="h1" level={1}>
  メインタイトル
</Typography>
<Typography variant="h2" level={2}>
  セクションタイトル
</Typography>

// ❌ 悪い例（見出し階層の飛び越し）
<Typography variant="h1" level={1}>
  メインタイトル
</Typography>
<Typography variant="h3" level={3}>
  セクションタイトル
</Typography>
```

### Button・Link

#### 必須対応項目

- **フォーカス可能**: `tabindex` の適切な設定
- **フォーカス表示**: 明確なフォーカスインジケーター
- **キーボード操作**: Enter/Spaceキーでの実行
- **分かりやすいラベル**: アクションが明確に伝わる文言
- **適切なHTMLセマンティクス**: `button` vs `a` の使い分け

#### 実装時のチェックポイント

```tsx
// ✅ 良い例
<Button
  onClick={handleSubmit}
  aria-label="フォームを送信"
  disabled={isLoading}
>
  {isLoading ? '送信中...' : '送信'}
</Button>

// 外部リンクの場合
<Link
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="外部サイトのリンク（新しいタブで開く）"
>
  外部リンク
</Link>
```

### Navigation

#### 必須対応項目

- **ランドマーク役割**: `nav` 要素の使用
- **スキップリンク**: メインコンテンツへの直接アクセス
- **現在位置の明示**: `aria-current="page"`
- **キーボードナビゲーション**: Tab/Arrow キーでの操作

#### 実装時のチェックポイント

```tsx
// ✅ 良い例
<nav aria-label="メインナビゲーション">
  <ul>
    <li>
      <Link href="/home" aria-current={currentPath === '/home' ? 'page' : undefined}>
        ホーム
      </Link>
    </li>
  </ul>
</nav>
```

### Form要素

#### 必須対応項目

- **適切なラベル**: `label` 要素またはAria属性
- **エラーメッセージ**: `aria-describedby` での関連付け
- **必須項目の明示**: `required` 属性と視覚的表示
- **バリデーション**: リアルタイムフィードバック

#### 実装時のチェックポイント

```tsx
// ✅ 良い例
<div>
  <label htmlFor="email">
    メールアドレス <span aria-label="必須">*</span>
  </label>
  <input id="email" type="email" required aria-describedby="email-error" aria-invalid={hasError} />
  {hasError && (
    <div id="email-error" role="alert">
      有効なメールアドレスを入力してください
    </div>
  )}
</div>
```

### Modal・Dialog

#### 必須対応項目

- **フォーカス管理**: 開閉時の適切なフォーカス移動
- **キーボードトラップ**: Modal内でのフォーカス循環
- **Escapeキー**: Modal を閉じる機能
- **背景スクロール防止**: Modal表示中の背景操作制限

#### 実装時のチェックポイント

```tsx
// ✅ 良い例
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">確認</h2>
  <p id="modal-description">この操作を実行しますか？</p>
  <button onClick={handleConfirm}>はい</button>
  <button onClick={handleCancel}>いいえ</button>
</div>
```

### Loading・Error状態

#### 必須対応項目

- **ライブリージョン**: `aria-live` での状態通知
- **分かりやすいメッセージ**: 現在の状態と次のアクション
- **代替手段**: エラー時の復旧方法提示

#### 実装時のチェックポイント

```tsx
// ✅ 良い例
<div aria-live="polite" aria-label="読み込み状況">
  {isLoading && (
    <p>
      <span aria-hidden="true">⏳</span>
      データを読み込んでいます...
    </p>
  )}
  {error && (
    <div role="alert">
      <p>データの読み込みに失敗しました。</p>
      <button onClick={handleRetry}>再試行</button>
    </div>
  )}
</div>
```

## 色とコントラスト

### カラーパレット要件

- **通常テキスト**: 背景色との比率 4.5:1以上
- **大きなテキスト**: 背景色との比率 3:1以上（18pt以上または14pt太字）
- **UI要素**: フォーカス・ホバー状態で3:1以上
- **色のみに依存しない**: 重要な情報は色以外の手段でも伝達

### ターミナル風テーマでの考慮点

```css
/* ✅ 推奨カラー設定例 */
:root {
  --text-primary: #ffffff; /* 白文字 */
  --text-secondary: #a3a3a3; /* グレー文字 */
  --bg-primary: #000000; /* 黒背景 */
  --accent-green: #00ff00; /* ターミナルグリーン */
  --accent-cyan: #00ffff; /* ターミナルシアン */
  --error-red: #ff4444; /* エラーレッド */
}

/* コントラスト比確認済み */
.text-primary {
  color: var(--text-primary);
} /* 21:1 */
.text-secondary {
  color: var(--text-secondary);
} /* 5.74:1 */
.accent-green {
  color: var(--accent-green);
} /* 15.3:1 */
```

## テスト・検証方法

### 自動テスト

1. **axe-core**: アクセシビリティルール違反の検出
2. **eslint-plugin-jsx-a11y**: React/JSX固有のアクセシビリティチェック
3. **markuplint**: HTML品質とアクセシビリティの検証

### 手動テスト

1. **キーボードナビゲーション**: Tabキーのみでの操作確認
2. **スクリーンリーダー**: NVDA/JAWSでの読み上げ確認
3. **カラーコントラスト**: WebAIMツールでの比率測定
4. **拡大表示**: 200%拡大での表示確認

### チェックリスト

開発時に以下を確認：

#### 基本項目

- [ ] 適切なHTMLセマンティクスを使用している
- [ ] すべてのインタラクティブ要素がキーボードでアクセス可能
- [ ] フォーカス状態が視覚的に明確
- [ ] 画像にalt属性が設定されている
- [ ] フォーム要素に適切なラベルが関連付けられている

#### 色・コントラスト

- [ ] 十分なカラーコントラスト比を確保
- [ ] 色のみに依存した情報伝達をしていない
- [ ] ダークモード対応で読みやすさを維持

#### 動的コンテンツ

- [ ] 状態変化がスクリーンリーダーに伝わる
- [ ] Loading状態が適切に通知される
- [ ] エラーメッセージがaria-liveで通知される

## 参考資料

### 関連規格・ガイドライン

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [JIS X 8341-3:2016](https://www.jisc.go.jp/app/jis/general/GnrJISNumberNameSearchList?show&jisStdNo=X8341-3)
- [MDN Accessibility](https://developer.mozilla.org/ja/docs/Web/Accessibility)

### ツール・リソース

- [axe DevTools](https://www.deque.com/axe/devtools/) - ブラウザ拡張
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - コントラスト比計算
- [WAVE](https://wave.webaim.org/) - Webアクセシビリティ評価ツール

---

**最終更新**: 2025/6/22  
**次回レビュー予定**: フェーズ3開始時（統合テスト・品質保証段階）
