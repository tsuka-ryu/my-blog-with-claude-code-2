import { NextResponse } from 'next/server';

import { getPublishedArticlesSortedByDate } from '@/lib/article-utils';
import { getPublishedArticles } from '@/lib/articles';
import { SITE_CONFIG } from '@/lib/metadata-utils';

export async function GET() {
  const articles = getPublishedArticlesSortedByDate(getPublishedArticles()).slice(0, 20); // 最新20記事

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_CONFIG.name}</title>
    <description>${SITE_CONFIG.defaultDescription}</description>
    <link>${SITE_CONFIG.domain}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.domain}/feed.xml" rel="self" type="application/rss+xml" />
    <generator>Next.js</generator>
    ${articles
      .map(
        article => `
    <item>
      <title><![CDATA[${article.frontMatter.title}]]></title>
      <description><![CDATA[${article.frontMatter.description || article.excerpt}]]></description>
      <link>${SITE_CONFIG.domain}/posts/${article.slug}</link>
      <guid>${SITE_CONFIG.domain}/posts/${article.slug}</guid>
      <pubDate>${new Date(article.frontMatter.date).toUTCString()}</pubDate>
      <author>${article.frontMatter.author || 'tsuka-ryu'}</author>
      ${article.frontMatter.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
      <content:encoded><![CDATA[${article.excerpt}]]></content:encoded>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
