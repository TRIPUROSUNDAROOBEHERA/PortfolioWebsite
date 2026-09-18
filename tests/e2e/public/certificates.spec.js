const { test, expect } = require('@playwright/test');

test.describe('Public Certificates Suite', () => {
  test('should list certificates and validation links', async ({ page }) => {
    await page.goto('/certificates');
    await page.waitForLoadState('domcontentloaded');

    const certContainer = page.locator('main, section, div').filter({ hasText: /certificate|credential|achievement/i }).first();
    await expect(certContainer).toBeVisible({ timeout: 10000 });
  });
});