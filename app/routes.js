/**
 *
 * 前后台路由切换
 *
 */

/* eslint-disable */
if (__SERVER__) {
    module.exports = require('./routes/routes.server');
} else {
    module.exports = require('./routes/routes.browser');
}