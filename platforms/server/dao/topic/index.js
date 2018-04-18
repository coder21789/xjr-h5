/**
 * 话题频道Dao层数据类
 * @type {DaoTopic}
 */

module.exports = class DaoTopic {
    constructor(context) {
    	this.context = context;
        this.news = this.context.mysql('news');
        this.topic = this.context.mysql('topic');
        this.topic.belongsTo(this.news, {foreignKey: 'rel_news_id'});
    	this.news.hasMany(this.topic, {foreignKey: 'news_id'});
    };

    /**
     * 查询话题新闻最近3条
     * @param callback
     * @returns {*}
     */

    async topicList(limit, offset, callback) {
    	const topicList = await this.context.findAllMap([{
	        model: this.news,
	        arg: {
	            order: 'publish_time DESC',
	            limit: limit,
	            offset: offset,
	            attributes: ['id', ['news_url', 'newsUrl'],'subject', 'publish_time', ['news_type', 'newsType']],
	            where: {news_type: 4, status: 1},
	            include: [{model: this.topic, attributes: [['news_url', 'newsUrl'], ['news_recommend_subject', 'subject'], ['pic_url_list', 'newsImageUrl']]}]
	        }
	    }]);
	    const topicListResult = await callback(topicList, '', 'topics');
	    return topicListResult[0];
    };

	/**
	 * 查询话题频道列表分页
	 * @param limit
	 * @param offset
	 * @return {*}
     */

    async topicHomeList(limit, offset) {
		const topicHomeList = await this.context.findAllMap([{
			model: this.news,
			arg: {
				order: 'publish_time DESC',
				limit: limit,
				offset: offset,
				attributes: [['news_url', 'topicUrl'], ['subject', 'topicSubject'], ['thumbnail_url', 'topicPic']],
				where: {news_type: 4, status: 1}
			}
		}]);
		const topicHomeListResult = await this.context.resultMap(topicHomeList);
		return topicHomeListResult[0];
    };
};