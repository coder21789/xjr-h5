/**
 *
 * 打包发布配置
 *
 */

process.env.NODE_ENV = 'production';

require('babel-polyfill');
require('babel-core/register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [
    "babel-plugin-transform-decorators-legacy",
    "babel-plugin-transform-runtime"
  ]
});
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/build/[name].[ext]',
  limit: 1000
});

var config = require('./platforms/common/config');
var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var rucksack = require('rucksack-css');
var autoprefixer = require('autoprefixer');
var postcsspxtorem = require('postcss-pxtorem');
var fs = require('fs');
var nodeModules = fs.readdirSync('node_modules')
  .filter(function (i) {
    return ['.bin', '.npminstall'].indexOf(i) === -1
  });
var includes = [
  path.resolve(__dirname, 'app'),
  path.resolve(__dirname, 'platforms')
];

module.exports = [{
  name: 'browser side render',
  devtool: 'cheap-source-map',
  entry: ['./app/index.js'],
  output: {
    path: 'public/build',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        include: includes,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ["inline-replace-variables", {
              "__SERVER__": false,
              "__PRODUCT__": true
            }], "babel-plugin-transform-decorators-legacy",
            "babel-plugin-transform-runtime"
          ]
        }
      }, {
        test: /\.scss$/,
        include: includes,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!sass')
      }, {
        test: /\.css$/,
        include: includes,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
      },
      { test: /\.woff2?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url?limit=1000&minetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=1000' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html?$/, loader: 'file?name=[name].[ext]' }
    ]
  },
  postcss: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS 7', 'last 3 Safari versions']
    }),
    postcsspxtorem({
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.[chunkhash:8].js'),
    new webpack.optimize.DedupePlugin(),
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: { 
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __SERVER__: false,
      __PRODUCT__: true
    }),
    new ExtractTextPlugin('all.min.[contenthash:8].css', {allChunks: true})
  ]
},
{
  name: 'server side render',
  devtool: 'cheap-source-map',
  entry: ['./platforms/server/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    publicPath: '/build/',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: true,
    __filename: true
  },
  externals: [
    function (context, request, callback) {
      var pathStart = request.split('/')[0]
      if (pathStart && (pathStart[0] === '!') || nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    }
  ],
  module: {
    loaders: [
      {
        test: /\.jsx|.js$/,
        exclude: /node_modules/,
        include: includes,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ["inline-replace-variables", {
              "__SERVER__": true
            }],
            ["babel-plugin-transform-require-ignore", {
              "extensions": [".scss", ".css"]
            }], "babel-plugin-transform-decorators-legacy",
            "babel-plugin-transform-runtime"
          ]
        }
      }, {
        test: /\.(css|scss)$/,
        loader: 'null'
      },
      { test: /\.woff2?$/, loader: 'null' },
      { test: /\.ttf$/, loader: 'null' },
      { test: /\.eot$/, loader: 'null' },
      { test: /\.svg$/, loader: 'null' },
      { test: /\.(png|jpg|jpeg|gif|webp)$/i, loader: 'url?limit=1000' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __SERVER__: true,
      __PRODUCT__: true
    })
  ]
}];