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

const config = [
  {
    ignores: [
      '**/.pytest_cache/**',
      '**/.venv/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/log/**',
      '**/tmp/**',
    ],
  },

  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      globals: {
        ...globals.nodeBuiltin,
        log: true,
      },
    },

    rules: {
      ...pluginJs.configs.recommended.rules,

      'jsdoc/multiline-blocks': [
        'error',
        {
          noZeroLineText: false,
        },
      ],
    },
  },

  {
    files: ['**/*.json'],
    ...pluginJson.configs.recommended,
  },

  pluginPrettierRecommended,
  pluginJsdoc.configs['flat/recommended'],
  pluginMocha.configs.flat.recommended,
  ...pluginYml.configs['flat/standard'],
  ...pluginYml.configs['flat/prettier'],
]

export { config as default }
