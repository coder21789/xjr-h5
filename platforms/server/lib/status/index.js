/**
 * http状态码
 * @type {{status}}
 */

const status = {};

status.scuccess = {
    resultCode: 10000,
    resultMessage: '成功',
    resultBody: []
};

status.failed = {
    resultCode: 10001,
    resultMessage: '参数错误',
    resultBody: []
};

module.exports = status;