const globals = require('globals');
const pluginJs = require('@eslint/js');
const tsEslint = require('typescript-eslint');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const {fixupPluginRules } = require('@eslint/compat');
const jest = require('eslint-plugin-jest');
const jestDom = require('eslint-plugin-jest-dom');
const testingLibrary = require('eslint-plugin-testing-library');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: [
      'coverage/',
      'babel.config.js',
      'dist/',
      'jest.config.ts',
      'commitlint.config.js',
      'webpack.config.js',
      'webpack.*.config.js',
      'lint-staged.config.js',
      'eslint.config.js',
      '.eslintignore',
      '.prettierrc',
      '.jestcache/',
      '.husky',
      '.gitignore',
      'wallaby.js',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig-dev.json',
      },
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: {
      react: pluginReact,
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
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
    files: ['__tests__/**', '**/__mocks__/**', '**/**/*.spec.ts[x]'],
    plugins: {
      jest,
      jestDom,
      testingLibrary,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'testing-library/no-dom-import': 'off',
      'no-console': 'off',
      'react/no-children-prop': 'off',
    },
  },
  prettierConfig
];
