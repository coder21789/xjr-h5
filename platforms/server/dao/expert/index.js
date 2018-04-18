/**
 * 专家Dao层数据类
 * @type {DaoExpert}
 */

 module.exports = class DaoExpert {
 	constructor(context) {
 		this.context = context;
 		this.user = this.context.mysql('user');
 		this.news = this.context.mysql('news');
 	};

     /**
	  * 查询用户信息
      * @param userId
      * @returns {Promise.<*>}
      */

 	async userInfo(userId) {
 		let getUserInfo = await this.context.findAllMap([{
            model: this.user,
            arg: {
                attributes: [['id', 'expertId'], ['user_name', 'username'], ['name', 'author'], ['head_img_url', 'authorImageUrl'], ['description', 'desc'], ['nick_name', 'job'], ['good_at_category', 'goodAtCategories']],
                where: {id: userId, enable: 0}
            }
        }]);
        getUserInfo = await this.context.resultMap(getUserInfo);
        return getUserInfo[0][0];
 	};

     /**
	  * 查询某种系统权限用户信息列表
      * @param userIdArrayList
      * @returns {Promise.<Array>}
      */

 	async userInfoList(userIdArrayList) {
 		let that = this,
	    	getUserInfoList = [];
	    async function _getUserInfo(ObjectId) {
 			let getUserInfo = await that.userInfo(ObjectId.user_id);
 			return getUserInfo;
 		};
 		for (var i = 0; i < userIdArrayList.length; i++) {
			let getUserInfo = await _getUserInfo(userIdArrayList[i]);
			getUserInfoList.push(getUserInfo);
		}
 		return getUserInfoList;
 	};

     /**
	  * 查询用户发表文章列表
      * @param limit
      * @param offset
      * @param publishAuthorId
      * @param callback
      * @returns {Promise.<*>}
      */

 	async userNews(limit, offset, publishAuthorId, callback) {
 		let getNews = await this.context.findAllMap([{
            model: this.news,
            arg: {
                order: 'publish_time DESC',
                limit: limit,
                offset: offset,
                attributes: ['id', ['news_url', 'newsUrl'], 'subject', 'summary', 'publish_time', ['news_source', 'source'], 'publish_author_id'],
                where: {publish_author_id: publishAuthorId, status: 1}
            }
        }]);
        getNews = await callback(getNews);
        return getNews[0];
 	};

     /**
	  * 查询某种系统权限用户发表文章列表
      * @param limit
      * @param offset
      * @param publishAuthorIdArrayList
      * @param callback
      * @returns {Promise.<Array>}
      */

 	async userNewsList(limit, offset, publishAuthorIdArrayList, callback) {
 		let that = this,
	    	getUserNewsList = [];
	    async function _getUserNews(ObjectId) {
	    	let getNews = await that.userNews(limit, offset, ObjectId.user_id, callback);
	    	return getNews;
	    };
	    for (var i = 0; i < publishAuthorIdArrayList.length; i++) {
			let getNews = await _getUserNews(publishAuthorIdArrayList[i]);
			getUserNewsList.push(getNews);
		}
 		return getUserNewsList;
 	};

     /**
	  * 查询用户发表总数
      * @param publishAuthorId
      * @returns {Promise.<*>}
      */

 	async userNewsCount(publishAuthorId) {
        const userNewsCount = await this.context.count({
            model: this.news,
            arg: {
                where: {status: 1, publish_author_id: publishAuthorId}
            }
        });
        return userNewsCount;
    };	
 };