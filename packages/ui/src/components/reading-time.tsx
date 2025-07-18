import { cn } from '@repo/utils';

export interface ReadingTimeProps {
  /**
   * 記事の内容（文字数計算用）
   */
  content: string;
  /**
   * 1分あたりの読める文字数（デフォルト: 500文字）
   */
  wordsPerMinute?: number;
  /**
   * クラス名
   */
  className?: string;
  /**
   * 表示形式
   */
  format?: 'short' | 'long';
  /**
   * アイコンを表示するか
   */
  showIcon?: boolean;
}

/**
 * 読了時間を計算する関数
 * @param content 記事の内容
 * @param wordsPerMinute 1分あたりの読める文字数
 * @returns 読了時間（分）
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 500): number {
  // HTMLタグを除去してテキストのみを取得
  const textContent = content.replace(/<[^>]*>/g, '');

  // 文字数を計算
  const characterCount = textContent.length;

  // 読了時間を計算（最低1分）
  const readingTime = Math.max(1, Math.ceil(characterCount / wordsPerMinute));

  return readingTime;
}

export function ReadingTime({
  content,
  wordsPerMinute = 500,
  className,
  format = 'short',
  showIcon = true,
}: ReadingTimeProps) {
  const readingTime = calculateReadingTime(content, wordsPerMinute);

  const formatTime = (minutes: number) => {
    if (format === 'long') {
      return `読了時間: 約${minutes}分`;
    }
    return `${minutes}分`;
  };

  return (
    <div className={cn('flex items-center gap-1 text-sm text-terminal-green/70', className)}>
      {showIcon && (
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      )}
      <span>{formatTime(readingTime)}</span>
    </div>
  );
}
