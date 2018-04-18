/**
 * 大画财经频道Service类
 * @class ServiceFinance
 */

import Dao from '../../dao/';
import Utils from '../../lib';

module.exports = class ServiceFinance extends Utils.format {
    constructor(context) {
        super();
        this.DaoCommon = new Dao.common(context);
        this.DaoFinance = new Dao.finance(context);
        this.context = context;
    };

    /**
     * 获取大画财经频道列表数据
     * @param limit
     * @param offset
     * @param category
     * @returns {*}
     */

    async serviceFinanceHome(limit, offset, category, pageStart) {
        let queue = [];
        queue.push(
            this.DaoCommon.homeListCount(6),
            this.DaoFinance.financeList(limit, offset, this.resultMapNormal)
        );
        if (offset < 1) {
            queue.push(
                this.DaoCommon.tkd(category)
            )
        }
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.pageInfo = this.pageNotice(homeList[0], limit, pageStart);
        homeListResult.list = homeList[1];
        homeListResult.tkd = homeList[2];
        return homeListResult;
    };

    /**
     * 获取某个id下的大画财经详情数据
     * @param category
     * @param id
     * @returns {*}
     */

    async serviceFinanceDetails(id) {
        let news = await this.DaoFinance.financeNews(id);
        news.content = this.string2ArrayList(news.content, ',');
        let queue = [];
        queue.push(
            this.DaoFinance.financeHistoryNews(news.region, 3)
        );
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.news = news;
        homeListResult.history = homeList[0];
        return homeListResult;
    };
};