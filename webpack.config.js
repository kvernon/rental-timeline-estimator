const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
//const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  console.log(env)
  console.log(argv)
  return {
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
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
        templateContent: ({htmlWebpackPlugin}) =>
          `
      <html lang="en">
        <head>
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
    `
      }),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts'],
        exclude: 'node_modules'
      })/*,
    new CopyPlugin({
      patterns: [{ from: 'public/images', to: 'images' }]
    })*/
    ],
  };
};
