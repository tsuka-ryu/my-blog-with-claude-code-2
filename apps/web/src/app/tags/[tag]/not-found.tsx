import { Header, Typography, Link } from '@repo/ui';

export default function NotFound() {
  return (
    <div className="space-y-8">
      <Header
        title="404 - タグが見つかりません"
        description="指定されたタグに該当する記事が見つかりませんでした"
      />

      <div className="space-y-6">
        <div className="bg-card border border-accent rounded-lg p-8 space-y-6 text-center">
          <Typography component="h2" variant="h2" color="accent">
            $ ls -la tags/
          </Typography>
          
          <Typography component="p" variant="body1" color="muted">
            指定されたタグは存在しないか、該当する記事がありません。
          </Typography>

          <div className="space-y-4">
            <Typography component="h3" variant="h4" color="primary">
              利用可能なオプション:
            </Typography>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tags"
                className="inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary"
              >
                全タグを見る
              </Link>
              <Link
                href="/posts"
                className="inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary"
              >
                全記事を見る
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}