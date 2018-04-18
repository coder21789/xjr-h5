/**
 *
 * 配置信息
 *
 */

import fs from 'fs';
import lodash, {isPlainObject, defaultsDeep} from 'lodash';
import defaultConfig from './default';

const cfgs = [];

var dir = __dirname;
if (/\\/.test(dir)) { dir = dir.replace(/\\/g, '/'); }

fs.readdirSync(dir).map(filename => {
  if (['index.js', 'default.js'].indexOf(filename) > -1 || filename[0] === '.') {
    return false;
  }
  try {
    const cfg = require('./' + filename);
    if (isPlainObject(cfg)) {
      cfgs.push(cfg);
    }
  } catch(e) {};
});

cfgs.push(defaultConfig);

const configDefault = defaultsDeep.apply(lodash, cfgs);

var processConfig = {
  port: process.env.NODE_PORT,
  mysql: {
    api: {
      xinrongnews: {
        database: process.env.NODE_MYSQL_DATABASE,
        username: process.env.NODE_MYSQL_DATABASE_USERNAME,
        password: process.env.NODE_MYSQL_DATABASE_PASSWORD,
        option: {
          host: process.env.NODE_MYSQL_DATABASE_HOST,
          port: process.env.NODE_MYSQL_DATABASE_PORT
        }
      }
    }
  }
};

var config = {...configDefault, ...processConfig};
// console.log(config);

export default config;