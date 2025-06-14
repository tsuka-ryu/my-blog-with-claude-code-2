---
slug: react19-docusaurus-type-issue
title: React 19とDocusaurusの型定義互換性問題
authors: tsuka-ryu
tags: [react, docusaurus, typescript, bug]
---

## 問題概要

Renovateによる依存関係更新後、DocusaurusのLinkコンポーネントでTypeScriptの型エラーが発生しました。

## エラー内容

```
'Link' を JSX コンポーネントとして使用することはできません。
  その型 '(props: Props) => ReactNode' は有効な JSX 要素ではありません。
    型 'ReactNode' を型 'ReactNode | Promise<ReactNode>' に割り当てることはできません。
```

## 原因

React 19の型定義では、コンポーネントの戻り値として`Promise<ReactNode>`も許可されるようになりましたが、DocusaurusのLinkコンポーネントの型定義がまだこの変更に対応していないためです。

## 一時的な対処法

`@ts-expect-error`コメントを使用して型エラーを無視しています：

```tsx
{
  /* TODO: React 19とDocusaurusの型定義の互換性問題を修正する */
}
{
  /* @ts-expect-error: DocusaurusのLinkコンポーネントの型互換性問題 */
}
<Link className='button button--secondary button--lg' to='/docs/TODO'>
  プロジェクトTODO 📋
</Link>;
```

## 今後の対応

- Docusaurusの型定義更新を待つ
- または、React/TypeScriptのバージョンを調整する
