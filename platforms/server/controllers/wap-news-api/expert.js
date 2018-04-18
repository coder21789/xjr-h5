/**
 * 专家接口
 * @func list
 */

import status from '../../lib/status';
const service = require('../../service/');

/**
 * 列表接口
 * @param {catCode} zj
 * @return {serviceExpertHome}
 */

const list = async (ctx) => {
    let {catCode} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const serviceExpert = new service.expert(ctx);
    let serviceExpertHome = await serviceExpert.serviceExpertHome(catCode);
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceExpertHome});
};

/**
 * 详情接口
 * @param {userId} 专家id 每页条数 查询页
 * @return {serviceExpertList}
 */

const details = async (ctx) => {
    let {userId, pagePerNum, pageStart} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const serviceExpert = new service.expert(ctx);
    let offset = Number(pagePerNum) * (Number(pageStart) - 1);
    let serviceExpertList = await serviceExpert.serviceExpertList(Number(pagePerNum), offset, userId, Number(pageStart));
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceExpertList});
};

export default {
	list,
	details
};