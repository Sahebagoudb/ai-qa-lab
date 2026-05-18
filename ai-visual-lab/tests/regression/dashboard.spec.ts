
// import { test, expect } from '@playwright/test';

// // Increase timeout to handle CAPTCHA + OTP manually
// test.setTimeout(600000);

// test('Moniic Complete Dashboard Regression', async ({ page }) => {

//   // ---------------- LOGIN STEP ----------------

//   await test.step('Login to application', async () => {

//     // Open login page
//     await page.goto('https://dev-auth.hivecharge.click/');

//     // Verify login page opened
//     await expect(page).toHaveURL(/login/);

//     // Enter email
//     await page.getByRole('textbox', { name: 'Email' })
//       .fill('sahebaadmin@yopmail.com');

//     // Small delay for stability
//     await page.waitForTimeout(2000);

//     // Click Proceed
//     await page.getByRole('button', { name: 'PROCEED' })
//       .click();

//     // Wait for CAPTCHA screen
//     await page.waitForLoadState('networkidle');

//     console.log('Solve CAPTCHA and enter OTP manually');

//     // Manual CAPTCHA + OTP handling time
//     await page.waitForTimeout(300000);

//     // Verify login successful
//     await expect(page).not.toHaveURL(/login/);

//   });

//   // ---------------- YACHT MODULE ----------------

//   await test.step('Verify Yacht module', async () => {

//     // Wait for dashboard load
//     await page.waitForLoadState('networkidle');

//     // Open Yacht module
//     const yachtMenu = page.getByText('Yacht');

//     await expect(yachtMenu).toBeVisible({
//       timeout: 60000
//     });

//     await yachtMenu.click();

//     // Verify Yacht module loaded
//     await expect(
//       page.locator('body')
//     ).toContainText('Rental');

//   });

//   // ---------------- CUSTOMERS MODULE ----------------

//   await test.step('Verify Customers module', async () => {

//     // Wait for page stability
//     await page.waitForLoadState('networkidle');

//     // Open Customers module
//     const customersMenu = page.getByRole('link', {
//       name: /Customers/i
//     });

//     await expect(customersMenu).toBeVisible({
//       timeout: 60000
//     });

//     await customersMenu.click();

//     // Wait for Customers page
//     await page.waitForTimeout(3000);

//     // Verify Customers page loaded
//     await expect(
//       page.locator('body')
//     ).toContainText('Customers');

//   });

// });

import { test, expect } from '@playwright/test';

test.setTimeout(600000);

