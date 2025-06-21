import { defineConfig, devices } from '@playwright/test';

// require('dotenv').config(); // Optional: load env variables

export default defineConfig({
  testDir: './tests',
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'blob' : 'html',
  use: {
    screenshot: 'only-on-failure',
    video: { mode: 'on-first-retry', size: { width: 640, height: 480 } },
    trace: 'retain-on-failure'
  },
  outputDir: 'test-results/',
  snapshotPathTemplate:
    'test-results/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment additional browsers as needed:
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],

  // Optional: automatically start your dev server before tests
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});
