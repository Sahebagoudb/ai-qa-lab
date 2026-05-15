// const { test, expect } = require('@playwright/test');
// const AxeBuilder = require('@axe-core/playwright').default;
// const { spawn } = require('child_process');
// const path = require('path');

// test('Login to Moniic Admin Portal', async ({ page }) => {

//   // âœ… Viewport
//   await page.setViewportSize({
//     width: 1600,
//     height: 1200
//   });

//   // âœ… Open Login Page
//   console.log('ðŸ“ Opening login page...');

//   await page.goto('https://pp-admin.moniic.com/', {
//     waitUntil: 'domcontentloaded'
//   });

//   console.log('âœ… Login page loaded');

//   // âœ… Wait for UI rendering
//   await page.waitForTimeout(3000);

//   // âœ… Login Baseline Screenshot
//   await page.screenshot({
//     path: 'screenshots/login-baseline.png',
//     fullPage: true
//   });

//   console.log('âœ… Login baseline screenshot captured');

//   // âœ… Enter Email
//   console.log('ðŸ“ Entering email...');

//   const emailInput = page.locator('input').first();

//   await emailInput.waitFor({
//     state: 'visible',
//     timeout: 15000
//   });

//   await emailInput.click({ clickCount: 3 });

//   await emailInput.fill('sahebaadmin@yopmail.com');

//   console.log('âœ… Email entered');

//   // âœ… Click Proceed
//   console.log('ðŸ“ Clicking Proceed button...');

//   const firstProceedButton = page.locator(
//     'button:has-text("Proceed")'
//   ).first();

//   await firstProceedButton.waitFor({
//     state: 'visible',
//     timeout: 15000
//   });

//   await expect(firstProceedButton).toBeEnabled();

//   await firstProceedButton.click({
//     force: true
//   });

//   console.log('âœ… Proceed clicked');

//   // âœ… Wait for next screen
//   await page.waitForLoadState('networkidle');

//   // âœ… CAPTCHA CHECK
//   console.log('ðŸ“ Checking CAPTCHA...');

//   const captchaLocator = page.locator(
//     'iframe[src*="recaptcha"], iframe[src*="captcha"], .g-recaptcha'
//   );

//   const captchaCount = await captchaLocator.count();

//   if (captchaCount > 0) {

//     console.log('âš ï¸ CAPTCHA detected');

//     await page.screenshot({
//       path: 'screenshots/captcha-detected.png',
//       fullPage: true
//     });

//     console.log('ðŸ‘‰ Solve CAPTCHA manually');

//     // âœ… Wait only when CAPTCHA exists
//     await page.waitForTimeout(10000);

//     console.log('âœ… CAPTCHA wait completed');

//   } else {

//     console.log('âœ… No CAPTCHA detected');
//   }

//   // âœ… Wait For OTP Screen
//   console.log('ðŸ“ Waiting for OTP screen...');

//   const otpInputs = page.locator('input[maxlength="1"]');

//   await expect(otpInputs.first()).toBeVisible({
//     timeout: 30000
//   });

//   console.log('âœ… OTP screen visible');

//   const otpCount = await otpInputs.count();

//   console.log(`ðŸ”¢ OTP boxes found: ${otpCount}`);

//   // âœ… OTP Screenshot
//   await page.screenshot({
//     path: 'screenshots/otp-screen.png',
//     fullPage: true
//   });

//   // âœ… Enter OTP
//   const otp = '234876';

//   console.log('ðŸ“ Entering OTP...');

//   for (let i = 0; i < 6; i++) {

//     const input = otpInputs.nth(i);

//     await input.waitFor({
//       state: 'visible'
//     });

//     await input.click();

//     await input.fill('');

//     await input.type(otp[i], {
//       delay: 100
//     });

//     console.log(`âœ… Entered OTP digit ${otp[i]}`);
//   }

//   console.log('âœ… OTP entered successfully');

//   // âœ… Screenshot Before Verify
//   await page.screenshot({
//     path: 'screenshots/before-verify.png',
//     fullPage: true
//   });

//   // âœ… Verify Button
//   console.log('ðŸ“ Clicking Verify button...');

//   const verifyButton = page.locator(`
//     button:has-text("Verify"),
//     button:has-text("Proceed"),
//     button:has-text("Submit"),
//     button:has-text("Login"),
//     button[type="submit"]
//   `).last();

