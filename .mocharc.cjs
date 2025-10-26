/**
 * @file Default test configuration.
 * @license MIT
 * @copyright © Charlie Wilson. All rights reserved.
 * @module
 */

/* eslint-disable-next-line @typescript-eslint/no-require-imports */
const config = require('./test/mocharc.cjs')

/** Simple logger. */
/* istanbul ignore next: Unnecessary. */
if (!global.log) global.log = console

if (typeof require !== 'undefined' && require.main === module) {
  // When a script.
  log.debug(JSON.stringify(config, null, 2))
} else {
  // When a module.
  module.exports = config
}
