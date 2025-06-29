import { defineConfig, devices } from '@playwright/test';

// Node.js processを使用するための型定義
declare const process: NodeJS.Process;

/**
 * Playwright設定ファイル
 * MCP (Model Context Protocol) での動作確認用
 */
export default defineConfig({
  testDir: './playwright-tests',

  // テスト実行設定
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // レポート設定
  reporter: [['html'], ['json', { outputFile: 'playwright-report/results.json' }]],

  // 共通設定
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // テストプロジェクト設定
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // NOTE: 以下のブラウザは必要に応じてコメントアウトを外して使用
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // // モバイルデバイス
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // 開発サーバー設定（MCP使用時は通常は既に起動済み）
  webServer: {
    command: 'pnpm turbo dev --filter=@my-blog/web',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
