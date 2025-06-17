import type { Config } from 'tailwindcss';

export const baseConfig: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        // モバイルファースト設計のカスタムブレークポイント
        // ターミナル風デザインに適した幅設定
        xs: '475px', // 超小型デバイス
        sm: '640px', // 小型デバイス（デフォルト維持）
        md: '768px', // タブレット（デフォルト維持）
        lg: '1024px', // デスクトップ（デフォルト維持）
        xl: '1280px', // 大型デスクトップ（デフォルト維持）
        '2xl': '1536px', // 超大型デスクトップ（デフォルト維持）
        // ターミナル固有のブレークポイント
        'terminal-sm': '80ch', // 標準ターミナル幅（80文字）
        'terminal-md': '100ch', // 中型ターミナル幅（100文字）
        'terminal-lg': '120ch', // 大型ターミナル幅（120文字）
        'terminal-xl': '160ch', // 超大型ターミナル幅（160文字）
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'var(--font-noto-sans-jp)', 'monospace'],
        sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // ターミナル風カラーパレット（CSS変数を使用）
        terminal: {
          // 背景色
          bg: {
            primary: 'var(--terminal-bg-primary)',
            secondary: 'var(--terminal-bg-secondary)',
            elevated: 'var(--terminal-bg-elevated)',
            hover: 'var(--terminal-bg-hover)',
          },

          // テキスト色
          text: {
            primary: 'var(--terminal-text-primary)',
            secondary: 'var(--terminal-text-secondary)',
            muted: 'var(--terminal-text-muted)',
            bright: 'var(--terminal-text-bright)',
          },

          // アクセントカラー（ANSIカラーに基づく）
          accent: {
            // 標準色
            red: 'var(--terminal-accent-red)',
            green: 'var(--terminal-accent-green)',
            yellow: 'var(--terminal-accent-yellow)',
            blue: 'var(--terminal-accent-blue)',
            magenta: 'var(--terminal-accent-magenta)',
            cyan: 'var(--terminal-accent-cyan)',
            orange: 'var(--terminal-accent-orange)',

            // 暗めのバリアント
            'red-dark': 'var(--terminal-accent-red-dark)',
            'green-dark': 'var(--terminal-accent-green-dark)',
            'yellow-dark': 'var(--terminal-accent-yellow-dark)',
            'blue-dark': 'var(--terminal-accent-blue-dark)',
            'magenta-dark': 'var(--terminal-accent-magenta-dark)',
            'cyan-dark': 'var(--terminal-accent-cyan-dark)',
            'orange-dark': 'var(--terminal-accent-orange-dark)',
          },

          // シンタックスハイライト用
          syntax: {
            keyword: 'var(--terminal-syntax-keyword)',
            string: 'var(--terminal-syntax-string)',
            comment: 'var(--terminal-syntax-comment)',
            function: 'var(--terminal-syntax-function)',
            variable: 'var(--terminal-syntax-variable)',
            constant: 'var(--terminal-syntax-constant)',
            operator: 'var(--terminal-syntax-operator)',
            punctuation: 'var(--terminal-syntax-punctuation)',
          },

          // UI要素用
          ui: {
            border: 'var(--terminal-ui-border)',
            'border-hover': 'var(--terminal-ui-border-hover)',
            'border-focus': 'var(--terminal-ui-border-focus)',
            divider: 'var(--terminal-ui-divider)',
            selection: 'var(--terminal-ui-selection)',
            cursor: 'var(--terminal-ui-cursor)',
            'cursor-bg': 'var(--terminal-ui-cursor-bg)',
          },

          // プロンプト記号用
          prompt: {
            user: 'var(--terminal-prompt-user)',
            root: 'var(--terminal-prompt-root)',
            path: 'var(--terminal-prompt-path)',
          },
        },
      },
      container: {
        // コンテナの中央寄せをデフォルトで有効化
        center: true,
        // パディングをレスポンシブに設定
        padding: {
          DEFAULT: '1rem',
          xs: '1rem',
          sm: '2rem',
          md: '3rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        // ブレークポイントごとの最大幅
        screens: {
          xs: '100%',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      spacing: {
        // ターミナル風の文字ベースのスペーシング
        ch: '1ch', // 1文字分
        '2ch': '2ch', // 2文字分
        '4ch': '4ch', // 4文字分
        '8ch': '8ch', // 8文字分
        '80ch': '80ch', // 標準ターミナル幅
      },
    },
  },
  plugins: [],
};

export function createTailwindConfig(contentPaths: string[]): Config {
  return {
    content: contentPaths,
    ...baseConfig,
  } as Config;
}
