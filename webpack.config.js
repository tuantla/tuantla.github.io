const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
module.exports = (env, options) => {
    const $env = env.NODE_ENV? env.NODE_ENV :'lab'
    const devMode = options.mode !== 'production'
    return {
      mode: options.mode,
      output: {
        path: path.join(__dirname,'dist'),
        filename: devMode? '[name].[hash].js' : '[name].js',
      },
      devtool: devMode ? 'source-map' : false,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader'
              }
            ]
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader",
              }]
          },
          { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use:[{
                loader: 'url-loader',
              options: {
                limit: 100000,
                name: "fonts/[name].[ext]"
              }
            }]}
        ]
      },
      plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
          filename  : '[name].css',
          chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({
          template: './src/index.html',
          filename: './index.html',
        }),
        new webpack.DefinePlugin({
          $ENV: JSON.stringify($env)
        }),
        new CopyWebpackPlugin({
          patterns: [
          { from: 'dist/**', to: './' },
        ]})
      ],
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: devMode
          }),
          new OptimizeCSSAssetsPlugin({}),
        ]
      },
      resolve: {
        alias: {
          "$components": path.resolve(__dirname, './src/js/components/'),
          "$util": path.resolve(__dirname, './src/js/util/'),
        }
      },

    }
  }