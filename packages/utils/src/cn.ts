import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS クラス名をマージするユーティリティ関数
 * clsx と tailwind-merge を組み合わせて、競合するクラス名を適切に処理する
 *
 * @param inputs - クラス名の値（文字列、オブジェクト、配列など）
 * @returns マージされたクラス名文字列
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
