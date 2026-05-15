
import { test, expect } from '@playwright/test';

// Increase timeout to handle CAPTCHA + OTP manually
test.setTimeout(600000);

test('Moniic Complete Dashboard Regression', async ({ page }) => {

  // ---------------- LOGIN STEP ----------------

  await test.step('Login to application', async () => {

    // Open login page
    await page.goto('https://pp-admin.moniic.com/login');

    // Verify login page opened
    await expect(page).toHaveURL(/login/);

    // Enter email
    await page.getByRole('textbox', { name: 'Email' })
      .fill('sahebaadmin@yopmail.com');

    // Small delay for stability
    await page.waitForTimeout(2000);

    // Click Proceed
    await page.getByRole('button', { name: 'PROCEED' })
      .click();

    // Wait for CAPTCHA screen
    await page.waitForLoadState('networkidle');

    console.log('Solve CAPTCHA and enter OTP manually');

    // Manual CAPTCHA + OTP handling time
    await page.waitForTimeout(300000);

    // Verify login successful
    await expect(page).not.toHaveURL(/login/);

  });

  // ---------------- YACHT MODULE ----------------

  await test.step('Verify Yacht module', async () => {

    // Wait for dashboard load
    await page.waitForLoadState('networkidle');

    // Open Yacht module
    const yachtMenu = page.getByText('Yacht');

    await expect(yachtMenu).toBeVisible({
      timeout: 60000
    });

    await yachtMenu.click();

    // Verify Yacht module loaded
    await expect(
      page.locator('body')
    ).toContainText('Rental');

  });

  // ---------------- CUSTOMERS MODULE ----------------

  await test.step('Verify Customers module', async () => {

    // Wait for page stability
    await page.waitForLoadState('networkidle');

    // Open Customers module
    const customersMenu = page.getByRole('link', {
      name: /Customers/i
    });

    await expect(customersMenu).toBeVisible({
      timeout: 60000
    });

    await customersMenu.click();

    // Wait for Customers page
    await page.waitForTimeout(3000);

    // Verify Customers page loaded
    await expect(
      page.locator('body')
    ).toContainText('Customers');

  });

});

