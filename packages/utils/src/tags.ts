/**
 * タグ関連のユーティリティ関数
 */

import type { BlogPost, BlogPostSummary, TagInfo } from './types.js';

/**
 * タグ名からスラッグを生成
 */
export function createTagSlug(tagName: string): string {
  return tagName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/**
 * スラッグからタグ名を復元（基本的にはURLDecodeするだけ）
 */
export function getTagNameFromSlug(slug: string): string {
  return decodeURIComponent(slug);
}

/**
 * 記事一覧から全タグの情報を取得
 */
export function getAllTags(posts: BlogPost[] | BlogPostSummary[]): TagInfo[] {
  const tagCountMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCountMap.entries())
    .map(([name, count]) => ({
      name,
      slug: createTagSlug(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 特定のタグを持つ記事をフィルタリング
 */
export function getPostsByTag<T extends BlogPost | BlogPostSummary>(
  posts: T[],
  tagSlug: string,
): T[] {
  const tagName = getTagNameFromSlug(tagSlug);
  return posts.filter((post) =>
    post.tags.some((tag) => createTagSlug(tag) === tagSlug || tag === tagName),
  );
}

/**
 * タグの出現頻度でソート
 */
export function sortTagsByFrequency(tags: TagInfo[]): TagInfo[] {
  return [...tags].sort((a, b) => b.count - a.count);
}

/**
 * タグを名前順でソート
 */
export function sortTagsByName(tags: TagInfo[]): TagInfo[] {
  return [...tags].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
}

/**
 * 人気のタグを取得（上位N個）
 */
export function getPopularTags(tags: TagInfo[], limit: number = 10): TagInfo[] {
  return sortTagsByFrequency(tags).slice(0, limit);
}