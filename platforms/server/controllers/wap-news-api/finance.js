/**
 * 大画财经接口
 * @func list, detail
 */

import status from '../../lib/status';
const service = require('../../service/');

/**
 * 列表接口
 * @param {catCode, pageStart, pagePerNum} dhcj 查询页 每页条数
 * @return {serviceFinanceHome}
 */

const list = async (ctx) => {
    let {catCode, pagePerNum, pageStart} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const serviceFinance = new service.finance(ctx);
    let offset = Number(pagePerNum) * (Number(pageStart) - 1);
    let serviceFinanceHome = await serviceFinance.serviceFinanceHome(Number(pagePerNum), offset, catCode, Number(pageStart));
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceFinanceHome});
};

/**
 * 详情接口
 * @param {newsId} id
 * @return {serviceFinanceDetails}
 */

const details = async (ctx) => {
    let {newsId} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const serviceFinance = new service.finance(ctx);
    let serviceFinanceDetails = await serviceFinance.serviceFinanceDetails(newsId);
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceFinanceDetails});
};

export default {
	list,
	details
};