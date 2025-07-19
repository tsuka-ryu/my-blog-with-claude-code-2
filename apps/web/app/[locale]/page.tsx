import { HomeContent } from './home-content';

import { getCachedPopularArticles } from '@/lib/analytics-data';
import {
  getPublishedArticlesSortedByDate,
  transformArticleToPost,
  transformArticleToPopularPost,
} from '@/lib/article-utils';
import { type Locale } from '@/lib/i18n-config';

async function getRecentPosts(locale: string) {
  const { getPublishedArticlesByLocale } = await import('@/lib/articles');

  const allArticles = getPublishedArticlesSortedByDate(getPublishedArticlesByLocale(locale)).slice(
    0,
    5
  );
  return allArticles.map(transformArticleToPost);
}

async function getPopularPosts(locale: string) {
  const { getPublishedArticlesByLocale, getArticleBySlug } = await import('@/lib/articles');

  // Google Analyticsから人気記事のスラッグを取得
  const popularArticleSlugs = await getCachedPopularArticles(5);

  // スラッグから記事データを取得
  const popularArticles = popularArticleSlugs
    .map(({ slug }) => {
      const article = getArticleBySlug(slug);
      return article && article.frontMatter.locale === locale ? article : null;
    })
    .filter(Boolean);

  // 不足分は最新記事から補完
  if (popularArticles.length < 5) {
    const allArticles = getPublishedArticlesSortedByDate(getPublishedArticlesByLocale(locale));
    const additionalArticles = allArticles
      .filter(article => !popularArticles.some(popular => popular?.slug === article.slug))
      .slice(0, 5 - popularArticles.length);
    popularArticles.push(...additionalArticles);
  }

  return popularArticles.slice(0, 5).map((article, index) => {
    if (!article) throw new Error('Article should not be null');
    return transformArticleToPopularPost(article, index + 1);
  });
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const recentPosts = await getRecentPosts(locale);
  const popularPosts = await getPopularPosts(locale);

  return <HomeContent recentPosts={recentPosts} popularPosts={popularPosts} locale={locale} />;
}
