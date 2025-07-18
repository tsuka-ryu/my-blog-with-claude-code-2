import type { Metadata } from 'next';

interface BaseMetadataOptions {
  title: string;
  description: string;
  locale?: string;
  url?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
}

interface ArticleMetadataOptions extends BaseMetadataOptions {
  type: 'article';
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
  category?: string;
}

type MetadataOptions = BaseMetadataOptions | ArticleMetadataOptions;

const SITE_CONFIG = {
  name: '技術ブログ',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
  defaultDescription: 'プログラミング・開発ツール・技術トレンドについての技術ブログ',
  twitter: '@your_twitter_handle', // 必要に応じて設定
} as const;

export function generateOGImageUrl(options: {
  title: string;
  description?: string;
  author?: string;
  tags?: string[];
}): string {
  const params = new URLSearchParams({
    title: options.title,
    ...(options.description && { description: options.description }),
    ...(options.author && { author: options.author }),
    ...(options.tags?.length && { tags: options.tags.join(', ') }),
  });

  return `${SITE_CONFIG.domain}/api/og?${params.toString()}`;
}

export function generateMetadata(options: MetadataOptions): Metadata {
  const { title, description, locale = 'ja', url, imageUrl, type = 'website' } = options;

  const fullTitle = title === SITE_CONFIG.name ? title : `${title} - ${SITE_CONFIG.name}`;
  const canonicalUrl = url ? `${SITE_CONFIG.domain}${url}` : SITE_CONFIG.domain;
  const ogImageUrl = imageUrl || generateOGImageUrl({ title, description });

  const baseMetadata: Metadata = {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ja: locale === 'ja' ? canonicalUrl : canonicalUrl.replace('/en', ''),
        en: locale === 'en' ? canonicalUrl : `${canonicalUrl}/en`,
        'x-default': locale === 'ja' ? canonicalUrl : canonicalUrl.replace('/en', ''),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: locale === 'ja' ? ['en_US'] : ['ja_JP'],
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
      ...(SITE_CONFIG.twitter && { creator: SITE_CONFIG.twitter }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // 記事の場合は追加のメタデータを設定
  if (type === 'article') {
    const articleOptions = options as ArticleMetadataOptions;

    baseMetadata.openGraph = {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: articleOptions.publishedTime,
      authors: articleOptions.authors,
      tags: articleOptions.tags,
      section: articleOptions.category,
    };

    // JSON-LD構造化データ
    baseMetadata.other = {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: canonicalUrl,
        datePublished: articleOptions.publishedTime,
        author: {
          '@type': 'Person',
          name: articleOptions.authors?.[0] || 'tsuka-ryu',
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.domain,
        },
        image: ogImageUrl,
        keywords: articleOptions.tags?.join(', '),
        articleSection: articleOptions.category,
        inLanguage: locale,
      }),
    };
  } else {
    // WebSiteの構造化データ
    baseMetadata.other = {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.defaultDescription,
        url: SITE_CONFIG.domain,
        inLanguage: locale,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.domain}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    };
  }

  return baseMetadata;
}

export function generateBreadcrumbJsonLd(items: { name: string; url?: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${SITE_CONFIG.domain}${item.url}` }),
    })),
  });
}

export { SITE_CONFIG };
