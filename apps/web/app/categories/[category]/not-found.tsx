import { Header, Typography, Link } from '@repo/ui';

export default function CategoryNotFound() {
  return (
    <div className='space-y-8'>
      <Header title='カテゴリが見つかりません' />

      <div className='space-y-6'>
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h2' variant='h3' color='accent'>
            $ find . -category &quot;*&quot; | grep -i &quot;unknown&quot;
          </Typography>

          <Typography component='p' variant='body1' color='muted'>
            指定されたカテゴリは存在しないか、記事がありません。
          </Typography>

          <Typography component='p' variant='body2' color='muted'>
            カテゴリ名の入力間違いまたは削除された可能性があります。
          </Typography>
        </div>

        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <Typography component='h3' variant='h4' color='accent'>
            $ alternatives --list
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
