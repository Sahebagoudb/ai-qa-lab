
import { test, expect } from '@playwright/test';

test('Verify Yacht module access', async ({ page }) => {

  await page.goto('https://pp-admin.moniic.com/login');

  await page.getByRole('textbox', { name: 'Email' })
    .fill('sahebaadmin@yopmail.com');

  await page.getByRole('button', { name: 'PROCEED' })
    .click();

  console.log('Enter OTP manually');

  await page.pause();

  await page.getByText('Yacht').click();

  await expect(
    page.getByText('Rental')
  ).toBeVisible();

});

