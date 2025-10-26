/**
 * @file Test configuration.
 * @license MIT
 * @copyright © Charlie Wilson. All rights reserved.
 * @module
 */

/** Test results report title. */
const reportTitle =
  process.env.cosmos_config_test_report_results_title || 'Unit Test Results'

/** Path to test results report. */
const reportPath =
  process.env.cosmos_config_test_report_results_path ||
  'tmp/test/project/results'

/** Simple logger. */
/* istanbul ignore next: Unnecessary. */
if (!global.log) global.log = console

/** mocha configuration.
 * @type {import('mocha').MochaOptions}
 */
const config = {
  timeout: 10000,
  exit: true,
  ui: 'bdd',
  recursive: true,
  // jobs: 4,
  parallel: true,
  diff: true,

  require: ['ts-node/register', 'test/hooks.js'],

  reporter: 'mochawesome',

  'reporter-option': [
    `reportDir=${reportPath}`,
    'reportFilename=index.html',
    'html=true',
    'json=true',
    `reportTitle=${reportTitle}`,
    `reportPageTitle=${reportTitle}`,
    'showSkipped=true',
    'charts=true',
    'code=true',
    'overwrite=false',
    'timestamp=yyyy.mm.dd.HH.MM.ss.LL',
  ],
}

if (typeof require !== 'undefined' && require.main === module) {
  // When a script.
  log.debug(JSON.stringify(config, null, 2))
} else {
  // When a module.
  module.exports = config
}