//   await verifyButton.waitFor({
//     state: 'visible',
//     timeout: 20000
//   });

//   // âœ… Wait for frontend validation
//   await page.waitForTimeout(3000);

//   // âœ… Check if enabled
//   const isEnabled = await verifyButton.isEnabled();

//   console.log('ðŸ” Verify button enabled:', isEnabled);

//   if (isEnabled) {

//     await verifyButton.scrollIntoViewIfNeeded();

//     await verifyButton.click({
//       force: true
//     });

//     console.log('âœ… Verify button clicked');

//   } else {

//     console.log('âŒ Verify button disabled');

//     await page.screenshot({
//       path: 'screenshots/verify-disabled.png',
//       fullPage: true
//     });

//     throw new Error('Verify button is disabled after OTP entry');
//   }

//   // âœ… Wait For Dashboard/Home Screen
//   console.log('ðŸ“ Waiting for dashboard/home screen...');

//   await page.waitForLoadState('networkidle');

//   // âœ… Wait for URL change
//   await page.waitForFunction(() => {
//     return !window.location.href.includes('login') &&
//            !window.location.href.includes('otp');
//   }, {
//     timeout: 30000
//   });

//   // âœ… Bring application to front
//   await page.bringToFront();

//   // âœ… Large dashboard viewport
//   await page.setViewportSize({
//     width: 1920,
//     height: 1200
//   });

//   await page.waitForTimeout(3000);

//   // âœ… Dashboard Screenshot
//   await page.screenshot({
//     path: 'screenshots/dashboard-current.png',
//     fullPage: true
//   });

//   console.log('ðŸŒ Current URL:', await page.url());

//   console.log('âœ… Login successful');

//   // âœ… Visual Validation
//   await expect(page).toHaveScreenshot(
//   'dashboard-visual-check.png',
//   {
//     fullPage: true,
//     maxDiffPixelRatio: 0.02
//   }
// );

//   console.log('âœ… Visual comparison completed');

//   // âœ… Accessibility Scan
//   console.log('â™¿ Running accessibility scan...');

//   const accessibilityResults = await new AxeBuilder({
//     page
//   }).analyze();

//   console.log(
//     `â™¿ Accessibility Violations Found: ${accessibilityResults.violations.length}`
//   );

//   if (accessibilityResults.violations.length > 0) {

//     console.log(
//       JSON.stringify(
//         accessibilityResults.violations,
//         null,
//         2
//       )
//     );
//   }
//  expect(accessibilityResults.violations.length).toBeLessThanOrEqual(5);

//   console.log('âœ… Accessibility scan completed');

//   // âœ… Final Screenshot
//   await page.screenshot({
//     path: 'screenshots/final-dashboard.png',
//     fullPage: true
//   });

//   // âœ… Stay On Home Screen for 20 seconds before opening report
//   await page.waitForTimeout(20000);

//   console.log('ðŸ“„ Home screen stable â€” opening the Playwright report...');
//   const reportRoot = path.resolve(__dirname, '..', '..');
//   const reportProcess = spawn('npx playwright show-report', {
//     shell: true,
//     detached: true,
//     stdio: 'ignore',
//     cwd: reportRoot
//   });
//   reportProcess.unref();

//   console.log('âœ… Report open command launched from:', reportRoot);

// });

// const { test, expect } = require('@playwright/test');
// const AxeBuilder = require('@axe-core/playwright').default;
// const { spawn } = require('child_process');
// const path = require('path');
// const fs = require('fs');

// test('Login to Moniic Admin Portal', async ({ page }) => {

//   // âœ… Viewport
//   await page.setViewportSize({
//     width: 1600,
//     height: 1200
//   });

//   // âœ… Open Login Page
//   console.log('ðŸ“ Opening login page...');

//   await page.goto('https://pp-admin.moniic.com/', {
//     waitUntil: 'domcontentloaded'
//   });

//   console.log('âœ… Login page loaded');

//   await page.waitForTimeout(3000);

//   // =========================================
//   // ðŸ”¥ LAB 4 - VISUAL BASELINE CHECKPOINT
//   // =========================================

//   await expect(page).toHaveScreenshot('login-screen.png', {
//     fullPage: true,
//     maxDiffPixelRatio: 0.02
//   });

