import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Mappen där Playwright ska leta efter tester
  testDir: './tests/tests-e2e',

  // Kör tester parallellt
  fullyParallel: true,

  // Får inte lämna test.only i koden på CI
  forbidOnly: !!process.env.CI,

  // Retry på CI
  retries: process.env.CI ? 2 : 0,

  // Antal workers på CI
  workers: process.env.CI ? 1 : undefined,

  // Rapportering
  reporter: 'html',

  // Delade inställningar för alla projekt
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', // kan vara bra för felsökning
  },

  // Browser-projekt
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Starta din lokala dev-server innan testerna körs
  webServer: {
    command: 'npm run dev',            // startar server + vite
    url: 'http://localhost:5173',      // den URL som formTest.spec.ts använder
    reuseExistingServer: !process.env.CI,
  },
});