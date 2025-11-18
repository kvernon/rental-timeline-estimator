import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default defineConfig([
  globalIgnores([
    'coverage/',
    'babel.config.js',
    'dist/',
    'jest.config.ts',
    'commitlint.config.js',
    'lint-staged.config.js',
    'eslint.config.js',
    '.eslintignore',
    '.prettierrc',
    '.jestcache/',
    '.husky',
    '.gitignore',
    'wallaby.js',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tsEslint.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
    },
    rules: {
      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.tsx'],
        },
      ],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig-dev.json',
      },
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    files: ['__tests__/**', '**/__mocks__/**', '**/**/*.spec.ts[x]'],
    plugins: {
      jest,
      jestDom,
      testingLibrary,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'testing-library/no-dom-import': 'off',
      'no-console': 'off',
      'react/no-children-prop': 'off',
    },
  },
  prettierConfig,
]);
