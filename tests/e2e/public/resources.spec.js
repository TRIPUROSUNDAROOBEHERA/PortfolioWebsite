const { test, expect } = require('@playwright/test');

test.describe('Public Curated Resources Suite', () => {
  test('should display developer resources and external links', async ({ page }) => {
    await page.goto('/resources');
    const resourceItem = page.locator('.resource-card, a[target="_blank"]').first();
    await expect(resourceItem).toBeVisible();
  });
});