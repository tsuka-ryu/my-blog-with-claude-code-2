/**
 * 共通型定義
 */

import type { Simplify } from 'type-fest';

/**
 * ブログ記事の基本情報
 */
export interface BlogPost {
  /** 記事スラッグ */
  slug: string;
  /** 記事タイトル */
  title: string;
  /** 記事の説明 */
  description?: string;
  /** 公開日 */
  publishedAt: Date;
  /** 更新日 */
  updatedAt?: Date;
  /** タグ一覧 */
  tags: string[];
  /** カテゴリ */
  category?: string;
  /** 公開状態 */
  published: boolean;
  /** 記事本文 */
  content: string;
  /** 読了時間（分） */
  readingTime?: number;
}

/**
 * フロントマターの型定義
 */
export interface FrontMatter {
  title: string;
  description?: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  published?: boolean;
}

/**
 * 簡略化されたブログ記事型（一覧表示用）
 */
export type BlogPostSummary = Simplify<
  Pick<
    BlogPost,
    'slug' | 'title' | 'description' | 'publishedAt' | 'tags' | 'category' | 'readingTime'
  >
>;

/**
 * 検索結果の型定義
 */
export interface SearchResult {
  /** 記事スラッグ */
  slug: string;
  /** 記事タイトル */
  title: string;
  /** 記事の説明 */
  description?: string;
  /** マッチした内容のハイライト */
  highlights: string[];
  /** 検索スコア */
  score: number;
}

/**
 * タグ情報の型定義
 */
export interface TagInfo {
  /** タグ名 */
  name: string;
  /** タグのスラッグ */
  slug: string;
  /** 記事数 */
  count: number;
  /** タグの説明 */
  description?: string;
}

/**
 * タグページのパラメータ型
 */
export interface TagPageParams {
  tag: string;
}
