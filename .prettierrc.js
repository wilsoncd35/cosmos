/**
 * @file Source formatter configuration.
 * @license MIT
 */
import { fileURLToPath } from 'url';

/** Simple logger. */
/* istanbul ignore next: Unnecessary. */
if (!global.log) global.log = console;

/** Prettier formatter configuration.
 * @type {import('prettier').Config}
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxBracketSameLine: true,
  printWidth: 80,
  proseWrap: 'never',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  log.info(JSON.stringify(config, null, 2));
}

export { config as default };
