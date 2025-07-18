import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n-config';

export default createMiddleware({
  // サポートするロケールのリスト
  locales,

  // デフォルトロケール
  defaultLocale,

  // ロケールプレフィックスの処理方法
  localePrefix: 'as-needed',

  // パスの一致を検出するための設定
  localeDetection: true,
});

export const config = {
  // middlewareを適用するパスのパターン
  matcher: [
    // 特定のファイルパスを除外
    '/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap).*)',
    // ロケールプレフィックスを含む場合
    '/',
    '/(ja|en)/:path*',
  ],
};
