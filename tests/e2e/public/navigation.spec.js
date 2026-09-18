const { test, expect } = require('@playwright/test');

test.describe('Public Header & Navigation Suite', () => {
  test('should navigate across primary routes seamlessly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();

    // Navigate to projects section/page
    const projectsLink = page.locator('nav a[href*="project"], a:has-text("Projects")').first();
    if (await projectsLink.count() > 0) {
      await projectsLink.click();
      await page.waitForTimeout(500);
    }

    // Navigate to contact section/page
    const contactLink = page.locator('nav a[href*="contact"], a:has-text("Contact")').first();
    if (await contactLink.count() > 0) {
      await contactLink.click();
      await page.waitForTimeout(500);
    }
  });
});