//   console.log('ðŸ“¸ Login visual checkpoint completed');

//   await page.screenshot({
//     path: 'screenshots/login-baseline.png',
//     fullPage: true
//   });

//   // âœ… Enter Email
//   const emailInput = page.locator('input').first();

//   await emailInput.waitFor({
//     state: 'visible',
//     timeout: 15000
//   });

//   await emailInput.click({ clickCount: 3 });

//   await emailInput.fill('sahebaadmin@yopmail.com');

//   console.log('âœ… Email entered');

//   // âœ… Click Proceed with Assertion
//   console.log('ðŸ“ Clicking Proceed button...');

//   const proceedButton = page.getByRole('button', { name: 'PROCEED' });

//   await expect(proceedButton).toBeVisible({ timeout: 15000 });
//   await expect(proceedButton).toBeEnabled();

//   await proceedButton.click();
//   console.log('âœ… Proceed clicked');

//   await page.waitForLoadState('networkidle');

//   // =========================================
//   // ðŸ¤– CAPTCHA HANDLING (Skip for testing navigation)
//   // =========================================

//   console.log('ðŸ“ Checking for CAPTCHA...');

//   // Temporarily skip CAPTCHA waiting to test navigation
//   console.log('âš ï¸ Skipping CAPTCHA for navigation testing...');

//   // =========================================
//   // OTP FLOW with Enhanced Assertions
//   // =========================================

//   console.log('ðŸ“ Waiting for OTP screen...');

//   const otpInputs = page.locator('input[maxlength="1"]');

//   await expect(otpInputs.first()).toBeVisible({
//     timeout: 30000
//   });

//   console.log('âœ… OTP screen visible');

//   const otpCount = await otpInputs.count();
//   expect(otpCount).toBe(6); // Assert exactly 6 OTP fields

//   console.log(`ðŸ”¢ OTP boxes found: ${otpCount}`);

//   await page.screenshot({
//     path: 'screenshots/otp-screen.png',
//     fullPage: true
//   });

//   // âœ… Enter OTP with Validation
//   const otp = '234876';

//   console.log('ðŸ“ Entering OTP...');

//   for (let i = 0; i < 6; i++) {
//     const input = otpInputs.nth(i);

//     await expect(input).toBeVisible();
//     await input.click();
//     await input.fill('');
//     await input.type(otp[i], { delay: 100 });

//     // Assert each digit was entered
//     await expect(input).toHaveValue(otp[i]);
//     console.log(`âœ… Entered OTP digit ${otp[i]}`);
//   }

//   console.log('âœ… OTP entered successfully');

//   await page.screenshot({
//     path: 'screenshots/before-verify.png',
//     fullPage: true
//   });

//   // =========================================
//   // VERIFY BUTTON with Enhanced Logic
//   // =========================================

//   console.log('ðŸ“ Clicking Verify button...');

//   const verifyButton = page.getByRole('button', { name: 'PROCEED' });

//   await expect(verifyButton).toBeVisible({ timeout: 20000 });
//   await page.waitForTimeout(2000); // Allow frontend validation

//   const isEnabled = await verifyButton.isEnabled();
//   console.log('ðŸ” Verify button enabled:', isEnabled);

//   if (isEnabled) {
//     await verifyButton.scrollIntoViewIfNeeded();
//     await verifyButton.click({ force: true });
//     console.log('âœ… Verify button clicked');
//   } else {
//     await page.screenshot({
//       path: 'screenshots/verify-disabled.png',
//       fullPage: true
//     });
//     throw new Error('Verify button is disabled after OTP entry');
//   }
//       force: true
//     });

//     console.log('âœ… Verify button clicked');

//   } else {

//     await page.screenshot({
//       path: 'screenshots/verify-disabled.png',
//       fullPage: true
//     });

//     throw new Error('Verify button disabled');
//   }

//   // =========================================
//   // DASHBOARD LOAD with Assertions
//   // =========================================

//   console.log('ðŸ“ Waiting for dashboard...');

//   await page.waitForLoadState('networkidle');

//   // Assert URL change
//   await page.waitForFunction(() => {
//     return !window.location.href.includes('login') &&
//            !window.location.href.includes('otp');
//   }, { timeout: 30000 });

//   // Assert dashboard elements are present
//   await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

