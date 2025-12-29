import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import playwright from 'eslint-plugin-playwright'
import mocha from 'eslint-plugin-mocha'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      'build',
      'dist',
      'logs',
      '**/tmp**',
      '**/.venv',
    ],
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  mocha.configs.recommended,

  {
    rules: {
      'no-undef': 'off',
    },
  },

  {
    name: 'e2e tests',
    ...playwright.configs['flat/recommended'],
    files: ['test/e2e/**/*.test.{ts,js}', 'test/e2e/**/*.spec.{ts,js}'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,

      'playwright/max-nested-describe': ['error', { max: 35 }],
    },
  },

  {
    name: 'caprica',
    files: ['projects/caprica/**/*.{ts,js}'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  {
    name: 'mocha tests',
    files: ['test/**/*.test.{ts,js}', 'test/**/*.spec.{ts,js}'],
    ignores: ['test/e2e/**'],
    rules: {
      ...mocha.configs.recommended.rules,
      'mocha/no-mocha-arrows': 'error',
    },
  },
)
