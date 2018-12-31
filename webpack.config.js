const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const outputDirectory = 'dist';
// call dotenv and it will return an Object with a parsed key

module.exports = {
  entry: ['babel-polyfill', './src/client/client.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(ttf|otf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|woff|woff2|eot|svg|svg|ico|jpg|pdf|gif)$/,
        loader: 'url-loader?limit=100000',
        options: {
          name: '[path][name]-[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8081'
    },
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    global: true,
    process: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    setImmediate: true
  }
};