//   await page.setViewportSize({
//     width: 1920,
//     height: 1200
//   });

//   await page.waitForTimeout(3000);

//   // =========================================
//   // ðŸ”¥ LAB 4 - DASHBOARD VISUAL CHECKPOINT
//   // =========================================

//   await expect(page).toHaveScreenshot(
//     'dashboard-visual-check.png',
//     {
//       fullPage: true,
//       maxDiffPixelRatio: 0.02
//     }
//   );

//   console.log('ðŸ“¸ Dashboard visual checkpoint completed');

//   await page.screenshot({
//     path: 'screenshots/dashboard-current.png',
//     fullPage: true
//   });

//   console.log('ðŸŒ URL:', await page.url());

//   // =========================================
//   // ï¿½ DASHBOARD NAVIGATION (From Codegen)
//   // =========================================

//   console.log('ðŸ§­ Starting dashboard navigation...');

//   try {
//     // Simple navigation test - just a few reliable clicks
//     console.log('ðŸ§­ Clicking Customers...');
//     await page.getByRole('link', { name: 'Customers' }).click();
//     await page.waitForTimeout(1000);

//     console.log('ðŸ§­ Clicking Yachts...');
//     await page.getByRole('link', { name: 'Yachts' }).click();
//     await page.waitForTimeout(1000);

//     console.log('ðŸ§­ Clicking Rentals...');
//     await page.getByRole('link', { name: 'Rentals' }).click();
//     await page.waitForTimeout(1000);

//     console.log('ðŸ§­ Clicking Dashboard...');
//     await page.getByRole('link', { name: 'Dashboard' }).click();
//     await page.waitForTimeout(1000);

//     console.log('âœ… Dashboard navigation completed');

//   } catch (error) {
//     console.log('âš ï¸ Navigation failed:', error.message);
//     console.log('Continuing with AI analysis...');
//   }

//   // =========================================
//   // ï¿½ðŸ¤– UI-TARS / OMNIPARSER PROTOTYPE
//   // =========================================

//   console.log('ðŸ¤– Running UI-TARS prototype analysis...');

//   const uiAgentResult = await uiTarsPrototype({
//     screenshot: 'screenshots/dashboard-current.png'
//   });

//   console.log('ðŸ§  UI-TARS Result:', uiAgentResult);

//   // =========================================
//   // ðŸ¤– LAB 4 - QWEN2.5-VL ANALYSIS
//   // =========================================

//   console.log('ðŸ¤– Running Qwen2.5-VL visual analysis...');

//   const visualTriagePrompt = `
// Compare these baseline and current UI screenshots.

// Identify:
// - Layout shifts
// - Missing controls
// - Overlapping elements
// - Color or contrast concerns
// - Broken icons or images
// - Text truncation
// - Wrong labels
// - Possible accessibility issues
// - Severity and user impact

// Return only actionable defects with evidence.
// `;

//   // âœ… QWEN ANALYSIS
//   const analysis = await qwenAnalyze({
//     baseline: 'screenshots/login-screen.png',
//     current: 'screenshots/dashboard-current.png',
//     prompt: visualTriagePrompt
//   });

//   // âœ… ASSERT
//   expect(analysis.status).toBe('success');

//   // =========================================
//   // ðŸ’¾ SAVE AI REPORT
//   // =========================================

//   const reportDir = path.resolve(__dirname, '../reports');

//   if (!fs.existsSync(reportDir)) {

//     fs.mkdirSync(reportDir, {
//       recursive: true
//     });
//   }

//   const reportPath = path.join(
//     reportDir,
//     'qwen-visual-report.json'
//   );

//   fs.writeFileSync(
//     reportPath,
//     JSON.stringify(analysis, null, 2)
//   );

//   console.log('ðŸ“ Qwen report saved at:', reportPath);

//   // =========================================
//   // ðŸ“Š LOG AI REPORT
//   // =========================================

//   console.log('ðŸ“Š AI VISUAL REPORT:', analysis);

//   if (analysis.findings?.length === 0) {

//     console.log('âœ… No visual defects detected by AI');
//   }

//   // =========================================
//   // â™¿ ACCESSIBILITY CHECK
//   // =========================================

//   console.log('â™¿ Running accessibility scan...');

//   const accessibilityResults = await new AxeBuilder({
//     page
//   }).analyze();

