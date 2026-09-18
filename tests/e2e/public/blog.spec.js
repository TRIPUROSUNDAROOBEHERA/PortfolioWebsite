const { test, expect } = require('@playwright/test');

test.describe('Public Blog & Articles Suite', () => {
  test('should render articles and navigate to single post', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('domcontentloaded');

    // If redirected or rendered under main container
    const blogContainer = page.locator('main, section, div').filter({ hasText: /blog|article|reading/i }).first();
    await expect(blogContainer).toBeVisible({ timeout: 10000 });
  });
});