module.exports = {
  '*.ts,*.tsx': [
  'eslint --config .eslintrc.json --cache --fix',
  'jest --findRelatedTests'
],
  '*.{ts,tsx,css,md}': 'prettier --write'
};
