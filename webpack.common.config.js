const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

console.log('webpack-common-config is used');

export const copyPlugin = new CopyPlugin({
  patterns: [{ from: 'images', to: 'images' }],
});

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Realty Investor Timeline',
      templateContent: ({ htmlWebpackPlugin }) =>
        `
      <html lang="en">
        <head>
         <meta name="robots" content="noindex">
         <meta name="google" content="nositelinkssearchbox" />
         <meta about="realty estimator by Kelly Vernon">
         <meta name="Description" CONTENT="Author: Kelly Vernon, Category: Investing">
         <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
         <title>${htmlWebpackPlugin.options.title}</title>
          ${htmlWebpackPlugin.tags.headTags}
        </head>
        <body>
          <noscript>
            <strong>We're sorry but ${htmlWebpackPlugin.options.title} doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
          </noscript>
           <h1>${htmlWebpackPlugin.options.title}</h1>
          <div id="root"></div>
        </body>
      </html>
    `,
    }),
    copyPlugin,
  ],
};
