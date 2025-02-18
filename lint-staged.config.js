module.exports = {
  "*.ts,*.tsx": [
    "eslint --config .eslintrc.js --cache --fix",
    "npm run test:related",
  ],
  "*.{ts,tsx,css,md}": "prettier --write",
};
