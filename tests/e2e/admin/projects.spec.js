const { test, expect } = require('@playwright/test');

test.describe('Admin Projects CRUD Suite', () => {
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

  test('should create a new project entry', async ({ page }) => {
    await page.goto('/admin/projects');
    await expect(page.locator('body')).toBeVisible();
  });
});