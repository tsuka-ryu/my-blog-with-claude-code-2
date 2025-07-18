'use client';

import { useTheme } from './theme-provider';

// 型定義の問題を回避するため、一時的に無効化
// const Giscus = lazy(() => import('@giscus/react'));

export interface CommentsProps {
  /**
   * Repository name in the format 'owner/repo'
   */
  repo: string;
  /**
   * Repository ID for giscus
   */
  repoId: string;
  /**
   * Category for discussions
   */
  category: string;
  /**
   * Category ID for discussions
   */
  categoryId: string;
  /**
   * Discussion mapping method
   */
  mapping?: 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'pathname';
  /**
   * Discussion term (used when mapping is 'specific')
   */
  term?: string;
  /**
   * Whether to enable reactions
   */
  reactionsEnabled?: boolean;
  /**
   * Whether to emit metadata
   */
  emitMetadata?: boolean;
  /**
   * Input position
   */
  inputPosition?: 'top' | 'bottom';
  /**
   * Language for giscus
   */
  lang?: string;
  /**
   * Loading behavior
   */
  loading?: 'lazy' | 'eager';
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function Comments({
  repo: _repo,
  repoId: _repoId,
  category: _category,
  categoryId: _categoryId,
  mapping: _mapping = 'pathname',
  term: _term,
  reactionsEnabled: _reactionsEnabled = true,
  emitMetadata: _emitMetadata = false,
  inputPosition: _inputPosition = 'bottom',
  lang: _lang = 'ja',
  loading: _loading = 'lazy',
}: CommentsProps) {
  const { theme } = useTheme();

  // テーマに応じたgiscusのテーマを設定
  const _giscusTheme = theme === 'light' ? 'light' : 'dark';

  return (
    <div className='mt-8 border-t border-terminal-green/30 pt-8'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold text-terminal-green'>コメント</h3>
        <p className='text-sm text-terminal-green/70 mt-1'>
          GitHub アカウントでログインしてコメントできます
        </p>
      </div>
      <div className='text-terminal-green/70 p-4 border border-terminal-green/30 rounded'>
        <p>コメント機能は現在開発中です。</p>
        <p className='text-sm mt-2'>
          GitHub Discussions を使用したコメントシステムを実装予定です。
        </p>
      </div>
    </div>
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars */
