/**
 * 图集接口
 * @func list
 */

import status from '../../lib/status';
const service = require('../../service/');

/**
 * 列表接口
 * @param {catCode, pageStart, pagePerNum} tj 查询页 每页条数
 * @return {serviceAtlasList}
 */

const list = async (ctx) => {
    let {catCode, pagePerNum, pageStart} = Object.getOwnPropertyNames(ctx.request.body).length > 0 ? ctx.request.body : ctx.query;
    const serviceAtlas = new service.atlas(ctx);
    let offset = Number(pagePerNum) * (Number(pageStart) - 1);
    let serviceAtlasList = await serviceAtlas.serviceAtlasHome(Number(pagePerNum), offset, catCode, Number(pageStart));
    ctx.body = await Object.assign({}, status.scuccess, {resultBody: serviceAtlasList});
};

export default {
	list
};