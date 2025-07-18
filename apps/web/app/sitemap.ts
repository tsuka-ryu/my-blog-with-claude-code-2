import type { MetadataRoute } from 'next';

import { getPublishedArticles } from '@/lib/articles';
import { locales } from '@/lib/i18n-config';
import { SITE_CONFIG } from '@/lib/metadata-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getPublishedArticles();

  // 基本ページのサイトマップエントリ
  const basePages = [
    {
      url: SITE_CONFIG.domain,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.domain}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.domain}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_CONFIG.domain}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_CONFIG.domain}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  // 多言語版のベースページ
  const localizedBasePages = locales.flatMap(locale =>
    locale === 'ja'
      ? []
      : basePages.map(page => ({
          ...page,
          url:
            page.url === SITE_CONFIG.domain
              ? `${SITE_CONFIG.domain}/${locale}`
              : `${SITE_CONFIG.domain}/${locale}${page.url.replace(SITE_CONFIG.domain, '')}`,
        }))
  );

  // 記事ページのサイトマップエントリ
  const articlePages = articles.flatMap(article =>
    locales.map(locale => ({
      url:
        locale === 'ja'
          ? `${SITE_CONFIG.domain}/posts/${article.slug}`
          : `${SITE_CONFIG.domain}/${locale}/posts/${article.slug}`,
      lastModified: new Date(article.frontMatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // タグページのサイトマップエントリ
  const allTags = [...new Set(articles.flatMap(article => article.frontMatter.tags || []))];
  const tagPages = allTags.flatMap(tag =>
    locales.map(locale => ({
      url:
        locale === 'ja'
          ? `${SITE_CONFIG.domain}/tags/${tag.toLowerCase()}`
          : `${SITE_CONFIG.domain}/${locale}/tags/${tag.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  );

  // カテゴリページのサイトマップエントリ
  const allCategories = [
    ...new Set(articles.map(article => article.frontMatter.category).filter(Boolean)),
  ] as string[];
  const categoryPages = allCategories.flatMap(category =>
    locales.map(locale => ({
      url:
        locale === 'ja'
          ? `${SITE_CONFIG.domain}/categories/${category.toLowerCase()}`
          : `${SITE_CONFIG.domain}/${locale}/categories/${category.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))
  );

  return [...basePages, ...localizedBasePages, ...articlePages, ...tagPages, ...categoryPages];
}
