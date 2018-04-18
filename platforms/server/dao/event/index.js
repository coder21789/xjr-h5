/**
 * 大事件频道Dao层数据类
 * @type {DaoEvent}
 */

module.exports = class DaoEvent {
    constructor(context) {
    	this.context = context;
        this.news = this.context.mysql('news');
        this.event = this.context.mysql('event');
        this.user = this.context.mysql('user');
    	this.event.belongsTo(this.news, {foreignKey: 'rel_news_id'});
    	this.news.hasMany(this.event, {foreignKey: 'rel_news_id'});
    	this.news.belongsTo(this.user, {foreignKey: 'publish_author_id'});
    };

    /**
     * 查询大事件新闻最近3条
     * @param callback
     * @returns {*}
     */

    async eventList(limit, offset, callback) {
    	const eventList = await this.context.findAllMap([{
	        model: this.news,
	        arg: {
	            order: 'publish_time DESC',
	            limit: limit,
	            offset: offset,
	            include: [{model: this.user, attributes: ['name']}],
	            attributes: ['id', ['news_url', 'newsUrl'], 'subject', 'publish_time', ['thumbnail_url', 'newsImageUrl'], ['news_type', 'newsType']],
	            where: {news_type: 5, status: 1, content_template_id: {$lte: 2}}
	        }}]);
	    const eventListResult = await callback(eventList, 'user');
	    return eventListResult[0];
    };
};