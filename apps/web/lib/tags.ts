import { getAllTags, getArticlesByTag, getPublishedArticles } from './articles';

export interface TagData {
  name: string;
  count: number;
  articles: Array<{
    slug: string;
    title: string;
    date: string;
  }>;
}

export interface TagStatistics {
  totalTags: number;
  averageTagsPerArticle: number;
  mostUsedTags: TagData[];
  leastUsedTags: TagData[];
}

/**
 * 全てのタグとその使用頻度を取得
 */
export function getTagsWithCount(): TagData[] {
  const allTags = getAllTags();

  return allTags
    .map(tag => {
      const articles = getArticlesByTag(tag);
      return {
        name: tag,
        count: articles.length,
        articles: articles.map(article => ({
          slug: article.slug,
          title: article.frontMatter.title,
          date: article.frontMatter.date,
        })),
      };
    })
    .sort((a, b) => b.count - a.count);
}

/**
 * 人気タグ（使用頻度順）を取得
 */
export function getPopularTags(limit = 10): TagData[] {
  return getTagsWithCount().slice(0, limit);
}

/**
 * タグクラウド用のタグデータを取得（重み付きサイズ計算）
 */
export function getTagCloudData(): Array<
  TagData & { weight: number; size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' }
> {
  const tagsWithCount = getTagsWithCount();

  if (tagsWithCount.length === 0) {
    return [];
  }

  const maxCount = Math.max(...tagsWithCount.map(tag => tag.count));
  const minCount = Math.min(...tagsWithCount.map(tag => tag.count));

  return tagsWithCount.map(tag => {
    // 使用頻度に基づいて重みを計算（0-1の範囲）
    const weight = maxCount === minCount ? 1 : (tag.count - minCount) / (maxCount - minCount);

    // 重みに基づいてサイズクラスを決定
    let size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
    if (weight >= 0.8) size = '2xl';
    else if (weight >= 0.6) size = 'xl';
    else if (weight >= 0.4) size = 'lg';
    else if (weight >= 0.2) size = 'base';
    else if (weight >= 0.1) size = 'sm';
    else size = 'xs';

    return {
      ...tag,
      weight,
      size,
    };
  });
}

/**
 * 関連タグを取得（共通記事数に基づく）
 */
export function getRelatedTags(targetTag: string, limit = 5): string[] {
  const targetArticles = getArticlesByTag(targetTag);
  const targetArticleSlugs = new Set(targetArticles.map(article => article.slug));

  const allTags = getAllTags().filter(tag => tag !== targetTag);
  const tagRelevance = new Map<string, number>();

  allTags.forEach(tag => {
    const tagArticles = getArticlesByTag(tag);
    const commonCount = tagArticles.filter(article => targetArticleSlugs.has(article.slug)).length;

    if (commonCount > 0) {
      tagRelevance.set(tag, commonCount);
    }
  });

  return Array.from(tagRelevance.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

/**
 * タグ統計情報を取得
 */
export function getTagStatistics(): TagStatistics {
  const allTags = getTagsWithCount();
  const allArticles = getPublishedArticles();

  const totalTags = allTags.length;
  const totalTagUsage = allArticles.reduce(
    (sum, article) => sum + (article.frontMatter.tags?.length || 0),
    0
  );
  const averageTagsPerArticle = allArticles.length > 0 ? totalTagUsage / allArticles.length : 0;

  return {
    totalTags,
    averageTagsPerArticle: Math.round(averageTagsPerArticle * 100) / 100,
    mostUsedTags: allTags.slice(0, 5),
    leastUsedTags: allTags.slice(-5).reverse(),
  };
}

/**
 * タグ検索（部分一致）
 */
export function searchTags(query: string): string[] {
  if (!query.trim()) {
    return [];
  }

  const allTags = getAllTags();
  const lowercaseQuery = query.toLowerCase();

  return allTags.filter(tag => tag.toLowerCase().includes(lowercaseQuery)).sort();
}

/**
 * タグの正規化（小文字化、トリム、重複削除）
 */
export function normalizeTags(tags: string[]): string[] {
  return Array.from(
    new Set(tags.map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0))
  ).sort();
}

/**
 * タグの妥当性チェック
 */
export function validateTag(tag: string): boolean {
  if (!tag || typeof tag !== 'string') {
    return false;
  }

  const trimmedTag = tag.trim();

  // 空文字、特殊文字のチェック
  if (trimmedTag.length === 0 || trimmedTag.length > 50) {
    return false;
  }

  // 基本的な文字のみ許可（日本語、英数字、ハイフン、アンダースコア）
  const tagPattern = /^[\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF-]+$/;
  return tagPattern.test(trimmedTag);
}
