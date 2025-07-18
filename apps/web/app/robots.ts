import type { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/lib/metadata-utils';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/demo/', '/admin/', '/private/'],
    },
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
    host: SITE_CONFIG.domain,
  };
}
