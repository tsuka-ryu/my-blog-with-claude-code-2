import type { Metric } from 'web-vitals';

export function reportWebVitals(metric: Metric) {
  // 開発環境ではコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 Web Vitals - ${metric.name}:`, {
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
      rating: metric.rating,
    });
  }

  // プロダクションでは分析サービスに送信する（例：Google Analytics）
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4の例
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // または他の分析サービス（Vercel Analytics, Sentry, etc.）に送信
    // sendToAnalytics(metric);
  }
}

// Web Vitalsの閾値定義
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint
} as const;

export type WebVitalMetric = keyof typeof WEB_VITALS_THRESHOLDS;

export function getMetricRating(
  metric: WebVitalMetric,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metric];
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}
