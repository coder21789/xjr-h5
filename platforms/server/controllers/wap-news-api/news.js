/**
 * 推荐一级频道接口
 * @func recommend
 */

import status from '../../lib/status';
const service = require('../../service/');

/**
 * 获取一级推荐频道列表数据
 * @param {catCode, limit, offset}
 * @return {serviceRecommendList}
 */

const recommend = async (ctx) => {
	const {catCode, pagePerNum, pageStart} = ctx.request.body;
	const serviceReccommend = new service.news(ctx);
	const INDEX = 'index';
	let offset = Number(pagePerNum) * (Number(pageStart) - 1);
	let serviceRecommendList;
	if (INDEX.indexOf(catCode) > -1) {
		serviceRecommendList = await serviceReccommend.serviceRecommendHome(Number(pagePerNum), offset, catCode, Number(pageStart));
	} else {
		serviceRecommendList = await serviceReccommend.serviceRecommendChannel(Number(pagePerNum), offset, catCode, Number(pageStart));
	}
	ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceRecommendList});
};

/**
 * 获取二级频道新闻列表数据
 * @param ctx
 */

const channel = async (ctx) => {
	const {catCode, pagePerNum, pageStart} = ctx.request.body;
	const serviceReccommend = new service.news(ctx);
	let offset = Number(pagePerNum) * (Number(pageStart) - 1);
	let serviceChannelList;
	serviceChannelList = await serviceReccommend.serviceChannel(Number(pagePerNum), offset, catCode, Number(pageStart));
	ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceChannelList});
};

export default {
	recommend,
	channel
};