/* eslint-disable import-x/order */
import { Header, Typography, Link } from '@repo/ui';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
/* eslint-enable import-x/order */

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

interface PostData {
  title: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  description?: string;
}

async function getPost(slug: string): Promise<PostData | null> {
  // TODO: 実際のMarkdownファイル読み込み処理を実装予定
  // 現在はサンプルデータを返す
  const mockPosts: Record<string, PostData> = {
    'sample-post': {
      title: 'サンプル記事タイトル',
      date: '2024-12-24',
      author: 'tsuka-ryu',
      tags: ['TypeScript', 'Next.js', 'React'],
      description: 'これはサンプル記事の説明文です。',
      content: `
# サンプル記事

これはサンプル記事の内容です。

## セクション1

ここにコンテンツが入ります。

\`\`\`typescript
const example = &quot;Hello, World!&quot;;
console.log(example);
\`\`\`

## セクション2

更に詳しい説明がここに続きます。

- リストアイテム1
- リストアイテム2
- リストアイテム3

**太字のテキスト**や*斜体のテキスト*も使用できます。
      `,
    },
    'coming-soon': {
      title: 'ブログ記事準備中...',
      date: '2024-12-24',
      author: 'tsuka-ryu',
      tags: ['お知らせ'],
      description: '現在、記事システムを構築中です。',
      content: `
# ブログ記事準備中...

現在、記事システムを構築中です。しばらくお待ちください。

## 予定している機能

- Markdownファイルからの記事読み込み
- シンタックスハイライト
- 目次生成
- タグ機能
- 検索機能

近日中に公開予定です！
      `,
    },
  };

  return mockPosts[slug] || null;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: '記事が見つかりません - 技術ブログ',
      description: '指定された記事が見つかりませんでした。',
    };
  }

  return {
    title: `${post.title} - 技術ブログ`,
    description: post.description || `${post.title}に関する技術記事です。`,
    openGraph: {
      title: post.title,
      description: post.description || `${post.title}に関する技術記事です。`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='space-y-8'>
      <Header title={post.title} description={post.description} />

      <article className='space-y-8'>
        {/* 記事メタ情報 */}
        <div className='bg-card border border-accent rounded-lg p-6 space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='space-y-2'>
              <Typography component='p' variant='caption' color='muted' className='font-mono'>
                {new Date(post.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
              <Typography component='p' variant='body2' color='muted'>
                by {post.author}
              </Typography>
            </div>

            <div className='flex flex-wrap gap-2'>
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  className='inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors'
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 記事コンテンツ */}
        <div className='bg-card border border-accent rounded-lg p-8'>
          <div className='prose prose-lg max-w-none prose-headings:text-primary prose-p:text-muted prose-strong:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-background prose-pre:border prose-pre:border-accent/30'>
            {/* TODO: MDXやreact-markdownでの処理を実装予定 */}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-2xl font-bold text-primary mt-8 mb-4">${line.slice(2)}</h1>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-xl font-semibold text-primary mt-6 mb-3">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('```')) {
                      return '<pre class="bg-background border border-accent/30 rounded p-4 overflow-x-auto my-4"><code>';
                    }
                    if (line === '```') {
                      return '</code></pre>';
                    }
                    if (line.startsWith('- ')) {
                      return `<li class="text-muted ml-6">${line.slice(2)}</li>`;
                    }
                    if (line.includes('**') && line.includes('**')) {
                      const boldText = line.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-primary">$1</strong>'
                      );
                      return `<p class="text-muted my-2">${boldText}</p>`;
                    }
                    if (line.includes('*') && line.includes('*')) {
                      const italicText = line.replace(
                        /\*(.*?)\*/g,
                        '<em class="text-primary">$1</em>'
                      );
                      return `<p class="text-muted my-2">${italicText}</p>`;
                    }
                    if (line.trim() === '') {
                      return '<br>';
                    }
                    return `<p class="text-muted my-2">${line}</p>`;
                  })
                  .join(''),
              }}
            />
          </div>
        </div>

        {/* ナビゲーション */}
        <div className='bg-card border border-accent rounded-lg p-6'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <div className='text-center sm:text-left'>
              <Typography component='h3' variant='h4' color='accent' className='mb-2'>
                $ cd ../
              </Typography>
              <Link
                href='/posts'
                className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-transparent text-terminal-text-primary hover:bg-terminal-bg-hover border-terminal-ui-border hover:border-terminal-ui-border-hover px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
              >
                記事一覧に戻る
              </Link>
            </div>

            <div className='text-center sm:text-right'>
              <Typography component='h3' variant='h4' color='accent' className='mb-2'>
                $ find . -name &quot;*.md&quot;
              </Typography>
              <Link
                href='/'
                className='inline-flex items-center justify-center font-medium rounded-md border transition-colors bg-terminal-accent text-terminal-accent-foreground hover:bg-terminal-accent-hover border-terminal-accent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-ui-border-focus focus:ring-offset-2 focus:ring-offset-terminal-bg-primary'
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
