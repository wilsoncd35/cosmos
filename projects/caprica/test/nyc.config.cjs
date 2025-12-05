/**
 * @file Test coverage configuration.
 * @license MIT
 * @copyright © Charlie Wilson. All rights reserved.
 * @module
 */

/** nyc configuration. */
const config = {
  all: true,
  extension: ['.js', '.cjs', '.mjs'],
  include: ['src/**/*.js'],
  reporter: ['text', 'html'],
  'report-dir': 'tmp/test/unit/coverage',
  'temp-dir': 'tmp/test/unit/.nyc_output',

  'check-coverage': true,

  branches: 80,
  functions: 80,
  lines: 80,
  statements: 80,

  watermarks: {
    branches: [80, 90],
    functions: [80, 90],
    lines: [80, 90],
    statements: [80, 90],
  },

  require: ['@babel/register'],

  // Disable for we are using babel/esm.
  sourceMap: false,
  instrument: false,
}

if (typeof require !== 'undefined' && require.main === module) {
  // When a script.
  log.debug(JSON.stringify(config, null, 2))
} else {
  // When a module.
  module.exports = config
}
