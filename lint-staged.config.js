/** Config analysis of source files that are git staged.
 * @module
 */

const config = {
  '*': ['eslint . --fix'],

  '**/*.{js,json,yml,yaml,md,ts,jsx,css}': ['prettier --write'],
};

export { config as default };
