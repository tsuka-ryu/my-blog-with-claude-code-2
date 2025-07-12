import type { Article } from './articles';

// 定数定義
export const CONSTANTS = {
  READING_SPEED_CHARS_PER_MINUTE: 500,
  DEFAULT_AUTHOR: 'tsuka-ryu',
  POPULAR_POSTS_VIEW_RANGE: {
    MIN: 1000,
    MAX: 10000,
  },
} as const;

/**
 * 公開済み記事をフィルタリング
 */
export function filterPublishedArticles(articles: Article[]): Article[] {
  return articles.filter(article => article.frontMatter.published !== false);
}

/**
 * 記事を日付順（新しい順）にソート
 */
export function sortArticlesByDate(articles: Article[]): Article[] {
  return articles.sort(
    (a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  );
}

/**
 * 公開済み記事を日付順で取得
 */
export function getPublishedArticlesSortedByDate(articles: Article[]): Article[] {
  return sortArticlesByDate(filterPublishedArticles(articles));
}

/**
 * 読書時間を計算（文字数ベース）
 */
export function calculateReadingTime(content: string): number {
  return Math.ceil(content.length / CONSTANTS.READING_SPEED_CHARS_PER_MINUTE);
}

/**
 * スラッグから一貫性のあるビュー数を生成（ハッシュベース）
 */
export function generateConsistentViews(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit整数に変換
  }
  const range = CONSTANTS.POPULAR_POSTS_VIEW_RANGE.MAX - CONSTANTS.POPULAR_POSTS_VIEW_RANGE.MIN;
  return Math.abs(hash % range) + CONSTANTS.POPULAR_POSTS_VIEW_RANGE.MIN;
}

/**
 * 記事データをブログポスト形式に変換
 */
export function transformArticleToPost(article: Article) {
  return {
    title: article.frontMatter.title,
    slug: article.slug,
    excerpt: article.frontMatter.description,
    date: new Date(article.frontMatter.date).toLocaleDateString('ja-JP'),
    author: article.frontMatter.author || CONSTANTS.DEFAULT_AUTHOR,
    tags: article.frontMatter.tags || [],
    readTime: calculateReadingTime(article.content),
  };
}

/**
 * 記事データを人気ポスト形式に変換
 */
export function transformArticleToPopularPost(article: Article, rank: number) {
  return {
    ...transformArticleToPost(article),
    views: generateConsistentViews(article.slug),
    rank,
  };
}

/**
 * 効率的な記事ナビゲーション検索
 * スラッグをキーとしたMapを使用して O(1) の検索を実現
 */
export function getArticleNavigation(articles: Article[], currentSlug: string) {
  // スラッグをキーとしたマップを作成（インデックス情報も含む）
  const articleMap = new Map(articles.map((article, index) => [article.slug, { article, index }]));

  const current = articleMap.get(currentSlug);
  if (!current) {
    return { previousPost: undefined, nextPost: undefined };
  }

  const { index: currentIndex } = current;

  // 前の記事（新しい→古いなので、インデックスが大きいほうが古い）
  const previousArticle = articles[currentIndex + 1];
  const previousPost = previousArticle
    ? {
        title: previousArticle.frontMatter.title,
        slug: previousArticle.slug,
        excerpt: previousArticle.frontMatter.description,
      }
    : undefined;

  // 次の記事（新しい→古いなので、インデックスが小さいほうが新しい）
  const nextArticle = articles[currentIndex - 1];
  const nextPost = nextArticle
    ? {
        title: nextArticle.frontMatter.title,
        slug: nextArticle.slug,
        excerpt: nextArticle.frontMatter.description,
      }
    : undefined;

  return { previousPost, nextPost };
}
