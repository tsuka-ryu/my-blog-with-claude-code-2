import type { BlogPostSummary } from '@repo/utils';

/**
 * モック記事データ
 */
export const mockPosts: BlogPostSummary[] = [
  {
    slug: 'react-hooks-best-practices',
    title: 'React Hooksのベストプラクティス',
    description: 'React Hooksを効果的に使用するためのパターンとアンチパターンを解説します。',
    publishedAt: new Date('2024-01-15'),
    tags: ['React', 'JavaScript', 'Frontend'],
    category: 'Technology',
    readingTime: 8,
  },
  {
    slug: 'typescript-generics-guide',
    title: 'TypeScript Genericsの基礎から応用まで',
    description: 'TypeScriptのGenericsを理解して、型安全で再利用可能なコードを書こう。',
    publishedAt: new Date('2024-01-20'),
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    category: 'Technology',
    readingTime: 12,
  },
  {
    slug: 'nextjs-app-router-migration',
    title: 'Next.js App Routerへの移行体験記',
    description: 'Pages RouterからApp Routerへの移行で学んだことをまとめました。',
    publishedAt: new Date('2024-02-01'),
    tags: ['Next.js', 'React', 'Frontend'],
    category: 'Technology',
    readingTime: 10,
  },
  {
    slug: 'monorepo-with-turborepo',
    title: 'TurboRepoでモノレポ構築',
    description: 'TurboRepoを使用したモノレポの構築とその利点について。',
    publishedAt: new Date('2024-02-10'),
    tags: ['TurboRepo', 'Monorepo', 'DevOps'],
    category: 'Technology',
    readingTime: 15,
  },
  {
    slug: 'podcast-review-syntax-fm',
    title: 'Syntax.fm Podcast感想: Modern CSS',
    description: 'Syntax.fmのModern CSSエピソードを聞いた感想と学び。',
    publishedAt: new Date('2024-02-15'),
    tags: ['Podcast', 'CSS', 'Frontend'],
    category: 'Review',
    readingTime: 5,
  },
  {
    slug: 'vim-productivity-tips',
    title: 'Vimで生産性を向上させるコツ',
    description: '日常のVim使用で実践している生産性向上のテクニックを紹介。',
    publishedAt: new Date('2024-02-20'),
    tags: ['Vim', 'Productivity', 'Tools'],
    category: 'Technology',
    readingTime: 7,
  },
  {
    slug: 'career-thoughts-2024',
    title: '2024年のキャリア考察',
    description: 'エンジニアとしてのキャリアについて考えたことをまとめました。',
    publishedAt: new Date('2024-02-25'),
    tags: ['Career', 'Thoughts', 'Engineering'],
    category: 'Personal',
    readingTime: 6,
  },
];

/**
 * 記事データを取得（実際のアプリではAPIやファイルシステムから取得）
 */
export function getAllPosts(): BlogPostSummary[] {
  return mockPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/**
 * 公開された記事のみを取得
 */
export function getPublishedPosts(): BlogPostSummary[] {
  return getAllPosts();
}
