const { test, expect } = require('@playwright/test');

test.describe('Admin Dashboard Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
    const userField = page.locator('input[name="username"], input[name="email"]').first();
    if (await userField.count() > 0) {
      await userField.fill('admin@portfolio.local');
      await page.locator('input[type="password"]').first().fill('AdminSecurePass#2025');
      await page.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(1000);
    }
  });

  test('should render analytics summary cards and metrics', async ({ page }) => {
    await page.goto('/admin/dashboard');
    const cards = page.locator('[data-testid*="stat"], .card, div:has(h3)').first();
    await expect(cards).toBeVisible({ timeout: 10000 });
  });
});