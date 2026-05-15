import { test, expect } from '@playwright/test';

test('Successful login regression - Moniic Admin Portal', async ({ page }) => {
  await page.goto('https://pp-admin.moniic.com/login', {
    waitUntil: 'domcontentloaded'
  });

  await expect(page).toHaveTitle(/Moniic/i);

  const emailInput = page.getByRole('textbox', { name: /email/i }).first();
  await expect(emailInput).toBeVisible({ timeout: 15000 });
  await emailInput.fill('sahebaadmin@yopmail.com');

  const proceedButton = page.getByRole('button', { name: /proceed/i }).first();
  await expect(proceedButton).toBeEnabled({ timeout: 15000 });
  await proceedButton.click();

  await page.waitForLoadState('networkidle');
  await page.waitForURL(/otp/, { timeout: 60000 }).catch(() => {
    console.log('⚠️ OTP URL did not arrive within 60s, continuing by waiting for OTP fields');
  });

  const captchaLocator = page.locator('iframe[src*="recaptcha"], iframe[src*="captcha"], .g-recaptcha');
  if (await captchaLocator.count() > 0) {
    console.log('⚠️ CAPTCHA detected, waiting for 10 seconds');
    await page.screenshot({ path: 'screenshots/captcha-detected-manual-login.png', fullPage: true });
    await page.waitForTimeout(10000);
  }

  const otpInputs = page.locator('input[type="tel"][maxlength="1"], input[id^="otp_"]');
  await expect(otpInputs.first()).toBeVisible({ timeout: 60000 });

  const otp = '234876';
  for (let index = 0; index < otp.length; index++) {
    const input = otpInputs.nth(index);
    await input.click();
    await input.type(otp[index], { delay: 50 });
  }

  await page.waitForTimeout(1000);

  const verifyButton = page.getByRole('button', { name: /(proceed|verify|login|submit)/i }).last();
  await expect(verifyButton).toBeEnabled({ timeout: 15000 });
  await verifyButton.click();

  await page.waitForURL(/analytics/, { timeout: 60000 });
  await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=Customers')).toBeVisible({ timeout: 15000 });
});