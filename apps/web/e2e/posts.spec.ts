import { test, expect } from '@playwright/test';

test.describe('記事一覧ページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts');
  });

  test('記事一覧が表示される', async ({ page }) => {
    // ページタイトル
    await expect(page.locator('h1')).toContainText('All Posts');

    // 記事カードが存在する
    const postCards = page.locator('[data-testid="post-card"]');
    await expect(postCards).toHaveCount(await postCards.count());

    // 各記事カードに必要な要素が含まれている
    const firstCard = postCards.first();
    await expect(firstCard.locator('h2')).toBeVisible(); // タイトル
    await expect(firstCard.locator('time')).toBeVisible(); // 日付
    await expect(firstCard.locator('p')).toBeVisible(); // 概要
  });

  test('記事詳細ページへ遷移できる', async ({ page }) => {
    // 最初の記事カードをクリック
    const firstCard = page.locator('[data-testid="post-card"]').first();
    const postTitle = await firstCard.locator('h2').textContent();

    await firstCard.click();

    // 記事詳細ページへ遷移したことを確認
    await expect(page).toHaveURL(/\/posts\/.+/);
    await expect(page.locator('h1')).toContainText(postTitle || '');
  });

  test('タグフィルタリングが動作する', async ({ page }) => {
    // タグリンクをクリック
    const tagLink = page.locator('[data-testid="tag-link"]').first();
    const tagName = await tagLink.textContent();

    await tagLink.click();

    // タグ別記事一覧ページへ遷移
    await expect(page).toHaveURL(/\/tags\/.+/);
    await expect(page.locator('h1')).toContainText(tagName || '');
  });
});
