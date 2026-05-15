
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  // 10 minutes timeout
  timeout: 600000,

  expect: {
    timeout: 60000
  },

  use: {
    headless: false,

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

    launchOptions: {
      slowMo: 500
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

