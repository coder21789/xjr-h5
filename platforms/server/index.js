/**
 *
 * Node启动模块
 *
 */

import Koa from 'koa';
import http from 'http';
import config from '../common/config';
import middlewareRegister from './middlewareRegister';

let Core = require('../common/core/core');
let app = new Core();

app.env = process.env.NODE_ENV;
middlewareRegister(app);

const server = http.createServer(app.callback());
server.listen(config.port, () => {
  console.log('新融街H5应用启动, bind port %d, CTRL + C to 终止服务', config.port);
});

export default server;