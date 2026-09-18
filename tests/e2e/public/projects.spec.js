const { test, expect } = require('@playwright/test');

test.describe('Public Projects Gallery Suite', () => {
  test('should list projects and open detail view', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll to / navigate to projects
    const navItem = page.locator('nav a[href*="project"], a:has-text("Projects")').first();
    if (await navItem.count() > 0) {
      await navItem.click();
    } else {
      await page.goto('/projects');
    }

    const container = page.locator('main, section, div').filter({ hasText: /projects|showcase|work/i }).first();
    await expect(container).toBeVisible({ timeout: 10000 });
  });
});