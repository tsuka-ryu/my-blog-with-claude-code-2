import { Header, Typography, Link } from '@repo/ui';

export default function NotFound() {
  return (
    <div className='space-y-8'>
      <Header title='記事が見つかりません' description='指定された記事が見つかりませんでした' />

      <div className='bg-card border border-accent rounded-lg p-8 text-center space-y-6'>
        <div className='space-y-4'>
          <Typography component='h2' variant='h2' color='accent'>
            $ cat 404.txt
          </Typography>

          <div className='space-y-4'>
            <Typography component='p' variant='h3' color='primary'>
              記事が見つかりません
            </Typography>

            <Typography component='p' variant='body1' color='muted'>
              指定されたスラッグの記事は存在しないか、削除された可能性があります。
            </Typography>
          </div>
        </div>

        <div className='pt-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ ls -la alternatives/
          </Typography>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link
              href='/posts'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              記事一覧を見る
            </Link>

            <Link
              href='/search'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              記事を検索する
            </Link>

            <Link
              href='/'
              className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
