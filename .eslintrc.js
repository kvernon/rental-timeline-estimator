module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc.json',
  env: {
    es6: true,
    node: false,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'eslint:recommended'],
  overrides: [
    {
      files: ['__tests__/**', '**/__mocks__/**'],
      env: {
        jest: true,
        'jest/globals': true,
      },
      plugins: ['jest', 'jest-dom', 'testing-library'],
      extends: ['plugin:jest/recommended', 'plugin:jest-dom/recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debugging-utils': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        'testing-library/no-dom-import': 'off',
        'no-console': 0,
      },
    },
    {
      files: ['stories/**'],
      plugins: ['plugin:storybook/recommended'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        'no-console': 0,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig-dev.json'],
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
  root: true,
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    quotes: [2, 'single'],
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
};
