import { env, isGoogleAnalyticsEnabled } from './env';

// ページビューイベントを送信
export const pageview = (url: string) => {
  if (!isGoogleAnalyticsEnabled) return;

  if (typeof window !== 'undefined' && window.gtag && env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    window.gtag('config', env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// カスタムイベントを送信
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!isGoogleAnalyticsEnabled) return;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 記事閲覧時間を計測
export const trackReadingTime = (articleSlug: string, timeInSeconds: number) => {
  event({
    action: 'read_article',
    category: 'engagement',
    label: articleSlug,
    value: Math.round(timeInSeconds),
  });
};

// 検索イベントを送信
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
};

// ソーシャルシェアイベントを送信
export const trackShare = (network: string, articleSlug: string) => {
  event({
    action: 'share',
    category: 'social',
    label: `${network}_${articleSlug}`,
  });
};

// TypeScript用のgtag型定義
declare global {
  interface Window {
    gtag: (command: 'config' | 'event', targetId: string, config?: Record<string, unknown>) => void;
  }
}
