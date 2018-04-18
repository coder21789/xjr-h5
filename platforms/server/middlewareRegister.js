/**
 *
 * Node中间件注册列表
 *
 */

import path from 'path';
import views from 'koa-views';
import json from 'koa-json';
import assets from 'koa-static';
import koaOnError from 'koa-onerror';
import convert from 'koa-convert';
import bodyparser from 'koa-bodyparser';
import proxy from 'koa-proxy';
import helmet from 'koa-helmet';
import limit from 'koa-limit';
import ssr from './lib/ssr';
import config from '../common/config';

const Middles = require('../common/middlewares/');
const router = require('./controllers/index');

let templatePath = path.join(__dirname, './views');
if (/\\/.test(templatePath)) { templatePath = templatePath.replace(/\\/g, '/'); }

const host = Object.keys(config.host)[0];
const appName = config.host[host];
let appPath = path.resolve(config.path.project);
if (/\\/.test(appPath)) { appPath = appPath.replace(/\\/g, '/'); }

require('../common/config/log');
const log4js = require('koa-log4');
const logger = log4js.getLogger('app');
logger.info('xinrongnews-h5-node started');

export default (app) => {
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ['*.xinrongnews.com', 'res.wx.qq.com', 'dn-growing.qbox.me', 'hm.baidu.com', "'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ['*', '*.xinrongnews.com', 'xrj.oss-cn-hangzhou.aliyuncs.com', 'wx.qlogo.cn', "'self'", 'data:'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ['*.growingio.com', "'self'"],
      mediaSrc: ['*.xinrongnews.com', "'self'"]
  }}));

  app.use(limit({
    limit: 200,
    interval: 1000 * 60
  }));

  app.use(convert(proxy({host: config.proxy[0].host, match: config.proxy[0].match})));
  app.use(convert(proxy({host: config.proxy[1].host, match: config.proxy[1].match})));

  app.use(convert(bodyparser()));
  app.use(convert(json()));

  app.use(assets(config.rootPath + config.publicPath, {maxage: 1000*60*60*24*60, gzip: true}));
  app.use(views(templatePath, {extension: 'ejs'}));

  process.env.NODE_ENV !== 'production' && app.use(log4js.koaLogger(log4js.getLogger('http'), {level: 'auto'}));

  config.mysql.api[appName] && app.use(Middles.mysql(app, {
    root: appPath + '/model/mysql',
    connect: config.mysql.api[appName],
    settings: config.database
  }));

  process.env.NODE_ENV !== 'production' && config.mongo.api[appName] && app.use(Middles.mongo(app, {
    root: appPath + '/model/mongo',
    connect: config.mongo.api[appName].database
  }));

  app.use(Middles.proxy(app, {weixin: 'https://api.weixin.qq.com'}, {
    hosts: {}
  }, {
    timeout: 15000
  }));
  
  app.use(router.routes(), router.allowedMethods());

  app.use(ssr);

  koaOnError(app, {template: templatePath + '/500.ejs'});
};