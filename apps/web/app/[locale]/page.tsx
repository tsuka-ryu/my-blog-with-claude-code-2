import { HomeContent } from './home-content';

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
  const { getPublishedArticlesByLocale } = await import('@/lib/articles');

  const allArticles = getPublishedArticlesSortedByDate(getPublishedArticlesByLocale(locale)).slice(
    0,
    5
  );
  return allArticles.map((article, index) => transformArticleToPopularPost(article, index + 1));
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const recentPosts = await getRecentPosts(locale);
  const popularPosts = await getPopularPosts(locale);

  return <HomeContent recentPosts={recentPosts} popularPosts={popularPosts} locale={locale} />;
}
