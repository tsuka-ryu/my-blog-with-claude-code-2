import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n.js');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    // 画像最適化の設定
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最適化の詳細設定
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30日
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // バンドルサイズ最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // styled-componentsサポート（将来的な拡張性のため）
    styledComponents: true,
  },
  // パフォーマンス最適化設定
  poweredByHeader: false, // X-Powered-Byヘッダーを削除
  reactStrictMode: true, // React Strict Modeでパフォーマンスを向上
  // 実験的機能: 画像最適化とバンドル最適化
  experimental: {
    optimizePackageImports: ['lucide-react', 'fuse.js', '@mdx-js/react'],
  },
  // Turbopack設定（移行済み）
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // webpack設定で更なる最適化
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // プロダクションビルドでの最適化
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

const withMDX = createMDX({
  options: {
    // 最小限の設定でテスト
  },
});

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));
