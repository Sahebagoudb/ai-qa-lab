const { test, expect } = require('@playwright/test');

test('staging login page loads and shows the login form', async ({ page }) => {
  await page.goto('https://pp-admin.moniic.com/login', {
    waitUntil: 'domcontentloaded'
  });

  await expect(page).toHaveTitle(/Moniic|Login|Admin/i);
  await expect(page.locator('text=Email')).toBeVisible({ timeout: 30000 });

  const url = page.url();
  expect(url).toContain('/login');
});
