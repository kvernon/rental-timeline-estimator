module.exports = {
  "*.ts,*.tsx": [
    "eslint --config .eslintrc.js --cache --fix",
    "jest --findRelatedTests",
  ],
  "*.{ts,tsx,css,md}": "prettier --write",
};
