const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://pp-admin.moniic.com/login', { waitUntil: 'domcontentloaded' });
  await page.getByRole('textbox', { name: 'Email' }).fill('sahebaadmin@yopmail.com');
  await page.getByRole('button', { name: /proceed/i }).click();
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/debug-after-proceed.png', fullPage: true });

  console.log('--- PAGE URL ---', page.url());
  const otpInputs = await page.locator('input[maxlength="1"]').elementHandles();
  console.log('OTP input count:', otpInputs.length);
  for (let i = 0; i < otpInputs.length; i++) {
    const el = otpInputs[i];
    const id = await el.getAttribute('id');
    const name = await el.getAttribute('name');
    const type = await el.getAttribute('type');
    console.log(`otp[${i}] id=${id} name=${name} type=${type}`);
  }

  const buttons = await page.locator('button').elementHandles();
  console.log('BUTTON count:', buttons.length);
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const text = await btn.innerText();
    const disabled = await btn.getAttribute('disabled');
    const enabled = await btn.isEnabled();
    console.log(`button[${i}] text='${text.trim()}' disabled=${disabled} enabled=${enabled}`);
  }

  const otp = '234876';
  for (let index = 0; index < otp.length; index++) {
    const input = page.locator('input[maxlength="1"]').nth(index);
    await input.click();
    await input.type(otp[index], { delay: 50 });
  }

  await page.waitForTimeout(2000);
  console.log('After typing OTP:');
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const enabled = await btn.isEnabled();
    console.log(`button[${i}] enabled after OTP=${enabled}`);
  }

  await page.waitForTimeout(30000);
  await browser.close();
})();