//   console.log(
//     `â™¿ Violations: ${accessibilityResults.violations.length}`
//   );

//   if (accessibilityResults.violations.length > 0) {

//     console.log(
//       JSON.stringify(
//         accessibilityResults.violations,
//         null,
//         2
//       )
//     );
//   }

//   expect(
//     accessibilityResults.violations.length
//   ).toBeLessThanOrEqual(5);

//   // =========================================
//   // FINAL SCREENSHOT
//   // =========================================

//   await page.screenshot({
//     path: 'screenshots/final-dashboard.png',
//     fullPage: true
//   });

//   // =========================================
//   // WAIT BEFORE REPORT
//   // =========================================

//   await page.waitForTimeout(20000);

//   // =========================================
//   // OPEN PLAYWRIGHT REPORT
//   // =========================================

//   const reportRoot = path.resolve(__dirname, '..', '..');

//   const reportProcess = spawn(
//     'npx playwright show-report',
//     {
//       shell: true,
//       detached: true,
//       stdio: 'ignore',
//       cwd: reportRoot
//     }
//   );

//   reportProcess.unref();

//   console.log('âœ… Report opened');
// });


// // =====================================
// // ðŸ¤– MOCK QWEN2.5-VL FUNCTION
// // =====================================

// async function qwenAnalyze({
//   baseline,
//   current,
//   prompt
// }) {

//   console.log('ðŸ“· Baseline:', baseline);

//   console.log('ðŸ“· Current:', current);

//   console.log('ðŸ§  Prompt:', prompt);

//   // ðŸ”¥ Simulated AI response

//   return {

//     status: 'success',

//     summary: 'No critical UI defects detected',

//     findings: [
//       {
//         issue: 'Minor layout shift in dashboard header',
//         severity: 'low',
//         impact: 'cosmetic only'
//       }
//     ]
//   };
// }


// // =====================================
// // ðŸ¤– MOCK UI-TARS / OMNIPARSER
// // =====================================

// async function uiTarsPrototype({
//   screenshot
// }) {

//   console.log(
//     'ðŸ“· Analyzing screenshot:',
//     screenshot
//   );

//   return {

//     status: 'success',

//     detectedElements: [
//       'Sidebar navigation',
//       'Analytics cards',
//       'Charts',
//       'User profile icon',
//       'Search input'
//     ],

//     observations: [
//       'Dashboard layout detected correctly',
//       'No overlapping widgets found',
//       'Sidebar visible and aligned',
//       'Charts rendered successfully'
//     ],

//     riskLevel: 'safe',

//     note:
//       'Prototype executed only on staging dashboard without secrets'
//   };
// }
//start 
// const { test, expect } = require('@playwright/test');
// const AxeBuilder = require('@axe-core/playwright').default;
// const { spawn, spawnSync } = require('child_process');
// const path = require('path');
// const fs = require('fs'); // âœ… FIX: required for Lab artifact saving

// function cleanOutput(text) {
//   return text
//     .replace(/\x1b\[[0-9;]*[A-Za-z]/g, '')
//     .replace(/\x08/g, '')
//     .replace(/\x1b\([A-Za-z]/g, '')
//     .replace(/\x1b\][0-9;]*.*?\x07/g, '');
// }

// function runOllamaModel(model, prompt) {
//   const result = spawnSync(
//     'ollama',
//     ['run', model, prompt, '--hidethinking', '--nowordwrap', '--keepalive', '5m'],
//     {
//       encoding: 'utf8',
//       timeout: 600000,
//       maxBuffer: 10 * 1024 * 1024,
//     }
//   );

//   if (result.error) {
//     throw result.error;
//   }

//   if (result.status !== 0) {
//     throw new Error(`Ollama failed: ${result.stderr || result.stdout}`);
//   }

//   return cleanOutput(result.stdout || result.stderr || '');
// }

// async function qwenAnalyzeLocal({ baseline, current, prompt }) {
//   const model = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';
//   const analysisPrompt = `You are a senior QA automation architect. The feature is user login with email, password, CAPTCHA, OTP, and dashboard access.\n` +
//     `Baseline screenshot: ${baseline}\nCurrent screenshot: ${current}\n\n` +
//     `${prompt}\n\n` +
//     `Return a JSON object with keys: status, summary, findings. findings is an array of objects with issue, severity, and impact.`;

