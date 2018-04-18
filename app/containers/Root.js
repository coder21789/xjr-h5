/**
 *
 * 开发-发布应用根元素配置切换
 *
 */

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod');
} else {
    module.exports = require('./Root.dev');
}