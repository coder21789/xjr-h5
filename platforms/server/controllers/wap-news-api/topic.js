/**
 * 话题接口
 * @func list details
 */

import status from '../../lib/status';
const service = require('../../service/');
const {resultMapTable} = require('../../lib/format/setDateFormat').default;

/**
 * 列表接口
 * @param {catCode, pageStart, pagePerNum} ht 查询页 每页条数
 * @return {serviceTopicList}
 */

const list = async (ctx) => {
    let {catCode, pagePerNum, pageStart} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const serviceTopic = new service.topic(ctx);
    let offset = Number(pagePerNum) * (Number(pageStart) - 1);
    let serviceTopicList = await serviceTopic.serviceTopicHome(Number(pagePerNum), offset, catCode, Number(pageStart));
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceTopicList});
};

/**
 * 详情接口
 * @param {newsId} 话题id
 * @return {desc, list} 描述 列表
 */

const details = async (ctx) => {
    const {newsId} = ctx.request.body;
    const news = ctx.mysql('news');
    const topic = ctx.mysql('topic');

    // 外键设置
    topic.belongsTo(news, {foreignKey: 'rel_news_id'});
    news.hasMany(topic, {foreignKey: 'news_id'});

    // 描述 列表
    const detailList = await ctx.findAllMap([{
        model: news,
        arg: {
            attributes: ['subject', ['thumbnail_url', 'newsImageUrl'], 'summary'],
            where: {news_type: 4, status: 1, id: newsId}
        }
        }, {
            model: topic,
            arg: {
                attributes: [['news_url', 'newsUrl'], ['news_recommend_subject', 'subject'], ['pic_url_list', 'newsImageUrl']],
                where: {news_id: newsId},
                include: [{model: news, attributes: [['news_source', 'source'], 'publish_time']}]
            }
        }]);
    const detailListResult = await resultMapTable(detailList, 'news');
    ctx.body = await Object.assign({}, status.scuccess, {
        resultBody: {
            desc: detailListResult[0][0],
            list: detailListResult[1]
        }
    });
};

export default {
    list,
    details
};