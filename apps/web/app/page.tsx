import { Header, Link, Typography, RecentPosts, PopularPosts } from '@repo/ui';

async function getRecentPosts() {
  const { getAllArticles } = await import('@/lib/articles');

  const allArticles = getAllArticles()
    .filter(article => article.frontMatter.published !== false)
    .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())
    .slice(0, 5);

  return allArticles.map(article => ({
    title: article.frontMatter.title,
    slug: article.slug,
    excerpt: article.frontMatter.description,
    date: new Date(article.frontMatter.date).toLocaleDateString('ja-JP'),
    author: article.frontMatter.author || 'tsuka-ryu',
    tags: article.frontMatter.tags || [],
    readTime: Math.ceil(article.content.length / 500), // 500文字/分で概算
  }));
}

async function getPopularPosts() {
  const { getAllArticles } = await import('@/lib/articles');

  const allArticles = getAllArticles()
    .filter(article => article.frontMatter.published !== false)
    .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())
    .slice(0, 5);

  return allArticles.map((article, index) => ({
    title: article.frontMatter.title,
    slug: article.slug,
    excerpt: article.frontMatter.description,
    date: new Date(article.frontMatter.date).toLocaleDateString('ja-JP'),
    author: article.frontMatter.author || 'tsuka-ryu',
    views: Math.floor(Math.random() * 10000) + 1000, // 模擬データ
    rank: index + 1,
  }));
}

export default async function Home() {
  const recentPosts = await getRecentPosts();
  const popularPosts = await getPopularPosts();

  return (
    <div className='space-y-8'>
      <Header title='技術ブログ' description='技術共有・解説記事・Podcast感想を発信しています' />

      <section className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-8 space-y-6'>
          <div className='text-center space-y-4'>
            <Typography component='h2' variant='h2' color='accent'>
              $ whoami
            </Typography>
            <Typography component='p' variant='body1' color='muted'>
              技術者として学んだこと、体験したこと、考えたことを
              <br />
              ターミナル風のデザインで記録・共有する技術ブログです
            </Typography>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-6'>
            <div className='text-center space-y-3 p-4 bg-background border border-accent/30 rounded-lg'>
              <Typography component='h3' variant='h4' color='primary'>
                📝 技術記事
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                開発で学んだ技術や
                <br />
                ツールの使い方を共有
              </Typography>
            </div>

            <div className='text-center space-y-3 p-4 bg-background border border-accent/30 rounded-lg'>
              <Typography component='h3' variant='h4' color='primary'>
                🎧 Podcast感想
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                技術系Podcastを聞いた
                <br />
                感想や学びを記録
              </Typography>
            </div>

            <div className='text-center space-y-3 p-4 bg-background border border-accent/30 rounded-lg'>
              <Typography component='h3' variant='h4' color='primary'>
                💭 思考の整理
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                技術やキャリアについて
                <br />
                考えたことを整理・共有
              </Typography>
            </div>
          </div>
        </div>

        {/* 最新記事セクション */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-card border border-accent rounded-lg p-6'>
            <RecentPosts
              posts={recentPosts}
              maxItems={5}
              showViewAllLink={true}
              viewAllHref='/posts'
            />
          </div>

          <div className='bg-card border border-accent rounded-lg p-6'>
            <PopularPosts posts={popularPosts} maxItems={5} />
          </div>
        </div>

        <div className='text-center space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ explore --help
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href='/posts'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              記事一覧を見る
            </Link>
            <Link
              href='/tags'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              タグから探す
            </Link>
            <Link
              href='/search'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              検索する
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
