// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://pp-admin.moniic.com/login');
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('sahebaadmin@yopmail.com');
//   await page.getByRole('button', { name: 'PROCEED' }).click();
//   await page.getByRole('textbox').first().click();
//   await page.getByRole('textbox').first().fill('2');
//   await page.getByRole('textbox').nth(1).fill('3');
//   await page.getByRole('textbox').nth(2).fill('4');
//   await page.getByRole('textbox').nth(3).fill('8');
//   await page.getByRole('textbox').nth(4).fill('7');
//   await page.getByRole('textbox').nth(5).fill('6');
//   await page.getByRole('button', { name: 'PROCEED' }).click();
//   await page.getByText('Yacht').click();
//   await page.getByText('Rental').click();
//   await page.locator('section').getByText('Customers').click();
//   await page.getByText('Cars').click();
// });

import { test, expect } from '@playwright/test';

test.describe('Moniic Admin Regression', () => {

  test('User can login and navigate modules', async ({ page }) => {

    await test.step('Open login page', async () => {

      await page.goto('https://pp-admin.moniic.com/login');

      await expect(page).toHaveURL(/login/);

      await expect(
        page.getByRole('textbox', { name: 'Email' })
      ).toBeVisible();

    });

    await test.step('Enter email and proceed', async () => {

      await page.getByRole('textbox', { name: 'Email' })
        .fill('sahebaadmin@yopmail.com');

      await page.getByRole('button', { name: 'PROCEED' })
        .click();

    });

    await test.step('Enter OTP manually', async () => {

      console.log('Please enter OTP manually');

      // Pause browser for manual OTP
      await page.pause();

    });

    await test.step('Verify dashboard after login', async () => {

      await expect(
        page.getByText('Yacht')
      ).toBeVisible({
        timeout: 60000
      });

    });

    await test.step('Navigate to Yacht module', async () => {

      await page.getByText('Yacht').click();

      await expect(
        page.getByText('Rental')
      ).toBeVisible();

    });

    await test.step('Navigate to Customers module', async () => {

      await page.locator('section')
        .getByText('Customers')
        .click();

      await expect(
        page.getByText('Cars')
      ).toBeVisible();

    });

  });

});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 120000,

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    launchOptions: {
      slowMo: 300
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]

});
