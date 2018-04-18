/**
 * 大画财经频道Dao层数据类
 * @type {DaoFinance}
 */

module.exports = class DaoFinance {
    constructor(context) {
    	this.context = context;
        this.news = this.context.mysql('news');
    };

    /**
     * 分页查询大画财经新闻列表
     * @param limit, offset
     * @returns {*}
     */

    async financeList(limit, offset, callback) {
    	const financeList = await this.context.findAllMap([{
	        model: this.news,
	        arg: {
	            order: 'region DESC',
	            limit: limit,
	            offset: offset,
	            attributes: ['id', ['news_url', 'newsUrl'], 'subject', 'summary', 'publish_time', ['thumbnail_url', 'newsImageUrl'], ['news_type', 'newsType'], ['read_count', 'readCount'], 'region'],
	            where: {news_type: 6, status: 1}
	        }}]);
	    const financeListResult = await callback(financeList);
	    return financeListResult[0];
    };

    /**
     * 查询某个id下的大画财经新闻数据
     * @param id
     * @returns {*}
     */

    async financeNews(id) {
        const financeNews = await this.context.findAllMap([{
            model: this.news,
            arg: {
                attributes: ['id', 'subject', 'summary', 'content', 'region'],
                where: {news_type: 6, status: 1, id: id}
            }}]);
        const financeNewsResult = await this.context.resultMap(financeNews);
        return financeNewsResult[0][0];
    };

    /**
     * 查询某个id下的往期回顾3条数据
     * @param region, limit
     * @returns {*}
     */

    async financeHistoryNews(region, limit) {
        const threshold = limit + 1;
        const offset = region < threshold ? 0 : region - threshold;
        const financeHistoryNews = await this.context.findAllMap([{
            model: this.news,
            arg: {
                order: 'region ASC',
                limit: limit,
                offset: offset,
                attributes: ['id', 'subject', 'region', ['news_url', 'newsUrl'], ['thumbnail_url', 'newsImageUrl']],
                where: {news_type: 6, status: 1}
            }}]);
        const financeHistoryNewsResult = await this.context.resultMap(financeHistoryNews);
        return financeHistoryNewsResult[0];
    };
};