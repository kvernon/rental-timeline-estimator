const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],

  "framework": {
    name: '@storybook/react-webpack5',
    options: {}
  },

  features: {
    emotionAlias: false,
    storyStoreV7: true,
  },

  webpackFinal: async (config) => {
    config.plugins.push(    new CopyPlugin({
        patterns: [{ from: 'images', to: 'images' }]
      })
    )
    // Make whatever fine-grained changes you need
    // Return the altered config
    return config;
  },

  docs: {
    autodocs: true
  }
}
