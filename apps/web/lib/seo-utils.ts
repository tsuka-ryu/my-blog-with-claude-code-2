import { locales, defaultLocale } from './i18n-config';

export interface HreflangLink {
  href: string;
  hreflang: string;
}

/**
 * hreflang用のURLを生成する
 */
export function generateHreflangLinks(pathname: string): HreflangLink[] {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const links: HreflangLink[] = [];

  // 各ロケールのリンクを生成
  locales.forEach(locale => {
    const localizedPath = locale === defaultLocale ? pathname : `/${locale}${pathname}`;
    links.push({
      href: `${baseUrl}${localizedPath}`,
      hreflang: locale,
    });
  });

  // x-default（デフォルト言語）のリンクを追加
  const defaultPath = pathname;
  links.push({
    href: `${baseUrl}${defaultPath}`,
    hreflang: 'x-default',
  });

  return links;
}

/**
 * Open Graph用のロケール情報を生成する
 */
export function generateOpenGraphLocales(currentLocale: string) {
  return {
    locale: currentLocale,
    alternateLocale: locales.filter(locale => locale !== currentLocale),
  };
}

/**
 * 正規URLを生成する
 */
export function generateCanonicalUrl(pathname: string, locale: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const localizedPath = locale === defaultLocale ? pathname : `/${locale}${pathname}`;
  return `${baseUrl}${localizedPath}`;
}
