import { Header, Typography, Link, PostCard } from '@repo/ui';
import { notFound } from 'next/navigation';

import { getArticlesByCategory } from '../../../../lib/articles';
import { getRelatedCategories, getCategoryBreadcrumb } from '../../../../lib/categories';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);

  const articles = getArticlesByCategory(category);
  const relatedCategories = getRelatedCategories(category);
  const breadcrumb = getCategoryBreadcrumb(category);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className='space-y-8'>
      <Header
        title={`カテゴリ: ${category}`}
        description={`${articles.length}件の記事があります`}
      />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ find . -category &quot;{category}&quot; | wc -l
          </Typography>

          <Typography component='p' variant='body1' color='muted'>
            {articles.length}件の記事が見つかりました
          </Typography>

          {breadcrumb.length > 1 && (
            <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
              <span>パス:</span>
              {breadcrumb.map((crumb, index) => (
                <span key={crumb.path} className='flex items-center'>
                  {index > 0 && <span className='mx-1'>/</span>}
                  <Link
                    href={`/categories/${encodeURIComponent(crumb.path)}`}
                    className='hover:text-accent transition-colors'
                  >
                    {crumb.name}
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>

        <section>
          <div className='grid gap-6 md:grid-cols-2'>
            {articles.map(article => (
              <PostCard
                key={article.slug}
                post={{
                  title: article.frontMatter.title,
                  description: article.excerpt || article.frontMatter.description || '',
                  slug: article.slug,
                  publishedAt: new Date(article.frontMatter.date),
                  tags: article.frontMatter.tags || [],
                  readingTime: article.readingTime,
                  category: article.frontMatter.category,
                }}
              />
            ))}
          </div>
        </section>

        {relatedCategories.length > 0 && (
          <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <Typography component='h3' variant='h4' color='accent'>
              $ ls ../related-categories/
            </Typography>

            <Typography component='p' variant='body2' color='muted'>
              関連カテゴリ
            </Typography>

            <div className='flex flex-wrap gap-3'>
              {relatedCategories.map(relatedCategory => (
                <Link
                  key={relatedCategory}
                  href={`/categories/${encodeURIComponent(relatedCategory)}`}
                  className='inline-flex items-center px-3 py-2 bg-accent/10 text-accent rounded-md border border-accent/20 hover:bg-accent/20 hover:border-accent/30 transition-colors text-sm'
                >
                  {relatedCategory}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ cd ../
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/categories'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              全カテゴリを見る
            </Link>
            <Link
              href='/posts'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              全記事を見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);
  const articles = getArticlesByCategory(category);

  return {
    title: `カテゴリ: ${category} - 技術ブログ`,
    description: `${category}カテゴリの記事一覧（${articles.length}件）。`,
  };
}
