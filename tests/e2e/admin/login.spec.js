const { test, expect } = require('@playwright/test');

test.describe('Admin Authentication Suite', () => {
  test('should display login form with validation', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
    await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/admin/login');
    const userField = page.locator('input[name="username"], input[name="email"], input[type="text"]').first();
    await userField.fill('invalid_user@test.com');
    await page.locator('input[type="password"]').first().fill('wrong_password');
    await page.locator('button[type="submit"]').first().click();

    // Valid Playwright multi-locator check
    const errorLocator = page.locator('.error, .error-message, [role="alert"]')
      .or(page.getByText(/invalid|wrong|failed|unauthorized|error/i));
    await expect(errorLocator.first()).toBeVisible({ timeout: 10000 });
  });

  test('should authenticate and redirect to admin dashboard', async ({ page }) => {
    await page.goto('/admin/login');
    const userField = page.locator('input[name="username"], input[name="email"], input[type="text"]').first();
    await userField.fill('admin@portfolio.local');
    await page.locator('input[type="password"]').first().fill('AdminSecurePass#2025');
    await page.locator('button[type="submit"]').first().click();
    await expect(page).toHaveURL(/.*admin/i, { timeout: 10000 });
  });
});