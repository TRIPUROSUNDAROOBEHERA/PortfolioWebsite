const { test, expect } = require('@playwright/test');

test.describe('Landing & Bio Profile Suite', () => {
  test('should load headline, bio details, and resume download link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('a[href*=".pdf"], a:has-text("Resume"), a:has-text("CV")').first()).toBeVisible();
  });
});