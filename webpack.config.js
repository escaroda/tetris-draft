const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'source-map',
  devServer: {
    static: './dist',
    compress: true,
    port: 9000,
    open: true,
    https: false,
  },
  plugins:
    [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, './static') }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        minify: true
      }),
      new MiniCSSExtractPlugin()
    ],
  module:
  {
    rules:
      [
        // HTML
        {
          test: /\.(html)$/,
          use: ['html-loader']
        },

        // JS
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use:
        //     [
        //       'babel-loader'
        //     ]
        // },

        // CSS
        {
          test: /\.css$/,
          use:
            [
              MiniCSSExtractPlugin.loader,
              'css-loader'
            ]
        },

        // Images
        {
          test: /\.(jpg|png|gif|svg)$/,
          use:
            [
              {
                loader: 'file-loader',
                options:
                {
                  outputPath: 'assets/images/'
                }
              }
            ]
        },

        // Fonts
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use:
            [
              {
                loader: 'file-loader',
                options:
                {
                  outputPath: 'assets/fonts/'
                }
              }
            ]
        },

        // Shaders
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader'
          ]
        }
      ]
  }
};
