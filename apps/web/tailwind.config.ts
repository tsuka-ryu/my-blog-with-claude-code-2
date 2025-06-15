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

        // ターミナル風カラーパレット
        terminal: {
          // 背景色
          bg: {
            primary: '#0c0c0c', // メイン背景（深い黒）
            secondary: '#1a1a1a', // サブ背景（少し明るい黒）
            elevated: '#252525', // カード、モーダルなど
            hover: '#2a2a2a', // ホバー時の背景
          },

          // テキスト色
          text: {
            primary: '#f4f4f4', // プライマリテキスト（明るい白）
            secondary: '#a8a8a8', // セカンダリテキスト（グレー）
            muted: '#6b6b6b', // ミュートテキスト（暗いグレー）
            bright: '#ffffff', // 明るい白（強調用）
          },

          // アクセントカラー（ANSIカラーに基づく）
          accent: {
            // 標準色
            red: '#ff5f56', // エラー、削除
            green: '#5af78e', // 成功、追加
            yellow: '#f3f99d', // 警告、注意
            blue: '#57c7ff', // 情報、リンク
            magenta: '#ff6ac1', // 特殊、装飾
            cyan: '#9aedfe', // シアン（コマンド、関数）
            orange: '#ffb86c', // オレンジ（文字列、引用）

            // 暗めのバリアント
            'red-dark': '#cc4b47',
            'green-dark': '#4bc775',
            'yellow-dark': '#d6d57e',
            'blue-dark': '#4ba6cc',
            'magenta-dark': '#cc539a',
            'cyan-dark': '#7bc5d3',
            'orange-dark': '#cc9256',
          },

          // シンタックスハイライト用
          syntax: {
            keyword: '#ff6ac1', // キーワード（if, for, function など）
            string: '#f3f99d', // 文字列
            comment: '#6b6b6b', // コメント
            function: '#57c7ff', // 関数名
            variable: '#9aedfe', // 変数
            constant: '#ff6ac1', // 定数
            operator: '#ff5f56', // 演算子
            punctuation: '#a8a8a8', // 句読点、括弧など
          },

          // UI要素用
          ui: {
            border: '#333333', // ボーダー（デフォルト）
            'border-hover': '#444444', // ボーダー（ホバー時）
            'border-focus': '#57c7ff', // ボーダー（フォーカス時）
            divider: '#2a2a2a', // 区切り線
            selection: 'rgba(87, 199, 255, 0.2)', // テキスト選択
            cursor: '#f4f4f4', // カーソル
            'cursor-bg': 'rgba(244, 244, 244, 0.2)', // カーソル背景
          },

          // プロンプト記号用
          prompt: {
            user: '#5af78e', // ユーザープロンプト ($, >)
            root: '#ff5f56', // ルートプロンプト (#)
            path: '#57c7ff', // パス表示
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
