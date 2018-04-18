/**
 * 图集频道Dao层数据类
 * @type {DaoAtlas}
 */

module.exports = class DaoAtlas {
    constructor(context) {
    	this.context = context;
        this.news = this.context.mysql('news');
        this.pic = this.context.mysql('pic');
    	this.pic.belongsTo(this.news, {foreignKey: 'news_id'});
        this.news.hasMany(this.pic, {foreignKey: 'news_id'});
    };

    /**
     * 查询图集新闻最近3条
     * @param callback
     * @returns {*}
     */

    async picList(limit, offset, callback) {
    	const picList = await this.context.findAllMap([{
	        model: this.news,
	        arg: {
	            order: 'publish_time DESC',
	            limit: limit,
	            offset: offset,
	            attributes: ['id', ['news_url', 'newsUrl'], 'subject', 'publish_time', ['news_type', 'newsType']],
	            where: {news_type: 3, status: 1},
	            include: [{ model: this.pic, attributes: ['pic_url_list']}]
	        }
	    }]);
	    const picListResult = await callback(picList);
	    return picListResult[0];
    };
};