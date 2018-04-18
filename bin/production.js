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

try {
  fs.statSync(path.join(__dirname, '../dist'));
} catch (e) {
  console.log(e);
  console.error('run `npm run build` first!');
  process.exit(0);
}

process.env.NODE_ENV = 'production';

require('../dist');