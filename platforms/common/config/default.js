/**
 *
 * Node端默认配置
 *
 */

import path from 'path';
import seo from './seo';
import goodAt from './goodAt';

var rootPath = path.join(__dirname, '../../..');
if (/\\/.test(rootPath)) { rootPath = rootPath.replace(/\\/g, '/'); }

export default {
  goodAt: goodAt.goodAt,
  seo: seo.seo,
  rootPath,
  publicPath: '/public',
  staticPath: '/public/static',
  path: {
    project: './platforms/server/'
  },
  logs:{
    default_path: {
      xinrongnews: '/logs'
    }
  },
  host: {
    "127.0.0.1": "xinrongnews"
  },
  mongo: {
    options: {},
    api: {
      xinrongnews: {
        database: 'mongodb://localhost:27017/xrj'
      }
    }
  },
  database: {
    dialect: "mysql",
    protocol: "tcp",
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    timezone: "+08:00"
  },
  proxy: [{
    host: 'http://172.16.60.160',
    match: /^\/news-api\//
  },{
    host: 'http://172.16.60.160',
    match: /^\/ting-api\//
  }]
};