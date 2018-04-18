/**
 * 财经大事件接口
 * @func list details
 */

import status from '../../lib/status';
const {resultMapCollection} = require('../../lib/format/setDateFormat').default;

/**
 * 列表接口
 * @param {code} dashiajin
 * @return {list, tkd} 事件列表 seo
 */

const list = async (ctx) => {
    let {code} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const category  = ctx.mysql('category');
    const news = ctx.mysql('news');
    const event = ctx.mysql('event');
    const user = ctx.mysql('user');

    // 外键设置
    event.belongsTo(news, {foreignKey: 'rel_news_id'});
    news.hasMany(event, {foreignKey: 'rel_news_id'});
    news.belongsTo(user, {foreignKey: 'publish_author_id'});

    // meta信息
    let getCode = await ctx.findAllMap([{
        model: category,
        arg: {
            attributes: ['title', 'keywords', 'description'],
            where: {code: code}
        }
    }]);
    getCode = await ctx.resultMap(getCode);
    getCode = getCode[0][0];

    // 大事件新闻列表
    const newsCollectionList = await ctx.findAllMap([{
        model: news,
        arg: {
            order: 'publish_time DESC',
            include: [{model: user, attributes: ['name']}],
            attributes: ['news_url', 'subject', 'publish_time', 'thumbnail_url', 'region'],
            where: {news_type: 5, status: 1, content_template_id: {$lte: 2}}
        }}]);
    const newsCollection = await resultMapCollection(newsCollectionList, 'user');
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: {list: newsCollection[0], tkd: getCode}});
};

/**
 * 详情接口
 * @param {id} 事件id
 * @return {event, time} 事件导语 时间轴
 */

const details = async (ctx) => {
    const {id} = ctx.request.body;
    const news = ctx.mysql('news');
    const event = ctx.mysql('event');
    const user = ctx.mysql('user');

    // 外键设置
    news.belongsTo(user, {foreignKey: 'publish_author_id'});

    // 大事件模板id判断
    const newsDetailList = await ctx.findAllMap([{
        model: news,
        arg: {
            attributes: ['content_template_id'],
            where: {id: id}
        }}]);
    const newsDetail = await ctx.resultMap(newsDetailList);
    const templateId = newsDetail[0][0].content_template_id;

    // 模板12 SQL
    if (templateId < 3) {
        const tmp1Or2List = await ctx.findAllMap([{
            model: event,
            arg: {
                attributes: ['news_recommend_summary'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_summary'}, state: 1}
            }}, {
            model: event,
            arg: {
                order: 'event_time ASC',
                attributes: ['news_recommend_subject', 'news_recommend_summary', 'news_url', 'pic_url', 'event_time'],
                where: {rel_news_id: id, location_code: {$like: 'web_cjdsj_template_%_sjz'}, state: 1}
            }}, {
            model: news,
            arg: {
                attributes: ['subject', 'publish_time'],
                include: [{model: user, attributes: ['name']}],
                where: {id: id, news_type: 5, status: 1}
            }}]);
        var tmp1Or2 = await resultMapCollection(tmp1Or2List, 'user');
        ctx.body = await Object.assign({}, status.scuccess, {
            resultBody: {
                event: {...tmp1Or2[0][0], ...tmp1Or2[2][0]},
                time: tmp1Or2[1]
            }
        });
    }
};

export default {
    list,
    details
};