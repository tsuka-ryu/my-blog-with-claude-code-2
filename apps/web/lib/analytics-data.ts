import { isGoogleAnalyticsDataApiEnabled } from './env';

interface PopularArticle {
  slug: string;
  pageViews: number;
}

// 人気記事データを取得する関数
export async function getPopularArticles(): Promise<PopularArticle[]> {
  // Google Analytics Data APIが有効な場合
  if (isGoogleAnalyticsDataApiEnabled) {
    // TODO: Google Analytics Data APIの実装
    // const { BetaAnalyticsDataClient } = await import('@google-analytics/data');
    // const analyticsDataClient = new BetaAnalyticsDataClient();
    // const response = await analyticsDataClient.runReport({
    //   property: `properties/${env.GA_PROPERTY_ID}`,
    //   dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    //   dimensions: [{ name: 'pagePath' }],
    //   metrics: [{ name: 'screenPageViews' }],
    //   dimensionFilter: {
    //     filter: {
    //       fieldName: 'pagePath',
    //       stringFilter: {
    //         matchType: 'CONTAINS',
    //         value: '/posts/',
    //       },
    //     },
    //   },
    //   orderBys: [
    //     {
    //       metric: { metricName: 'screenPageViews' },
    //       desc: true,
    //     },
    //   ],
    //   limit: 5,
    // });

    // 実装後はここでAPIレスポンスを処理
    console.log('Google Analytics Data API is enabled but not implemented yet');
  }

  // APIが有効でない場合はモックデータを返す
  return [
    { slug: 'react-hooks-guide', pageViews: 1234 },
    { slug: 'typescript-best-practices', pageViews: 987 },
    { slug: 'nextjs-performance', pageViews: 876 },
    { slug: 'css-modern-techniques', pageViews: 765 },
    { slug: 'git-advanced-tips', pageViews: 654 },
  ];
}

// キャッシュされた人気記事データ
let cachedPopularArticles: PopularArticle[] | null = null;
let cacheExpiry: number | null = null;

// キャッシュ期間（1時間）
const CACHE_DURATION = 60 * 60 * 1000;

// キャッシュ付きで人気記事を取得
export async function getCachedPopularArticles(limit = 5): Promise<PopularArticle[]> {
  const now = Date.now();

  // キャッシュが有効な場合はキャッシュから返す
  if (cachedPopularArticles && cacheExpiry && now < cacheExpiry) {
    return cachedPopularArticles.slice(0, limit);
  }

  // 新しいデータを取得
  try {
    const articles = await getPopularArticles();
    cachedPopularArticles = articles;
    cacheExpiry = now + CACHE_DURATION;
    return articles;
  } catch (error) {
    console.error('Failed to fetch popular articles:', error);

    // エラー時は前回のキャッシュを返すか、空配列を返す
    return cachedPopularArticles?.slice(0, limit) || [];
  }
}
