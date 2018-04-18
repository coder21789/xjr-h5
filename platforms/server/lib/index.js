/**
 * 工具类加载
 */

'use strict';

const fs = require('fs');
const path = require('path');

var curPath = __dirname;
if (/\\/.test(curPath)) { curPath = curPath.replace(/\\/g, '/'); }

fs.readdirSync(curPath).forEach((item) => {
  var filePath = path.resolve(`${curPath}/${item}/index.js`);
  var modulePath = `./${item}/index.js`;
  if (/\\/.test(filePath)) { filePath = filePath.replace(/\\/g, '/'); }
  if (fs.existsSync(filePath)) {
  	exports[item] = require(modulePath);
  }
});