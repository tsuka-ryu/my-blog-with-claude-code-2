import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
export default config;
