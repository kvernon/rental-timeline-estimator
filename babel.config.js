module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
        modules: 'commonjs', // ⭐ required for Jest
      },
    ],
  ],
};
