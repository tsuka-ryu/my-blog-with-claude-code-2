import { cn } from '@repo/ui';
import GithubSlugger from 'github-slugger';
import Image from 'next/image';
import Link from 'next/link';

import type { MDXComponents } from 'mdx/types';

// 見出しテキストからIDを生成するヘルパー関数
function getHeadingId(children: React.ReactNode): string {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.join('')
        : String(children);

  // github-sluggerを使用してIDを生成
  const slugger = new GithubSlugger();
  return slugger.slug(text);
}

export const mdxComponents: MDXComponents = {
  // 見出し
  h1: ({ className, children, id, ...props }) => {
    const headingId = id || getHeadingId(children);
    return (
      <h1
        id={headingId}
        className={cn('mt-8 mb-4 text-3xl font-bold text-terminal-green', className)}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ className, children, id, ...props }) => {
    const headingId = id || getHeadingId(children);
    return (
      <h2
        id={headingId}
        className={cn('mt-8 mb-4 text-2xl font-semibold text-terminal-green', className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ className, children, id, ...props }) => {
    const headingId = id || getHeadingId(children);
    return (
      <h3
        id={headingId}
        className={cn('mt-6 mb-3 text-xl font-semibold text-terminal-white', className)}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ className, children, id, ...props }) => {
    const headingId = id || getHeadingId(children);
    return (
      <h4
        id={headingId}
        className={cn('mt-6 mb-3 text-lg font-semibold text-terminal-white', className)}
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ className, children, id, ...props }) => {
    const headingId = id || getHeadingId(children);
    return (
      <h5
        id={headingId}
        className={cn('mt-4 mb-2 text-base font-semibold text-terminal-white', className)}
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ className, children, id, ...props }) => {
    const headingId = id || getHeadingId(children);
    return (
      <h6
        id={headingId}
        className={cn('mt-4 mb-2 text-sm font-semibold text-terminal-white', className)}
        {...props}
      >
        {children}
      </h6>
    );
  },
  // パラグラフ
  p: ({ className, ...props }) => (
    <p className={cn('mb-4 leading-7 text-terminal-white/80', className)} {...props} />
  ),
  // リスト
  ul: ({ className, ...props }) => (
    <ul className={cn('mb-4 ml-6 list-disc text-terminal-white/80', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('mb-4 ml-6 list-decimal text-terminal-white/80', className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn('mb-1', className)} {...props} />,
  // リンク
  a: ({ className, href, ...props }) => {
    // 内部リンクか外部リンクかを判定
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <Link
          href={href}
          className={cn(
            'text-terminal-green hover:underline focus:underline focus:outline-none',
            className
          )}
          {...props}
        />
      );
    }

    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          'text-terminal-green hover:underline focus:underline focus:outline-none',
          className
        )}
        {...props}
      />
    );
  },
  // 画像（Next.js Image最適化）
  img: ({ src, alt, width, height, ...props }) => {
    if (!src) return null;

    // 相対パスの場合はpublicディレクトリからの参照と仮定
    const imageSrc = src.startsWith('/') ? src : `/${src}`;

    return (
      <span className='block my-8'>
        <Image
          src={imageSrc}
          alt={alt || ''}
          width={(width as number) || 800}
          height={(height as number) || 600}
          className='rounded-lg mx-auto'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
          {...props}
        />
      </span>
    );
  },
  // コードブロック
  pre: ({ className, ...props }) => (
    <pre
      className={cn('mb-4 overflow-x-auto rounded-lg bg-terminal-black/50 p-4 text-sm', className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'rounded bg-terminal-black/30 px-1 py-0.5 font-mono text-sm text-terminal-green',
        className
      )}
      {...props}
    />
  ),
  // テーブル
  table: ({ className, ...props }) => (
    <div className='mb-4 overflow-x-auto'>
      <table
        className={cn('w-full border-collapse text-sm text-terminal-white/80', className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border-b border-terminal-green/30 px-4 py-2 text-left font-semibold text-terminal-green',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td className={cn('border-b border-terminal-green/10 px-4 py-2', className)} {...props} />
  ),
  // 引用
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'mb-4 border-l-4 border-terminal-green/50 pl-4 italic text-terminal-white/70',
        className
      )}
      {...props}
    />
  ),
  // 水平線
  hr: ({ className, ...props }) => (
    <hr className={cn('my-8 border-terminal-green/20', className)} {...props} />
  ),
};
