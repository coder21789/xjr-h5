/**
 * 推荐一级频道Dao层数据类
 * @type {DaoNewsRecommend}
 */

module.exports = class DaoNewsRecommend {
    constructor(context) {
    	this.context = context;
        this.appRecommend = this.context.mysql('appRecommend');
        this.news = this.context.mysql('news');
        this.recommend = this.context.mysql('recommend');
        this.appRecommend.belongsTo(this.news, {foreignKey: 'news_id'});
    	this.news.hasMany(this.appRecommend, {foreignKey: 'news_id'});
        this.news.belongsTo(this.appRecommend, {foreignKey: 'id'});
    };

    /**
     * 查询推荐banner新闻
     * @returns {*}
     */

    async bannerList(limit, offset, category) {
    	const BannerList = await this.context.findAllMap([{
	        model: this.appRecommend,
	        arg: {
	            order: 'publish_time DESC',
	            limit: limit,
                offset: offset,
	            attributes: [['news_id', 'id'], ['news_url', 'newsUrl'], ['news_pic', 'newsImageUrl'], ['news_recommend_subject', 'subject']],
	            where: {state: 1, category_code: category, recommend_type: 1}
	        }
	    }]);
	    const BannerListResult = await this.context.resultMap(BannerList);
	    return BannerListResult[0];
    };

    /**
     * 查询普通推荐新闻
     * @param callback
     * @returns {*}
     */

    async newsList(limit, offset, category, callback) {
        const newsList = await this.context.findAllMap([{
            model: this.appRecommend,
            arg: {
                order: 'publish_time DESC',
                limit: limit,
                offset: offset,
                attributes: [['news_id', 'id'], ['news_url', 'newsUrl'], ['news_pic', 'newsImageUrl'], ['news_recommend_subject', 'subject'], 'publish_time', ['recommend_type', 'newsType']],
                where: {state: 1, category_code: category, recommend_type: {$or: [2, 3]}},
                include: [{model: this.news, attributes: [['news_source', 'source'], 'publish_time']}]
            }
        }]);
        const newsListResult = await callback(newsList, 'news');
        return newsListResult[0];
    };

    /**
     * 查询普通推荐新闻总条数
     * @param category
     * @returns {*}
     */

    async newsListCount(category) {
        const newsListCount = await this.context.count({
            model: this.appRecommend,
            arg: {
                where: {state: 1, category_code: category, recommend_type: {$or: [2, 3]}}
            }
        });
        return newsListCount;
    };

    /**
     * 查询web端财经频道下今日话题推荐位数据
     * @returns {*}
     */

    async todayFocus() {
        const todayFocus = await this.context.findAllMap([{
            model: this.recommend,
            arg: {
                attributes: [['news_url', 'newsUrl'], ['news_recommend_subject', 'subject']],
                where: {recommend_code: 'web_cj_jrht', state: '1'}
            }
        }]);
        const todayFocusResult = await this.context.resultMap(todayFocus);
        return todayFocusResult[0][0];
    };

    /**
     * 查询二级频道普通新闻数据
     * @param limit
     * @param offset
     * @param categoryId
     * @param callback
     * @return {*}
     */

    async channelNewsList(limit, offset, categoryId, callback) {
        const channelNewsList = await this.context.findAllMap([{
            model: this.news,
            arg: {
                order: 'publish_time DESC',
                limit: limit,
                offset: offset,
                attributes: ['id', ['news_url', 'newsUrl'], 'subject', 'publish_time', ['news_source', 'source']],
                where: {category_id: categoryId, status: 1},
                include: [{model: this.appRecommend, attributes: [['news_pic', 'newsImageUrl'], ['id', 'recommendId']]}]
            }
        }]);
        const channelNewsListResult = await callback(channelNewsList, 'appRecommends');
        return channelNewsListResult[0];
    };

    /**
     * 查询二级频道新闻总数
     * @param categoryId
     * @return {*}
     */

    async channelNewsListCount(categoryId) {
        const channelNewsListCount = await this.context.count({
            model: this.news,
            arg: {
                where: {category_id: categoryId, status: 1}
            }
        });
        return channelNewsListCount;
    };
};