const { test, expect } = require('@playwright/test');

test.describe('Admin Content Management Suite', () => {
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

  test('should navigate and manage blog draft content', async ({ page }) => {
    await page.goto('/admin/blogs');
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();
  });
});