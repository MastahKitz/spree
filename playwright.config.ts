import { defineConfig, devices } from '@playwright/test';
import { environment } from './tests/functional/config/environments';

export default defineConfig({
  testDir: './tests/functional',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 2 : 0,
  globalSetup: './global.setup.ts',
  reporter: [
    ['html', { outputFolder: 'test-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: environment.demo.baseUrl,
    storageState: 'auth.json',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  outputDir: 'test-results',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
