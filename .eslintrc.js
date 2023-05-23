module.exports = {
  '$schema': 'https://json.schemastore.org/eslintrc.json',
  'root': true,
  'env': {
    'es6': true,
    'node': false
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'tsconfigRootDir': __dirname,
    'project': ['./tsconfig-dev.json']
  },
  'plugins': ['@typescript-eslint', 'jest', 'import', 'jsx-a11y', 'testing-library',
    'react', 'react-hooks', 'jest-dom'],
  'extends': ['eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
    'plugin:storybook/recommended',
    'eslint:recommended',
    'plugin:jest-dom/recommended'],
  'rules': {
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],
    'quotes': [2, 'single'],
    'react/jsx-filename-extension': ['warn', {
      'extensions': ['.tsx']
    }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-dom-import': 'off',
  },
  'overrides': [{
    'files': ['__tests__/**'],
    'rules': {
      '@typescript-eslint/no-var-requires': 0
    }
  }]
};
