const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDevEnv = process.env.NODE_ENV === "development";
console.log(process.env.NODE_ENV);
module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.css/,
        use: [
          "css-hot-loader",
          isDevEnv ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: isDevEnv }
          },
          "resolve-url-loader"
        ]
      },
      {
        test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|svg)$/,
        use: [{ loader: "url-loader" }]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: { historyApiFallback: true, inline: true, port: 8008, hot: true }
};
