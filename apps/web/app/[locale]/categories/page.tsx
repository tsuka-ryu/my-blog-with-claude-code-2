import { Header, Typography, Link } from '@repo/ui';

import {
  getCategoriesWithCount,
  getCategoryHierarchy,
  getPopularCategories,
} from '../../../lib/categories';
import { locales } from '../../../lib/i18n-config';

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // パラメータを解決するが、localeは現在使用していない

  const allCategories = getCategoriesWithCount();
  const categoryHierarchy = getCategoryHierarchy();
  const popularCategories = getPopularCategories(10);

  return (
    <div className='space-y-8'>
      <Header title='カテゴリ一覧' description={`すべてのカテゴリ（${allCategories.length}件）`} />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ tree categories/
          </Typography>

          <Typography component='p' variant='body1' color='muted'>
            {allCategories.length}個のカテゴリが見つかりました
          </Typography>
        </div>

        <section className='space-y-8'>
          <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <Typography component='h3' variant='h4' color='accent'>
              $ categories --popular --limit=10
            </Typography>

            <Typography component='p' variant='body2' color='muted'>
              人気カテゴリ Top 10
            </Typography>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
              {popularCategories.map(category => (
                <Link
                  key={category.name}
                  href={`/categories/${encodeURIComponent(category.name)}`}
                  className='inline-flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-md border border-accent/20 hover:bg-accent/20 hover:border-accent/30 transition-colors'
                >
                  <span className='text-sm font-medium'>{category.name}</span>
                  <span className='text-xs bg-accent/20 px-2 py-0.5 rounded-full'>
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {categoryHierarchy.length > 0 && (
            <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
              <Typography component='h3' variant='h4' color='accent'>
                $ categories --hierarchy
              </Typography>

              <Typography component='p' variant='body2' color='muted'>
                階層構造
              </Typography>

              <div className='space-y-6'>
                {categoryHierarchy.map(hierarchy => (
                  <div key={hierarchy.parent} className='space-y-3'>
                    <Typography component='h4' variant='h5' color='accent'>
                      {hierarchy.parent === 'root' ? 'ルートカテゴリ' : hierarchy.parent}
                    </Typography>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ml-4'>
                      {hierarchy.children.map(category => (
                        <Link
                          key={category.name}
                          href={`/categories/${encodeURIComponent(
                            hierarchy.parent === 'root'
                              ? category.name
                              : `${hierarchy.parent}/${category.name}`
                          )}`}
                          className='inline-flex items-center justify-between px-3 py-2 bg-terminal-bg-secondary rounded-md border border-terminal-ui-border hover:bg-terminal-bg-hover hover:border-terminal-ui-border-hover transition-colors'
                        >
                          <span className='text-sm font-medium text-terminal-text-primary'>
                            {category.name}
                          </span>
                          <span className='text-xs text-terminal-text-muted'>
                            ({category.count})
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
            <Typography component='h3' variant='h4' color='accent'>
              $ categories --sort=name
            </Typography>

            <Typography component='p' variant='body2' color='muted'>
              全カテゴリ一覧（名前順）
            </Typography>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              {allCategories.map(category => (
                <Link
                  key={category.name}
                  href={`/categories/${encodeURIComponent(category.name)}`}
                  className='inline-flex items-center justify-between px-3 py-2 bg-terminal-bg-secondary rounded-md border border-terminal-ui-border hover:bg-terminal-bg-hover hover:border-terminal-ui-border-hover transition-colors'
                >
                  <span className='text-sm font-medium text-terminal-text-primary'>
                    {category.name}
                  </span>
                  <span className='text-xs text-terminal-text-muted'>({category.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ cd ../
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4'>
            <Link
              href='/posts'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              全記事を見る
            </Link>
            <Link
              href='/'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const allCategories = getCategoriesWithCount();

  return {
    title: messages.metadata.categories.title,
    description: messages.metadata.categories.description.replace(
      '{count}',
      allCategories.length.toString()
    ),
  };
}
