#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

/**
 * 获取初始化配置
 */

fs.readdirSync(__dirname).map(filename => {
  if (filename.match('development.js') || filename.match('production.js')) {
    return false;
  }
  try {
    const cfg = require('./' + filename);
    process.env.NODE_PORT = cfg.port;
    process.env.NODE_MYSQL_DATABASE = cfg.mysql.api.xinrongnews.database;
    process.env.NODE_MYSQL_DATABASE_USERNAME = cfg.mysql.api.xinrongnews.username;
    process.env.NODE_MYSQL_DATABASE_PASSWORD = cfg.mysql.api.xinrongnews.password;
    process.env.NODE_MYSQL_DATABASE_HOST = cfg.mysql.api.xinrongnews.option.host;
    process.env.NODE_MYSQL_DATABASE_PORT = cfg.mysql.api.xinrongnews.option.port;
  } catch(e) {
    console.log(e);
  };
});

process.env.NODE_ENV = 'development';

console.log('Waiting for webpacking ...');

/**
 * 获取同构配置
 */

require('babel-polyfill');
require('babel-core/register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [
    ['babel-plugin-transform-require-ignore', {
      extensions: ['.css', '.scss']
    }],
    ['inline-replace-variables', {
      "__SERVER__": true,
      "__PRODUCT__": false
    }],
    "babel-plugin-transform-decorators-legacy",
    "babel-plugin-transform-runtime"
  ]
});
require('asset-require-hook')({
  extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff', 'webp'],
  name: '/build/[name].[ext]',
  limit: 1000
});

/**
 * 开发服务器配置
 * @type {Core}
 */

var Core = require('../platforms/common/core/core');
var app = new Core();
var middlewareRegister = require('../platforms/server/middlewareRegister').default;
var webpack = require('webpack');
var KWM = require('koa-webpack-middleware');
var devMiddleware = KWM.devMiddleware;
var hotMiddleware = KWM.hotMiddleware;
var chokidar = require('chokidar');
var webpackConfig = require('../webpack.development');
var compiler = webpack(webpackConfig);
var config = require('../platforms/common/config').default;
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var devMiddlewareInstance = devMiddleware(compiler, {
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: '/build/',
  stats: {
    colors: true
  }
});
var hotMiddlewareInstance = hotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
});

app.env = 'development';
app.use(devMiddlewareInstance);
app.use(hotMiddlewareInstance);
middlewareRegister(app);

app.on('error', function (err, ctx) {
  console.log('error occured:', err.stack);
});

/**
 * 动态编译重启服务
 * @type {boolean}
 */

var server = require('http').createServer(app.callback());
var watcher = chokidar.watch([
  path.join(__dirname, '../app'),
  path.join(__dirname, '../platforms')
]);
var isListened = false;

watcher.on('ready', function () {
  watcher.on('all', function (e, p) {
    console.log("Clearing module cache");
    Object.keys(require.cache).forEach(function(id) {
      if (/[\/\\](app|platforms)[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

compiler._plugins['after-compile'].push(function (compilation, callback) {
  callback();

  /**
   * 开发集群服务
   */

  if (cluster.isMaster && process.env.__CLUSTER__) {
    console.log(`Master 进程 ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    console.log(cluster.workers);
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker 进程 ${worker.process.pid} died, ${code}, ${signal}`);
    });
  } else {
    !isListened && server.listen(config.port, function () {
      console.log('新融街H5应用启动, at port %d, CTRL + C to 终止服务', config.port);
      isListened = true;
    });
    console.log(`Worker 进程 ${process.pid} started`);
  }
});