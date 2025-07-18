import { NextResponse } from 'next/server';

import { getPublishedArticlesSortedByDate } from '@/lib/article-utils';
import { getPublishedArticles } from '@/lib/articles';
import { SITE_CONFIG } from '@/lib/metadata-utils';

export async function GET() {
  const articles = getPublishedArticlesSortedByDate(getPublishedArticles()).slice(0, 20); // 最新20記事

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_CONFIG.name}</title>
  <subtitle>${SITE_CONFIG.defaultDescription}</subtitle>
  <link href="${SITE_CONFIG.domain}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${SITE_CONFIG.domain}" rel="alternate" type="text/html"/>
  <id>${SITE_CONFIG.domain}</id>
  <updated>${new Date().toISOString()}</updated>
  <generator>Next.js</generator>
  <author>
    <name>tsuka-ryu</name>
    <uri>${SITE_CONFIG.domain}</uri>
  </author>
  ${articles
    .map(
      article => `
  <entry>
    <title><![CDATA[${article.frontMatter.title}]]></title>
    <link href="${SITE_CONFIG.domain}/posts/${article.slug}" rel="alternate" type="text/html"/>
    <id>${SITE_CONFIG.domain}/posts/${article.slug}</id>
    <published>${new Date(article.frontMatter.date).toISOString()}</published>
    <updated>${new Date(article.frontMatter.date).toISOString()}</updated>
    <summary><![CDATA[${article.frontMatter.description || article.excerpt}]]></summary>
    <content type="html"><![CDATA[${article.excerpt}]]></content>
    <author>
      <name>${article.frontMatter.author || 'tsuka-ryu'}</name>
    </author>
    ${article.frontMatter.tags?.map(tag => `<category term="${tag}"/>`).join('') || ''}
  </entry>`
    )
    .join('')}
</feed>`;

  return new NextResponse(atom, {
    headers: {
      'Content-Type': 'application/atom+xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
