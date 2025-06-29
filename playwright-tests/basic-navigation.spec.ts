import { test, expect } from '@playwright/test';

/**
 * 基本的なナビゲーションテスト
 * MCP動作確認用のサンプルテスト
 */
test.describe('基本的なページナビゲーション', () => {
  test('ホームページが正常に表示される', async ({ page }) => {
    await page.goto('/');

    // ページタイトルの確認
    await expect(page).toHaveTitle(/Blog/);

    // メインコンテンツの存在確認
    await expect(page.locator('main')).toBeVisible();
  });

  test('記事一覧ページにアクセスできる', async ({ page }) => {
    await page.goto('/posts');

    // ページが正常に読み込まれることを確認
    await expect(page.locator('h1')).toContainText('記事一覧');
  });

  test('タグ一覧ページにアクセスできる', async ({ page }) => {
    await page.goto('/tags');

    // ページが正常に読み込まれることを確認
    await expect(page.locator('h1')).toContainText('タグ一覧');
  });

  test('検索ページにアクセスできる', async ({ page }) => {
    await page.goto('/search');

    // 検索フォームの存在確認
    await expect(page.locator('input[type="search"]')).toBeVisible();
  });
});

test.describe('レスポンシブデザインテスト', () => {
  test('モバイルビューで正常に表示される', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // モバイルレイアウトが適用されることを確認
    await expect(page.locator('main')).toBeVisible();
  });

  test('タブレットビューで正常に表示される', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // タブレットレイアウトが適用されることを確認
    await expect(page.locator('main')).toBeVisible();
  });
});
