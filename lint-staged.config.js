/** Config analysis of source files that are git staged.
 * @module
 */

const config = {
  '*': ['eslint . --fix', 'git add'],

  '**/*.{js,json,yml,yaml,md,ts,jsx,css}': ['prettier --write', 'git add'],
}

export { config as default }
