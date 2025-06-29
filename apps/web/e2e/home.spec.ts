import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('ホームページが正しく表示される', async ({ page }) => {
    await page.goto('/');

    // タイトルを確認
    await expect(page).toHaveTitle(/Tech Blog/);

    // ヘッダーが表示されている
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // ナビゲーションリンクが存在する
    const homeLink = page.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();

    const postsLink = page.getByRole('link', { name: 'Posts' });
    await expect(postsLink).toBeVisible();

    const tagsLink = page.getByRole('link', { name: 'Tags' });
    await expect(tagsLink).toBeVisible();

    // フッターが表示されている
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('ナビゲーションが正しく動作する', async ({ page }) => {
    await page.goto('/');

    // 記事一覧ページへ遷移
    await page.getByRole('link', { name: 'Posts' }).click();
    await expect(page).toHaveURL('/posts');
    await expect(page.locator('h1')).toContainText('All Posts');

    // タグ一覧ページへ遷移
    await page.getByRole('link', { name: 'Tags' }).click();
    await expect(page).toHaveURL('/tags');
    await expect(page.locator('h1')).toContainText('All Tags');

    // ホームへ戻る
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });

  test('検索機能が動作する', async ({ page }) => {
    await page.goto('/');

    // 検索フォームに入力
    const searchInput = page.getByPlaceholder('Search posts...');
    await searchInput.fill('test');
    await searchInput.press('Enter');

    // 検索結果ページへ遷移
    await expect(page).toHaveURL(/\/search\?q=test/);
    await expect(page.locator('h1')).toContainText('Search Results');
  });
});
