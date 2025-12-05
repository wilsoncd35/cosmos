import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://todomvc.com/examples/react/dist',
    specPattern: 'test/e2e/**/*.test.js',
    testIsolation: true,
    supportFile: 'test/e2e/global.js',
  },

  env: {},
  downloadsFolder: 'tmp/test/e2e/downloads',
  fixturesFolder: 'test/e2e/fixtures',
  screenshotsFolder: 'tmp/test/e2e/screenshots',
  videosFolder: 'tmp/test/e2e/videos',

  screenshotOnRunFailure: true,
  video: true,

  defaultBrowser: 'chrome',
  viewportHeight: 900,
  viewportWidth: 1440,

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'tmp/test/e2e/results',
    reportFilename: 'index.html',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    code: true,
    showPassed: true,
    showFailed: true,
    showPending: true,
    showSkipped: true,
    showHooks: 'always',
  },
})
