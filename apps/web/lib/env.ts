import { z } from 'zod';

/**
 * 環境変数のスキーマ定義
 */
const envSchema = z.object({
  // Google Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),

  // Google Analytics Data API (サーバーサイド)
  GA_PROPERTY_ID: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),

  // サイト設定
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('https://localhost:3000'),
});

/**
 * 環境変数の型定義
 */
export type Env = z.infer<typeof envSchema>;

/**
 * 環境変数を検証して型安全にアクセスできるオブジェクトを返す
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse({
    // クライアントサイド環境変数
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

    // サーバーサイド環境変数
    GA_PROPERTY_ID: process.env.GA_PROPERTY_ID,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  if (!parsed.success) {
    console.warn('⚠️ Missing optional environment variables:', parsed.error.flatten().fieldErrors);
    // エラーをスローせず、デフォルト値を使用
    return envSchema.parse({});
  }

  return parsed.data;
}

/**
 * 型安全な環境変数オブジェクト
 */
export const env = validateEnv();

/**
 * Google Analyticsが有効かどうかを判定
 */
export const isGoogleAnalyticsEnabled = Boolean(env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

/**
 * Google Analytics Data APIが有効かどうかを判定
 */
export const isGoogleAnalyticsDataApiEnabled = Boolean(
  env.GA_PROPERTY_ID && env.GOOGLE_APPLICATION_CREDENTIALS
);
