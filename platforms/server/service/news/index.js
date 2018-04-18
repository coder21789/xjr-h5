/**
 * 一级频道推荐Service类
 * @class ServiceNewsRecommend
 */

import Dao from '../../dao/';
import Utils from '../../lib';

module.exports = class ServiceNewsRecommend extends Utils.format {
    constructor(context) {
        super();
        this.DaoCommon = new Dao.common(context);
        this.DaoNewsRecommend = new Dao.news(context);
        this.DaoAtlas = new Dao.atlas(context);
        this.DaoEvent = new Dao.event(context);
        this.DaoTopic = new Dao.topic(context);
        this.context = context;
    };

    /**
     * 获取一级频道首页列表数据
     * @returns {Promise<any>|Promise.<*>|Promise<TAll[]>}
     */

    async serviceRecommendHome(limit, offset, category, pageStart) {
        let queue = [];
        queue.push(
            this.DaoNewsRecommend.newsList(limit, offset, category, this.resultMapTable),
            this.DaoNewsRecommend.newsListCount(category)
        );
        if (offset < 1) {
            queue.push(
                this.DaoCommon.tkd(category),
                this.DaoNewsRecommend.bannerList(5, 0, category),
                this.DaoAtlas.picList(3, 0, this.resultMapNormal),
                this.DaoEvent.eventList(3, 0, this.resultMapCollection),
                this.DaoTopic.topicList(3, 0, this.resultMapCollection)
            )
        }
        const homeList = await Promise.all(queue);
        let homeListResult = {};
        homeListResult.suggest = homeList[0];
        homeListResult.pageInfo = this.pageNotice(homeList[1], limit, pageStart);
        if (offset < 1) {
            homeListResult.tkd = homeList[2];
            homeListResult.banner = homeList[3];
            homeListResult.suggest.splice(2, 0, homeList[4][0]); // 插入第一个图集
            homeListResult.suggest.splice(4, 0, homeList[5][0]); // 插入第一个大事件
            homeListResult.suggest.splice(6, 0, homeList[6][0]); // 插入第一个话题
            homeListResult.suggest.splice(9, 0, homeList[4][1]); // 插入第二个图集
            homeListResult.suggest.splice(11, 0, homeList[5][1]); // 插入第二个大事件
            homeListResult.suggest.splice(13, 0, homeList[6][1]); // 插入第二个话题
            homeListResult.suggest.splice(16, 0, homeList[4][2]); // 插入第三个图集
            homeListResult.suggest.splice(18, 0, homeList[5][2]); // 插入第三个大事件
            homeListResult.suggest.splice(20, 0, homeList[6][2]); // 插入第三个话题
        }
        return homeListResult;
    };

    /**
     * 获取一级频道列表数据
     * @param limit
     * @param offset
     * @param category
     * @returns {Promise<any>|Promise.<*>|Promise<TAll[]>}
     */

    async serviceRecommendChannel(limit, offset, category, pageStart) {

        /**
         * 含今日关注频道
         * 含banner频道
         * @type {string}
         */

        const TODAY_FOCUS = 'cj';
        const BANNER = 'cj,jj,lc';

        let queue = [];
        queue.push(
            this.DaoNewsRecommend.newsList(limit, offset, category, this.resultMapTable),
            this.DaoNewsRecommend.newsListCount(category)
        );
        if (offset < 1) {
            queue.push(
                this.DaoCommon.tkd(category)
            );
            if (BANNER.indexOf(category) > -1) queue.push(this.DaoNewsRecommend.bannerList(3, 0, category));
            if (TODAY_FOCUS.indexOf(category) > -1) queue.push(this.DaoNewsRecommend.todayFocus());
        }
        const channelList = await Promise.all(queue);
        let channelListResult = {};
        channelListResult.suggest = channelList[0];
        channelListResult.pageInfo = this.pageNotice(channelList[1], limit, pageStart);
        if (offset < 1) {
            channelListResult.tkd = channelList[2];
            channelListResult.banner = [];
            if (BANNER.indexOf(category) > -1) channelListResult.banner = channelList[3];
            if (TODAY_FOCUS.indexOf(category) > -1) channelListResult.today = channelList[4];
        }
        return channelListResult;
    };

    /**
     * 获取二级频道新闻列表数据
     * @param limit
     * @param offset
     * @param category
     * @param pageStart
     * @return {{}}
     */

    async serviceChannel(limit, offset, category, pageStart) {
        let categoryId = await this.DaoCommon.categoryId(1, category);
        let queue = [];
        queue.push(
            this.DaoNewsRecommend.channelNewsList(limit, offset, categoryId.id, this.resultMapNormal),
            this.DaoNewsRecommend.channelNewsListCount(categoryId.id)
        );
        if (offset < 1) {
            queue.push(
                this.DaoCommon.tkd(category)
            );
        }
        const channelList = await Promise.all(queue);
        let channelListResult = {};
        channelListResult.suggest = channelList[0];
        channelListResult.pageInfo = this.pageNotice(channelList[1], limit, pageStart);
        if (offset < 1) {
            channelListResult.tkd = channelList[2];
        }
        return channelListResult;
    };
};