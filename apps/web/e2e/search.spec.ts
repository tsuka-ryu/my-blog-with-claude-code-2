import { test, expect } from '@playwright/test';

test.describe('検索機能', () => {
  test('検索結果が正しく表示される', async ({ page }) => {
    await page.goto('/search?q=Next.js');

    // ページタイトル
    await expect(page.locator('h1')).toContainText('Search Results');

    // 検索クエリが表示されている
    await expect(page.locator('text="Next.js"')).toBeVisible();

    // 検索結果が表示されている（0件の場合も考慮）
    const results = page.locator('[data-testid="search-result"]');
    const resultCount = await results.count();

    if (resultCount > 0) {
      // 結果がある場合は各結果にタイトルとハイライトが含まれている
      const firstResult = results.first();
      await expect(firstResult.locator('h3')).toBeVisible();
      await expect(firstResult.locator('mark')).toBeVisible();
    } else {
      // 結果がない場合は「結果なし」メッセージが表示される
      await expect(page.locator('text="No results found"')).toBeVisible();
    }
  });

  test('検索フォームから検索できる', async ({ page }) => {
    await page.goto('/');

    // 検索フォームに入力
    const searchInput = page.getByPlaceholder('Search posts...');
    await searchInput.fill('TypeScript');
    await searchInput.press('Enter');

    // 検索結果ページへ遷移
    await expect(page).toHaveURL('/search?q=TypeScript');
    await expect(page.locator('h1')).toContainText('Search Results');
    await expect(page.locator('text="TypeScript"')).toBeVisible();
  });

  test('空の検索クエリの場合', async ({ page }) => {
    await page.goto('/search?q=');

    // エラーメッセージまたは全記事が表示される
    await expect(page.locator('h1')).toContainText('Search Results');
    const message = page.locator('text="Please enter a search term"');
    const allPosts = page.locator('[data-testid="search-result"]');

    // どちらかが表示されていることを確認
    const hasMessage = await message.isVisible().catch(() => false);
    const hasPosts = (await allPosts.count()) > 0;

    expect(hasMessage || hasPosts).toBeTruthy();
  });
});
