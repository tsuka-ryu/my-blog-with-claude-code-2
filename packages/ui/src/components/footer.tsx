import { type JSX } from 'react';

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={className} role="contentinfo" aria-label="サイトフッター">
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* サイト情報 */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">技術ブログ</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                技術共有・解説記事・Podcast感想を発信しています
              </p>
            </div>

            {/* ナビゲーション */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                ナビゲーション
              </h3>
              <nav aria-label="フッターナビゲーション">
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="/posts"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      記事一覧
                    </a>
                  </li>
                  <li>
                    <a
                      href="/tags"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      タグ
                    </a>
                  </li>
                  <li>
                    <a
                      href="/search"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                    >
                      検索
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* ソーシャルリンク */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">リンク</h3>
              <nav aria-label="ソーシャルリンク">
                <ul className="mt-2 space-y-2">
                  <li>
                    <a
                      href="https://github.com/tsukaryu"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/tsukaryu"
                      className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* コピーライト */}
          <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              &copy; {currentYear} tsuka-ryu. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