test('Moniic Admin - Add Car Flow', async ({ page }) => {

  // ---------------- MAXIMIZE WINDOW ----------------

  await page.setViewportSize({
    width: 1920,
    height: 1080
  });

  // ---------------- OPEN LOGIN PAGE ----------------

  await test.step('Open Login Page', async () => {

    await page.goto('https://pp-admin.moniic.com/login');

    await expect(page).toHaveURL(/login/);

  });

  // ---------------- ENTER EMAIL ----------------

  await test.step('Enter Email', async () => {

    await page.getByRole('textbox', {
      name: 'Email'
    }).fill('sahebaadmin@yopmail.com');

    await page.getByRole('button', {
      name: 'PROCEED'
    }).click();

  });

  // ---------------- CAPTCHA ----------------

  await test.step('Solve CAPTCHA Manually', async () => {

    console.log('Solve CAPTCHA within 1 minute');

    // Give time for CAPTCHA solving
    await page.waitForTimeout(60000);

  });

  // ---------------- OTP ----------------

  await test.step('Enter OTP Automatically', async () => {

    console.log('Entering default OTP');

    // Wait OTP field visible
    await expect(
      page.getByRole('textbox').nth(1)
    ).toBeVisible({
      timeout: 60000
    });

    // Enter OTP
 const otp = '234876';

const otpInputs = page.locator('input[id*="otp_"]');

// Wait OTP fields
await expect(otpInputs.first()).toBeVisible({
  timeout: 60000
});

// Type OTP like real user
for (let i = 0; i < 6; i++) {

  await otpInputs.nth(i).click();

  await otpInputs.nth(i).press('Control+A');

  await otpInputs.nth(i).press('Backspace');

  await otpInputs.nth(i).type(otp[i], {
    delay: 300
  });

}

// Trigger Angular validation
await otpInputs.nth(5).press('Tab');

// Small wait
await page.waitForTimeout(3000);

// Proceed button
const proceedButton = page.getByRole('button', {
  name: /PROCEED/i
});

// Wait until enabled
await expect(proceedButton).toBeEnabled({
  timeout: 60000
});

// Click Proceed
await proceedButton.click();

    // Wait validation
    await page.waitForTimeout(3000);

  

    // Wait dashboard load
    await expect(
      page.locator('text=Assets').first()
    ).toBeVisible({
      timeout: 180000
    });

  });

  // ---------------- NAVIGATE TO ASSETS ----------------

  await test.step('Navigate To Assets', async () => {

    // Click Assets
    await page.getByText('Assets').first().click();

    // Wait page stable
    await page.waitForTimeout(3000);

  });

  // ---------------- SELECT CITY ----------------

  await test.step('Select Dubai City', async () => {

    // Select Dubai using recorded locator
    await page.getByLabel('Select City')
      .selectOption('da76e42d-c7ce-44a9-bfa1-a93eaf0c80c8');

    // Wait city load
    await page.waitForTimeout(5000);

  });

  // ---------------- NAVIGATE TO CAR ----------------

  await test.step('Navigate To Car Module', async () => {

    // Click Assets again if needed
    await page.getByText('Assets').first().click();

    // Click Car
    await page.getByRole('link', {
      name: 'Car'
    }).click();

    // Wait page load
    await page.waitForLoadState('networkidle');

    // Verify Add New visible
    await expect(
      page.getByText('+ ADD NEW')
    ).toBeVisible({
      timeout: 30000
    });

  });

  // ---------------- ADD NEW CAR ----------------

  await test.step('Add New Car', async () => {

  // Click Add New
  await page.getByText('+ ADD NEW').click();

  // Wait form open
  const licensePlateField = page.getByRole('textbox', {
    name: /License Plate/i
  });

  await expect(licensePlateField).toBeVisible({
    timeout: 30000
  });

  await page.waitForTimeout(2000);

  // Upload Car Image
  await page.locator('input[type="file"]')
    .first()
    .setInputFiles('ai-visual-lab/test-data/Thar.jpg');

  await page.waitForTimeout(2000);

  // License Plate
// Generate random License Plate
// Format: L + 5 digits
const randomPlate =
  'L' + Math.floor(10000 + Math.random() * 90000);

// Generate random VIN (17 digits)
const randomVIN =
  Date.now().toString().slice(-10) +
  Math.floor(1000000 + Math.random() * 9000000);

console.log('License Plate:', randomPlate);
console.log('VIN:', randomVIN);

// License Plate
await licensePlateField.click();

await licensePlateField.fill('');

await licensePlateField.type(randomPlate, {
  delay: 200
});

await page.waitForTimeout(1000);

// VIN Number
const vinField = page.getByRole('textbox', {
  name: /VIN/i
});

await vinField.click();

await vinField.fill('');

await vinField.type(randomVIN, {
  delay: 120
});

await page.waitForTimeout(1000);

  // Car Make
  await page.getByRole('textbox', {
    name: /Car Make/i
  }).type('Bentley', {
    delay: 150
  });

  await page.waitForTimeout(1000);

  // Car Model
  await page.locator('select[name="carModel"]')
    .selectOption({ index: 1 });

// // Car Model
// await page.locator('select[name="carModel"]')
//   .selectOption('415---2aca5d91-0b01-4d13-b6ec-65aa0ccd69dd');

// // Partner
// await page.locator('select[name="partner"]')
//   .selectOption('292bef11-b875-4f29-9866-9c69edc3ec1f');



  await page.waitForTimeout(1500);

  // Manufacture Year
  await page.getByRole('textbox', {
    name: /Manufacture Year/i
  }).type('2025', {
    delay: 150
  });

  await page.waitForTimeout(1000);

  // Colour
  await page.getByRole('textbox', {
    name: /Colour/i
  }).type('Green', {
    delay: 150
  });

  await page.waitForTimeout(1000);

  // Max Passengers
  await page.getByPlaceholder(/Max. Passengers/i)
    .type('4');

  await page.waitForTimeout(1000);

  // Max Bags
  await page.getByPlaceholder(/Max. Bags/i)
    .type('4');

  await page.waitForTimeout(1000);

  // Partner
  await page.locator('select[name="partner"]')
    .selectOption({ index: 1 });

  await page.waitForTimeout(1500);

  // Upload Registration File
  await page.locator('input[type="file"]')
    .nth(1)
    .setInputFiles('ai-visual-lab/test-data/Thar.jpg');

  await page.waitForTimeout(2000);

  // Upload Insurance File
  await page.locator('input[type="file"]')
    .nth(2)
    .setInputFiles('ai-visual-lab/test-data/Thar.jpg');

  await page.waitForTimeout(2000);

  // Vehicle Registration Number
  await page.getByRole('textbox', {
    name: /Vehicle/i
  }).type('TRH53231456329321321311', {
    delay: 80
  });

  await page.waitForTimeout(1000);

  // Registration Expiry Date
  const expiryDate = page.getByPlaceholder(/Expiry Date/i);

  await expiryDate.click();

  await expiryDate.fill('2026-08-09');

  // Visual delay
  await page.waitForTimeout(3000);

 // Click outside to trigger Angular validation
await page.locator('body').click();

await page.waitForTimeout(3000);

// Confirm button
const confirmButton = page.getByRole('button', {
  name: /Confirm/i
});

// Scroll to confirm button
await confirmButton.scrollIntoViewIfNeeded();

// Wait enabled
await expect(confirmButton).toBeEnabled({
  timeout: 30000
});

// Visual delay before click
await page.waitForTimeout(3000);

// Wait for backend API response
const responsePromise = page.waitForResponse(response =>
  response.url().includes('/car') &&
  response.request().method() === 'POST'
);

// Click Confirm
await confirmButton.click();

// Wait for API response
const response = await responsePromise;

console.log('Car API Status:', response.status());

// Wait API save
await page.waitForLoadState('networkidle');

await page.waitForTimeout(5000);

// Verify success
await expect(
  page.locator('body')
).toContainText(
  /success|successfully|added|created|updated/i,
  {
    timeout: 30000
  }
);

}); // Add New Car step

}); // Main test

// Added in github
// Coomet -> add git 