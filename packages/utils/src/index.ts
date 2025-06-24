/**
 * @my-blog/utils
 *
 * 技術ブログプロジェクト用の共有ユーティリティ関数
 */

// export * as types from './types.js'; だとtscでd.tsを生成するときに認識されない
// 型定義のエクスポート
export type {
  BlogPost,
  FrontMatter,
  BlogPostSummary,
  SearchResult,
  TagInfo,
  TagPageParams,
} from './types.js';

// ユーティリティ関数のエクスポート
export { cn } from './cn.js';
export {
  createTagSlug,
  getTagNameFromSlug,
  getAllTags,
  getPostsByTag,
  sortTagsByFrequency,
  sortTagsByName,
  getPopularTags,
} from './tags.js';

// その他のユーティリティ関数（将来実装予定）
// export * from './string';
// export * from './date';
// export * from './url';
// export * from './markdown';
