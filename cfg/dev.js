'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
