import { getAllCategories, getArticlesByCategory } from './articles';

export interface CategoryData {
  name: string;
  count: number;
  articles: Array<{
    slug: string;
    title: string;
    date: string;
  }>;
}

export interface CategoryHierarchy {
  parent: string;
  children: CategoryData[];
}

/**
 * 全てのカテゴリとその使用頻度を取得
 */
export function getCategoriesWithCount(): CategoryData[] {
  const allCategories = getAllCategories();

  return allCategories
    .map(category => {
      const articles = getArticlesByCategory(category);
      return {
        name: category,
        count: articles.length,
        articles: articles.map(article => ({
          slug: article.slug,
          title: article.frontMatter.title || 'Untitled',
          date: article.frontMatter.date || new Date().toISOString(),
        })),
      };
    })
    .sort((a, b) => b.count - a.count);
}

/**
 * 人気カテゴリ（使用頻度順）を取得
 */
export function getPopularCategories(limit = 10): CategoryData[] {
  return getCategoriesWithCount().slice(0, limit);
}

/**
 * カテゴリ階層を解析（スラッシュ区切りのパスを想定）
 */
export function getCategoryHierarchy(): CategoryHierarchy[] {
  const allCategories = getAllCategories();
  const hierarchyMap = new Map<string, CategoryData[]>();

  allCategories.forEach(category => {
    const parts = category.split('/');
    const parent = parts.length > 1 ? parts[0] || 'root' : 'root';
    const categoryName = parts.length > 1 ? parts.slice(1).join('/') : category;

    if (!hierarchyMap.has(parent)) {
      hierarchyMap.set(parent, []);
    }

    const articles = getArticlesByCategory(category);
    const parentCategories = hierarchyMap.get(parent);
    if (parentCategories) {
      parentCategories.push({
        name: categoryName,
        count: articles.length,
        articles: articles.map(article => ({
          slug: article.slug,
          title: article.frontMatter.title || 'Untitled',
          date: article.frontMatter.date || new Date().toISOString(),
        })),
      });
    }
  });

  return Array.from(hierarchyMap.entries()).map(([parent, children]) => ({
    parent,
    children: children.sort((a, b) => b.count - a.count),
  }));
}

/**
 * カテゴリツリーを取得（ネストした構造）
 */
export function getCategoryTree(): Record<string, unknown> {
  const allCategories = getAllCategories();
  const tree: Record<string, unknown> = {};

  allCategories.forEach(category => {
    const parts = category.split('/');
    let current = tree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        const fullPath = parts.slice(0, index + 1).join('/');
        const articles = getArticlesByCategory(fullPath);

        current[part] = {
          name: part,
          fullPath,
          count: articles.length,
          articles: articles.map(article => ({
            slug: article.slug,
            title: article.frontMatter.title || 'Untitled',
            date: article.frontMatter.date || new Date().toISOString(),
          })),
          children: {},
        };
      }
      const currentPart = current[part] as Record<string, unknown>;
      current = currentPart.children as Record<string, unknown>;
    });
  });

  return tree;
}

/**
 * 関連カテゴリを取得（同じ親カテゴリを持つもの）
 */
export function getRelatedCategories(targetCategory: string): string[] {
  const parts = targetCategory.split('/');

  if (parts.length === 1) {
    // ルートレベルのカテゴリの場合、他のルートレベルカテゴリを返す
    return getAllCategories()
      .filter(category => category !== targetCategory && !category.includes('/'))
      .slice(0, 5);
  }

  // 同じ親カテゴリを持つサブカテゴリを返す
  const parentPath = parts.slice(0, -1).join('/');
  return getAllCategories()
    .filter(
      category =>
        category !== targetCategory &&
        category.startsWith(parentPath + '/') &&
        category.split('/').length === parts.length
    )
    .slice(0, 5);
}

/**
 * カテゴリ検索（部分一致）
 */
export function searchCategories(query: string): string[] {
  if (!query.trim()) {
    return [];
  }

  const allCategories = getAllCategories();
  const lowercaseQuery = query.toLowerCase();

  return allCategories.filter(category => category.toLowerCase().includes(lowercaseQuery)).sort();
}

/**
 * パンくずリスト用のカテゴリパスを取得
 */
export function getCategoryBreadcrumb(category: string): Array<{ name: string; path: string }> {
  const parts = category.split('/');
  const breadcrumb: Array<{ name: string; path: string }> = [];

  parts.forEach((part, index) => {
    const path = parts.slice(0, index + 1).join('/');
    breadcrumb.push({
      name: part,
      path,
    });
  });

  return breadcrumb;
}

/**
 * カテゴリの妥当性チェック
 */
export function validateCategory(category: string): boolean {
  if (!category || typeof category !== 'string') {
    return false;
  }

  const trimmedCategory = category.trim();

  // 空文字、長すぎるカテゴリのチェック
  if (trimmedCategory.length === 0 || trimmedCategory.length > 100) {
    return false;
  }

  // スラッシュで分割された各部分をチェック
  const parts = trimmedCategory.split('/');

  for (const part of parts) {
    if (part.trim().length === 0) {
      return false; // 空のパート
    }

    // 基本的な文字のみ許可（日本語、英数字、ハイフン、アンダースコア、スペース）
    const partPattern = /^[\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\s-]+$/;
    if (!partPattern.test(part.trim())) {
      return false;
    }
  }

  return true;
}

/**
 * カテゴリの正規化
 */
export function normalizeCategory(category: string): string {
  if (!category || typeof category !== 'string') {
    return '';
  }

  return category
    .split('/')
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .join('/');
}
