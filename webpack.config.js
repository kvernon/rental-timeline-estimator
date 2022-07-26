const { join } = require("path");
require("html-webpack-plugin");
require("eslint-webpack-plugin");
const common = require("./webpack.common.config");
const webpack = require("webpack");

const devServer = {
  static: {
    directory: join(__dirname, "dist"),
  },
  hot: true,
  compress: true,
  port: 9000,
  client: false,
};

module.exports = (env, argv) => {
  console.log("env::", env);
  console.log("argv::", argv);

  const configDevelop = Object.assign(common);

  if (argv.mode === "development" && env["WEBPACK_SERVE"]) {
    configDevelop.devServer = Object.assign(devServer);
    configDevelop.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return configDevelop;
};
