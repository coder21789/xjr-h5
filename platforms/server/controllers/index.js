/**
 * 接口路由配置
 *
 * @File index.js
 * @Date 17/10/9  17:02
 */

'use strict';

import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import convert from 'koa-convert';
import betterBody from 'koa-better-body';
import news from './wap-news-api/news';
import topic from './wap-news-api/topic';
import atlas from './wap-news-api/atlas';
import event from './wap-news-api/event';
import expert from './wap-news-api/expert';
import finance from './wap-news-api/finance';
import user from './wap-news-api/user';

const router = new Router();

var curPath = __dirname;
if (/\\/.test(curPath)) { curPath = curPath.replace(/\\/g, '/'); }

fs.readdirSync(curPath)
    .filter(file =>
        (file.indexOf('.') !== 0) && (file.split('.').slice(-1)[0] === 'js') && file !== 'index.js'
    )
    .forEach(file => {
        const route = require(path.join(curPath, file));
        router.use(route.routes(), route.allowedMethods());
    });

router.all('/wap-news-api/news/recommend', news.recommend);
router.all('/wap-news-api/news/channel', news.channel);
router.all('/wap-news-api/topic/list', topic.list);
router.all('/wap-news-api/topic/details', topic.details);
router.all('/wap-news-api/atlas/list', atlas.list);
router.all('/wap-news-api/event/list', event.list);
router.all('/wap-news-api/event/details', event.details);
router.all('/wap-news-api/expert/list', expert.list);
router.all('/wap-news-api/expert/details', expert.details);
router.all('/wap-news-api/finance/list', finance.list);
router.all('/wap-news-api/finance/details', finance.details);
router.all('/wap-news-api/user', user.wechat);
router.all('/wap-news-api/signature', user.signature);
router.all('/wap-news-api/upload', convert(betterBody()), user.upload);
router.all('/MP_verify_ajHggkWjKuaszeDq.txt', user.MP_verify_ajHggkWjKuaszeDq);

module.exports = router;