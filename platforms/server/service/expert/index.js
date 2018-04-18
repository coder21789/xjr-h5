/**
 * 专家频道Service类
 * @class ServiceExpert
 */

import Dao from '../../dao/';
import Utils from '../../lib';
import config from '../../../common/config';

module.exports = class ServiceExpert extends Utils.format {
    constructor(context) {
        super();
        this.DaoCommon = new Dao.common(context);
        this.DaoExpert = new Dao.expert(context);
        this.context = context;
    };

    /**
     * 获取专家频道首页列表数据
     * @param category
     * @returns {Promise.<{}>}
     */

    async serviceExpertHome(category) {
        let roleId = await this.DaoCommon.roleId('专家');
        let userIdArrayList = await this.DaoCommon.userId(roleId, this.resultMapTable);
        let queue = [];
        queue.push(
            this.DaoCommon.tkd(category),
            this.DaoExpert.userInfoList(userIdArrayList),
            this.DaoExpert.userNewsList(3, 0, userIdArrayList, this.resultMapNormal)
        );
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.tkd = homeList[0];
        homeListResult.expert = homeList[1];
        homeListResult.news = homeList[2];
        return homeListResult;
    };

    /**
     * 获取专家详情列表数据
     * @param limit
     * @param offset
     * @param userId
     * @param pageStart
     * @returns {Promise.<{}>}
     */

    async serviceExpertList(limit, offset, userId, pageStart) {
        let queue = [];
        queue.push(
            this.DaoExpert.userNews(limit, offset, userId, this.resultMapNormal),
            this.DaoExpert.userNewsCount(userId)
        );
        if (offset < 1) {
            queue.push(
                this.DaoExpert.userInfo(userId)
            )
        }
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.news = homeList[0];
        homeListResult.pageInfo = this.pageNotice(homeList[1], limit, pageStart);
        homeListResult.expert = homeList[2] ? this.En2Cn(homeList[2], 'goodAtCategories', 'goodAtCategoryNames', config, 'goodAt', 6) : homeList[2];
        return homeListResult;
    };
};