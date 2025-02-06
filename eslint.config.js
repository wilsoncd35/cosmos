/** Analysis JS, JSON, YAML, etc. configuration.
 * @module
 */

import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginMocha from 'eslint-plugin-mocha'
import pluginJson from 'eslint-plugin-json'
import pluginYml from 'eslint-plugin-yml'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** Simple logger. */
/* istanbul ignore next: Unnecessary. */
if (!global.log) global.log = console

const config = [
  {
    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        log: true,
      },
    },
  },

  pluginJs.configs.recommended,
  pluginJsdoc.configs['flat/recommended'],
  pluginMocha.configs.flat.recommended,
  ...pluginYml.configs['flat/standard'],
  pluginJson.configs.recommended,
  pluginPrettierRecommended,

  {
    rules: {
      'jsdoc/multiline-blocks': [
        'error',
        {
          noZeroLineText: false,
        },
      ],
    },
  },
]

export { config as default }
