import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pp-admin.moniic.com/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('sahebaadmin@yopmail.com');
  await page.getByRole('button', { name: 'PROCEED' }).click();
  await page.getByRole('textbox').nth(1).fill('3');
  await page.getByRole('textbox').nth(2).fill('4');
  await page.getByRole('textbox').nth(3).fill('8');
  await page.getByRole('textbox').nth(4).fill('7');
  await page.getByRole('textbox').nth(5).fill('6');
  await page.getByRole('button', { name: 'PROCEED' }).click();
  await page.getByRole('link', { name: 'Customers' }).click();
  await page.getByText('Partners .a { fill: #f0f2f5').click();
  await page.getByRole('link', { name: 'Yachts' }).click();
  await page.getByRole('link', { name: 'Rentals' }).click();
  await page.locator('a').filter({ hasText: '.a, .b { fill: #fff; } .b {' }).click();
  await page.getByRole('link', { name: 'Configurations' }).click();
  await page.getByRole('link', { name: 'Ride' }).click();
  await page.getByRole('link', { name: 'Yachts' }).click();
  await page.getByRole('link', { name: 'Our Fleet' }).click();
  await page.getByRole('link', { name: 'Configurations' }).click();
  await page.getByText('Partners .a { fill: #f0f2f5').click();
  await page.getByText('Yacht Settings').click();
  await page.getByText('Rental Settings').click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
});