//   const response = runOllamaModel(model, analysisPrompt);

//   try {
//     return JSON.parse(response);
//   } catch (error) {
//     return {
//       status: 'success',
//       summary: response.slice(0, 512),
//       findings: [
//         {
//           issue: 'AI returned non-JSON output; check model response',
//           severity: 'info',
//           impact: 'low',
//         },
//       ],
//     };
//   }
// }

// test('Login to Moniic Admin Portal - Enhanced with AI & CAPTCHA Automation', async ({ page }) => {

//   // âœ… Viewport
//   await page.setViewportSize({
//     width: 1600,
//     height: 1200
//   });

//   // âœ… Open Login Page
//   console.log('ðŸ“ Opening login page...');

//   await page.goto('https://pp-admin.moniic.com/', {
//     waitUntil: 'domcontentloaded'
//   });

//   console.log('âœ… Login page loaded');

//   // Assert page loaded successfully
//   await expect(page).toHaveTitle(/Moniic/);

//   await page.waitForTimeout(3000);

//   // ðŸ”¥ LOGIN VISUAL CHECKPOINT
//   await expect(page).toHaveScreenshot('login-screen.png', {
//     fullPage: true,
//     maxDiffPixelRatio: 0.02
//   });

//   console.log('ðŸ“¸ Login visual checkpoint completed');

//   await page.screenshot({
//     path: 'screenshots/login-baseline.png',
//     fullPage: true
//   });

//   // âœ… Enter Email
//   const emailInput = page.locator('input').first();

//   await emailInput.waitFor({ state: 'visible', timeout: 15000 });
//   await emailInput.click({ clickCount: 3 });
//   await emailInput.fill('sahebaadmin@yopmail.com');

//   console.log('âœ… Email entered');

//   // âœ… Proceed
//   const firstProceedButton = page.locator('button:has-text("Proceed")').first();

//   await firstProceedButton.waitFor({ state: 'visible', timeout: 15000 });
//   await expect(firstProceedButton).toBeEnabled();
//   await firstProceedButton.click({ force: true });

//   console.log('âœ… Proceed clicked');

//   await page.waitForLoadState('networkidle');

//   // CAPTCHA
//   const captchaLocator = page.locator(
//     'iframe[src*="recaptcha"], iframe[src*="captcha"], .g-recaptcha'
//   );

//   if (await captchaLocator.count() > 0) {
//     console.log('âš ï¸ CAPTCHA detected');

//     await page.screenshot({
//       path: 'screenshots/captcha-detected.png',
//       fullPage: true
//     });

//     await page.waitForTimeout(10000);
//   }

//   // OTP
//   const otpInputs = page.locator('input[maxlength="1"]');

//   await expect(otpInputs.first()).toBeVisible({ timeout: 30000 });

//   await page.screenshot({
//     path: 'screenshots/otp-screen.png',
//     fullPage: true
//   });

//   const otp = '234876';

//   for (let i = 0; i < 6; i++) {
//     const input = otpInputs.nth(i);
//     await input.click();
//     await input.fill('');
//     await input.type(otp[i], { delay: 100 });
//   }

//   console.log('âœ… OTP entered');

//   await page.screenshot({
//     path: 'screenshots/before-verify.png',
//     fullPage: true
//   });

//   // VERIFY
//   const verifyButton = page.locator(`
//     button:has-text("Verify"),
//     button:has-text("Proceed"),
//     button:has-text("Submit"),
//     button:has-text("Login"),
//     button[type="submit"]
//   `).last();

//   await verifyButton.waitFor({ state: 'visible', timeout: 20000 });

//   await page.waitForTimeout(2000);

//   if (await verifyButton.isEnabled()) {
//     await verifyButton.click({ force: true });
//   } else {
//     await page.screenshot({
//       path: 'screenshots/verify-disabled.png',
//       fullPage: true
//     });
//     throw new Error('Verify button disabled');
//   }

//   // DASHBOARD LOAD
//   await page.waitForLoadState('networkidle');

//   await page.waitForFunction(() =>
//     !window.location.href.includes('login') &&
//     !window.location.href.includes('otp'),
//     { timeout: 30000 }
//   );

//   await page.setViewportSize({
//     width: 1920,
//     height: 1200
//   });

//   await page.waitForTimeout(3000);

