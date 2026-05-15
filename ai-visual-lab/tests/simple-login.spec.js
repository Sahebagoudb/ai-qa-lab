const { test, expect } = require('@playwright/test');

test('simple login test', async ({ page }) => {
  await page.goto('https://pp-admin.moniic.com/', {
    waitUntil: 'domcontentloaded'
  });

  await expect(page).toHaveTitle(/Moniic/);
});