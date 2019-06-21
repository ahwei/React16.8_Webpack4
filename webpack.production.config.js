const merge = require("webpack-merge");
const config = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = merge(config, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
});
