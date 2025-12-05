/** Playwright test configuration. */

import { platform } from 'os'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  name: 'e2e Tests',
  testDir: './src/test/e2e',
  testMatch: /.*\.test\.(ts|js|cjs|mjs)/,
  outputDir: './tmp/test/e2e/output',
  preserveOutput: 'always',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : '75%',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: './tmp/test/e2e/results', open: 'never' }],
    ['json', { outputFile: './tmp/test/e2e/results/index.json' }],
    ['junit', { outputFile: './tmp/test/e2e/results/index.xml' }],
    ['blob', { outputFile: `./tmp/test/e2e/results/report-${platform()}.zip` }],
  ],

  // Global. Override these in this.projects if necessary.
  use: {
    baseURL:
      process.env.cosmos_config_test_e2e_base_url || 'http://localhost:3000',
    acceptDownloads: true,
    bypassCSP: false,
    colorScheme: 'light',
    headless: true,
    ignoreHTTPSErrors: false,
    javaScriptEnabled: true,
    viewport: {
      width: 1920,
      height: 1080,
    },
    deviceScaleFactor: 1,
    hasTouch: false,
    offline: false,

    screenshot: { mode: 'on', fullPage: true, omitBackground: false },
    video: 'on',
    trace: 'on',

    extraHTTPHeaders: {
      'X-test': process.env.config_test_header_x_test || 'Automated e2e test.',
      'X-test-sdet':
        process.env.config_test_header_x_test_sdet || 'No name given.',
      'X-test-sdet-email':
        process.env.config_test_header_x_test_sdet_email || 'No email given.',
    },
  },

  projects: [
    {
      name: 'todomvc',
      use: {
        baseURL: 'https://todomvc.com/examples/react/dist',
        ...devices['Desktop Chrome'],
      },
      workers: 1,
      testDir: './src/test/e2e/com.todomvc',
    },
  ],
})
