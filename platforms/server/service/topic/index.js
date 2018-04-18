/**
 * 话题频道Service类
 * @class ServiceAtlas
 */

import Dao from '../../dao/';
import Utils from '../../lib';

module.exports = class ServiceTopic extends Utils.format {
    constructor(context) {
        super();
        this.DaoCommon = new Dao.common(context);
        this.DaoTopic = new Dao.topic(context);
        this.context = context;
    };

    /**
     * 获取话题频道列表数据
     * @param limit
     * @param offset
     * @param category
     * @returns {*}
     */

    async serviceTopicHome(limit, offset, category, pageStart) {
        let queue = [];
        queue.push(
            this.DaoCommon.tkd(category),
            this.DaoCommon.homeListCount(4),
            this.DaoTopic.topicHomeList(limit, offset)
        );
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.tkd = homeList[0];
        homeListResult.pageInfo = this.pageNotice(homeList[1], limit, pageStart);
        homeListResult.list = homeList[2];
        return homeListResult;
    };
};