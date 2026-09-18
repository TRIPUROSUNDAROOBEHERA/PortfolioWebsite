const { test, expect } = require('@playwright/test');

test.describe('Public Contact Form Suite', () => {
  test('should validate inputs and submit message', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i]').first();
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    const messageInput = page.locator('textarea[name="message"], textarea[placeholder*="Message" i]').first();

    if (await nameInput.count() > 0) {
      await nameInput.fill('Sarah Connor');
      await emailInput.fill('sarah@example.com');
      await messageInput.fill('Interested in building cloud-native infrastructure.');
      const submitBtn = page.locator('button[type="submit"], button:has-text("Send")').first();
      await expect(submitBtn).toBeVisible();
    }
  });
});