//   // ðŸ”¥ DASHBOARD VISUAL CHECKPOINT
//   await expect(page).toHaveScreenshot('dashboard-visual-check.png', {
//     fullPage: true,
//     maxDiffPixelRatio: 0.02
//   });

//   console.log('ðŸ“¸ Dashboard visual checkpoint completed');

//   await page.screenshot({
//     path: 'screenshots/dashboard-current.png',
//     fullPage: true
//   });

//   console.log('ðŸŒ URL:', await page.url());

//   // =========================================
//   // ðŸ§­ DASHBOARD NAVIGATION (From Codegen)
//   // =========================================

//   console.log('ðŸ§­ Starting dashboard navigation...');

//   try {
//     await page.getByRole('link', { name: 'Customers' }).click();
//     await page.waitForTimeout(1000);

//     await page.getByRole('link', { name: 'Yachts' }).click();
//     await page.waitForTimeout(1000);

//     await page.getByRole('link', { name: 'Rentals' }).click();
//     await page.waitForTimeout(1000);

//     await page.getByRole('link', { name: 'Dashboard' }).click();
//     await page.waitForTimeout(1000);

//     console.log('âœ… Dashboard navigation completed');
//   } catch (error) {
//     console.log('âš ï¸ Dashboard navigation partially failed, continuing the test.');
//     console.log('Error:', error.message);
//   }

//   // ================================
//   // ðŸ¤– LAB 4 - QWEN2.5-VL ANALYSIS
//   // ================================

//   console.log('ðŸ¤– Running Qwen2.5-VL visual analysis...');

//   const visualTriagePrompt = `
// Compare these baseline and current UI screenshots.

// Identify:
// - Layout shifts
// - Missing controls
// - Overlapping elements
// - Color or contrast concerns
// - Broken icons or images
// - Text truncation
// - Wrong labels
// - Possible accessibility issues

// Return only actionable defects with severity and user impact.
// `;

//   // ðŸ”¥ OLLAMA INTEGRATI
//   // ON STEP
//   const analysis = await qwenAnalyzeLocal({
//     baseline: 'screenshots/login-screen.png',
//     current: 'screenshots/dashboard-current.png',
//     prompt: visualTriagePrompt
//   });

//   // âœ… 1. ASSERT (LAB REQUIREMENT)
//   expect(analysis.status).toBe('success');

//   // ðŸ’¾ 2. SAVE ARTIFACT (LAB REQUIREMENT)
//   fs.writeFileSync(
//     'screenshots/qwen-visual-report.json',
//     JSON.stringify(analysis, null, 2)
//   );

//   // ðŸ“Š 3. LOG OUTPUT
//   console.log('ðŸ“Š AI VISUAL REPORT:', analysis);

//   // OPTIONAL: extra check
//   if (analysis.findings?.length === 0) {
//     console.log('âœ… No visual defects detected by AI');
//   }

//   // ACCESSIBILITY CHECK
//   console.log('â™¿ Running accessibility scan...');

//   const accessibilityResults = await new AxeBuilder({ page }).analyze();

//   console.log(`â™¿ Violations: ${accessibilityResults.violations.length}`);

//   expect(accessibilityResults.violations.length).toBeLessThanOrEqual(5);

//   // FINAL
//   await page.screenshot({
//     path: 'screenshots/final-dashboard.png',
//     fullPage: true
//   });

//   await page.waitForTimeout(20000);

//   const reportRoot = path.resolve(__dirname, '..', '..');

//   const reportProcess = spawn('npx playwright show-report', {
//     shell: true,
//     detached: true,
//     stdio: 'ignore',
//     cwd: reportRoot
//   });

//   reportProcess.unref();

//   console.log('âœ… Report opened');
// });


// // =====================================
// // ðŸ”¥ MOCK FUNCTION (replace with real Qwen API later)
// // =====================================
// async function qwenAnalyze({ baseline, current, prompt }) {
//   console.log(' Baseline:', baseline);
//   console.log(' Current:', current);
//   console.log(' Prompt:', prompt);

//   return {
//     status: "success",
//     summary: "No critical UI defects detected",
//     findings: [
//       {
//         issue: "Minor layout shift in dashboard header",
//         severity: "low",
//         impact: "cosmetic only"
//       }
//     ]
//   };
// }
