/**
 * 图集频道Service类
 * @class ServiceAtlas
 */

import Dao from '../../dao/';
import Utils from '../../lib';

module.exports = class ServiceAtlas extends Utils.format {
    constructor(context) {
        super();
        this.DaoCommon = new Dao.common(context);
        this.DaoAtlas = new Dao.atlas(context);
        this.context = context;
    };

    /**
     * 获取图集频道列表数据
     * @param limit
     * @param offset
     * @param category
     * @returns {*}
     */

    async serviceAtlasHome(limit, offset, category, pageStart) {
        let queue = [];
        queue.push(
            this.DaoCommon.tkd(category),
            this.DaoCommon.homeListCount(3),
            this.DaoAtlas.picList(limit, offset, this.resultMapNormal)
        );
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.tkd = homeList[0];
        homeListResult.pageInfo = this.pageNotice(homeList[1], limit, pageStart);
        homeListResult.picSet = homeList[2];
        return homeListResult;
    };
};