/**
 *
 * 同步Action常量
 * Action数据结构生成函数
 * @todo actionCreator逻辑拆分
 *
 */

import * as types from './types';

/**
 * 一级栏目推荐新闻Action
 * @param code
 * @param page
 */

export const requestNewsRecommend = (code, page) => ({
    type: types.REQUEST_NEWS_RECOMMEND,
    code,
    page
});

export const receiveNewsRecommend = (code, json, page) => ({
    type: types.RECEIVE_NEWS_RECOMMEND,
    code,
    posts: json,
    page,
    pageInfo: json.resultBody.pageInfo,
});

/**
 * 一级栏目推荐新闻Action分页逻辑
 * @param code
 * @param json
 * @param page
 * @param playload
 * @param ratio
 * @returns {{type, code: *, page: *, ratio: *, pageInfo, playload: {}}}
 */

export const receiveNewsRecommendLoadMore = function(code, json, page, playload, ratio) {
    // 频道下已存在数据则按照页面索引缓存数据
    let _page = playload && Object.keys(playload).indexOf(code) > -1 ? playload[code] : {};
    return {
        type: types.RECEIVE_NEWS_RECOMMEND_LOADMORE,
        code,
        page,
        ratio,
        pageInfo: json.resultBody.pageInfo,
        // 已存在数据则按照分页索引追加缓存数据
        playload: {...playload, [code]: {..._page, [page]: json.resultBody.suggest}}
    };
};

/**
 * 二级栏目推荐新闻Action
 * @param code
 */

export const requestNewsRecommendQq = (code, page) => ({
    type: types.REQUEST_NEWS_RECOMMEND_QQ,
    code,
    page
});

export const receiveNewsRecommendQq = (code, json, page) => ({
    type: types.RECEIVE_NEWS_RECOMMEND_QQ,
    code,
    page,
    pageInfo: json.resultBody.pageInfo,
    posts: json
});

/**
 * 二级频道新闻Action分页逻辑
 * @param code
 * @param json
 * @param page
 * @param playload
 * @param ratio
 * @returns {{type, code: *, page: *, ratio: *, pageInfo, playload: {}}}
 */

export const receiveNewsRecommendQqLoadMore = function(code, json, page, playload, ratio) {
    // 频道下已存在数据则按照页面索引缓存数据
    let _page = playload && Object.keys(playload).indexOf(code) > -1 ? playload[code] : {};
    return {
        type: types.RECEIVE_NEWS_RECOMMEND_QQ_LOADMORE,
        code,
        page,
        ratio,
        pageInfo: json.resultBody.pageInfo,
        // 已存在数据则按照分页索引追加缓存数据
        playload: {...playload, [code]: {..._page, [page]: json.resultBody.suggest}}
    };
};

/**
 * 24小时新闻Action
 * @param code
 * @param date
 */

export const requestNewsLive = (code, date) => ({
    type: types.REQUEST_NEWS_LIVE,
    code,
    date
});

export const receiveNewsLive = (code, date, json) => ({
    type: types.RECEIVE_NEWS_LIVE,
    code,
    date,
    posts: json
});

/**
 * 专家列表Action
 */

export const requestNewsExpert = () => ({
    type: types.REQUEST_NEWS_EXPERT
});

export const receiveNewsExpert = (json) => ({
    type: types.RECEIVE_NEWS_EXPERT,
    posts: json
});

/**
 * 专家详情Action
 * @param username
 */

export const requestNewsExpertDetails = (username) => ({
    type: types.REQUEST_NEWS_EXPERT_DETAILS,
    username
});

export const receiveNewsExpertDetails = (json, page) => ({
    type: types.RECEIVE_NEWS_EXPERT_DETAILS,
    page,
    posts: json,
    pageInfo: json.resultBody.pageInfo,
});

/**
 * 专家频道新闻Action分页逻辑
 * @param username
 * @param json
 * @param page
 * @param playload
 * @param ratio
 * @returns {{type, page: *, ratio: *, username: *, pageInfo, playload: {}}}
 */

export const receiveNewsExpertDetailsLoadMore = function(username, json, page, playload, ratio) {
    // 专家下已存在数据则按照页面索引缓存数据
    let _page = playload && Object.keys(playload).indexOf(username) > -1 ? playload[username] : {};
    return {
        type: types.RECEIVE_NEWS_EXPERT_DETAILS_LOADMORE,
        page,
        ratio,
        username,
        pageInfo: json.resultBody.pageInfo,
        // 已存在数据则按照分页索引追加缓存数据
        playload: playload ? {...playload, [username]: {..._page, [page]: json.resultBody.news}} : {[username]: {..._page, [page]: json.resultBody.news}}
    };
};

/**
 * 话题列表Action
 */

export const requestNewsTopic = () => ({
    type: types.REQUEST_NEWS_TOPIC
});

export const receiveNewsTopic = (json, page) => ({
    type: types.RECEIVE_NEWS_TOPIC,
    posts: json,
    page,
    pageInfo: json.resultBody.pageInfo
});

/**
 * 话题列表Action分页逻辑
 * @param json
 * @param page
 * @param playload
 * @param ratio
 * @returns {{type, page: *, ratio: *, pageInfo, playload: [*,*]}}
 */

export const receiveNewsTopicLoadMore = function(json, page, playload, ratio) {
    return {
        type: types.RECEIVE_NEWS_TOPIC_LOADMORE,
        page,
        ratio,
        pageInfo: json.resultBody.pageInfo,
        // 已存在数据则按照分页索引追加缓存数据
        playload: playload ? [...playload, ...json.resultBody.list] : json.resultBody.list
    };
};

/**
 * 话题详情Action
 */

export const requestNewsTopicDetails = () => ({
    type: types.REQUEST_NEWS_TOPIC_DETAILS
});

export const receiveNewsTopicDetails = (json) => ({
    type: types.RECEIVE_NEWS_TOPIC_DETAILS,
    posts: json
});

/**
 * 文章详情Action
 * @param newsId
 */

export const requestNewsDetails = (newsId) => ({
    type: types.REQUEST_NEWS_DETAILS,
    newsId
});

export const receiveNewsDetails = (json, array) => ({
    type: types.RECEIVE_NEWS_DETAILS,
    content: json,
    about: array
});

/**
 * 行情数据Action
 * @param catCode
 */

export const requestNewsRange = (catCode) => ({
    type: types.REQUEST_NEWS_RANGE,
    catCode
});

export const receiveNewsRange = (payload, channel, data) => ({
    type: types.RECEIVE_NEWS_RANGE,
    // 按照行情频道分类缓存最新行情数据
    payload: {...payload, [channel]: data}
});

/**
 * 小频道栏目推荐新闻Action
 * @param code
 */

export const requestNewsRecommendChannel = (code) => ({
    type: types.REQUEST_NEWS_RECOMMEND_CHANNEL,
    code
});

export const receiveNewsRecommendChannel = (code, json) => ({
    type: types.RECEIVE_NEWS_RECOMMEND_CHANNEL,
    code,
    posts: json
});

/**
 * 图集新闻Action
 */

export const requestNewsAtlas = () => ({
    type: types.REQUEST_NEWS_ATLAS
});

export const receiveNewsAtlas = (json, page) => ({
    type: types.RECEIVE_NEWS_ATLAS,
    posts: json,
    page,
    pageInfo: json.resultBody.pageInfo
});

/**
 * 图集新闻Action分页逻辑
 * @param json
 * @param page
 * @param playload
 * @param ratio
 * @returns {{type, page: *, ratio: *, pageInfo, playload: [*,*]}}
 */

export const receiveNewsAtlasLoadMore = function(json, page, playload, ratio) {
    return {
        type: types.RECEIVE_NEWS_ATLAS_LOADMORE,
        page,
        ratio,
        pageInfo: json.resultBody.pageInfo,
        // 已存在数据则按照分页索引追加缓存数据
        playload: playload ? [...playload, ...json.resultBody.picSet] : json.resultBody.picSet
    };
};

/**
 * 图集详情Action
 * @param code
 */

export const requestNewsAtlasDetails = (code) => ({
    type: types.REQUEST_NEWS_ATLAS_DETAILS,
    code
});

export const receiveNewsAtlasDetails = (json) => ({
    type: types.RECEIVE_NEWS_ATLAS_DETAILS,
    posts: json
});

/**
 * 评论列表Action
 * @param newsId
 * @param isAll
 */

export const requestReviewList = (newsId, isAll) => ({
    type: types.REQUEST_REVIEW_LIST,
    newsId,
    isAll
});

export const receiveReviewList = (json, isAll) => ({
    type: types.RECEIVE_REVIEW_LIST,
    posts: json,
    isAll
});

/**
 * 评论详情Action
 * @param reviewId
 * @param newsId
 */

export const requestReviewDetails = (reviewId, newsId) => ({
    type: types.REQUEST_REVIEW_DETAILS,
    reviewId,
    newsId
});

export const receiveReviewDetails = (json) => ({
    type: types.RECEIVE_REVIEW_DETAILS,
    posts: json
});

/**
 * 评论点赞Action
 * @param reviewId
 */

export const requestReviewLike = (reviewId) => ({
    type: types.REQUEST_REVIEW_LIKE,
    reviewId
});

export const receiveReviewLike = (reviewId, json) => ({
    type: types.RECEIVE_REVIEW_LIKE,
    reviewId,
    posts: json
});

/**
 * 回复点赞Action
 * @param replyId
 * @param newsId
 */

export const requestReplyLike = (replyId, newsId) => ({
    type: types.REQUEST_REPLY_LIKE,
    replyId,
    newsId
});

export const receiveReplyLike = (replyId, newsId, json) => ({
    type: types.RECEIVE_REPLY_LIKE,
    replyId,
    newsId,
    posts: json
});

/**
 * 新闻评论Action
 * @param newsId
 * @param content
 */

export const requestNewsReview = (newsId, content) => ({
    type: types.REQUEST_NEWS_REVIEW,
    newsId,
    content
});

export const receiveNewsReview = (newsId, json) => ({
    type: types.RECEIVE_NEWS_REVIEW,
    newsId,
    posts: json
});

/**
 * 回复评论Action
 * @param reviewId
 * @param content
 */

export const requestAnswerReview = (reviewId, content) => ({
    type: types.REQUEST_ANSWER_REVIEW,
    reviewId,
    content
});

export const receiveAnswerReview = (reviewId, json) => ({
    type: types.RECEIVE_ANSWER_REVIEW,
    reviewId,
    posts: json
});

/**
 * 回复回复Action
 * @param replyId
 * @param content
 */

export const requestAnswerReply = (replyId, content) => ({
    type: types.REQUEST_ANSWER_REPLY,
    replyId,
    content
});

export const receiveAnswerReply = (replyId, json) => ({
    type: types.RECEIVE_ANSWER_REPLY,
    replyId,
    posts: json
});

/**
 * 后台请求进度Action
 * 首屏若已静态化则第一屏内容无需请求数据
 * 后续任动态请求后台接口
 */

export const nodeLoad = () => ({
    type: types.NODE_LOAD
});

export const nodeUnLoad = () => ({
    type: types.NODE_UNLOAD 
});

/**
 * 下载条Action
 */

export const appDownLoad = () => ({
    type: types.APP_DOWNLOAD
});

/**
 * 全局变量Action
 * @param height
 * @param fontSize
 * 以便在图片懒加载是动态设置占位符宽高
 */

export const windowObject = (height, fontSize) => ({
    type: types.WINDOW_OBJECT,
    height: height,
    fontSize: fontSize
});

/**
 * 大事件列表Action
 * @param code
 */

export const requestNewsEvent = (code) => ({
    type: types.REQUEST_NEWS_EVENT,
    code
});

export const receiveNewsEvent = (code, json) => ({
    type: types.RECEIVE_NEWS_EVENT,
    code,
    posts: json
});

/**
 * 大事件详情Action
 * @param id
 */

export const requestNewsEventDetails = (id) => ({
    type: types.REQUEST_NEWS_EVENT_DETAILS,
    id
});

export const receiveNewsEventDetails = (id, json) => ({
    type: types.RECEIVE_NEWS_EVENT_DETAILS,
    id,
    posts: json
});

/**
 * 关键词列表Action
 * @param id
 */

export const requestNewsWordList = (id) => ({
    type: types.REQUEST_NEWS_WORD,
    id
});

export const receiveNewsWordList = (id, json) => ({
    type: types.RECEIVE_NEWS_WORD,
    id,
    posts: json
});

/**
 * 主播音频列表Action
 * @param id
 */

export const requestTingAuthor = (id) => ({
    type: types.REQUEST_TINY_AUTHOR,
    id
});

export const receiveTingAuthor = (id, json) => ({
    type: types.RECEIVE_TINY_AUTHOR,
    id,
    posts: json
});

/**
 * 音频播放列表Action
 * @param id
 */

export const requestTingAudio = (id) => ({
    type: types.REQUEST_TINY_AUDIO,
    id
});

export const receiveTingAudio = (id, json) => ({
    type: types.RECEIVE_TINY_AUDIO,
    id,
    posts: json
});

/**
 * 广告合作Action
 * @param params
 */

export const requestAdCooperate = (params) => ({
    type: types.REQUEST_AD_COOPERATE,
    params
});

export const receiveAdCooperate = (json) => ({
    type: types.RECEIVE_AD_COOPERATE,
    posts: json
});

export const resetAdCooperate = () => ({
    type: types.RESET_AD_COOPERATE
});

/**
 * 大画财经列表Action
 */

export const requestNewsFinance = () => ({
    type: types.REQUEST_NEWS_FINANCE
});

export const receiveNewsFinance = (json, page) => ({
    type: types.RECEIVE_NEWS_FINANCE,
    posts: json,
    page,
    pageInfo: json.resultBody.pageInfo
});

/**
 * 大画财经列表Action分页逻辑
 * @param json
 * @param page
 * @param playload
 * @param ratio
 * @returns {{type, page: *, ratio: *, pageInfo, playload: [*,*]}}
 */

export const receiveNewsFinanceLoadMore = function(json, page, playload, ratio) {
    return {
        type: types.RECEIVE_NEWS_FINANCE_LOADMORE,
        page,
        ratio,
        pageInfo: json.resultBody.pageInfo,
        // 已存在数据则按照分页索引追加缓存数据
        playload: playload ? [...playload, ...json.resultBody.list] : json.resultBody.list
    };
};

/**
 * 大画财经详情Action
 * @param newsId
 */

export const requestNewsFinanceDetails = (newsId) => ({
    type: types.REQUEST_NEWS_FINANCE_DETAILS,
    newsId
});

export const receiveNewsFinanceDetails = (json) => ({
    type: types.RECEIVE_NEWS_FINANCE_DETAILS,
    posts: json
});

/**
 * 微信用户信息Action
 * @param code
 */

export const requestWechatInfo = (code) => ({
    type: types.REQUEST_WECHAT_INFO,
    code
});

export const receiveWechatInfo = (json) => ({
    type: types.RECEIVE_WECHAT_INFO,
    posts: json
});

export const insertWechatInfo = (json) => ({
    type: types.INSERT_WECHAT_INFO,
    posts: json
});

/**
 * 春运活动列表Action
 */

export const requestSpringReviewList = () => ({
    type: types.REQUEST_SPRING_REVIEW_LIST
});

export const receiveSpringReviewList = (json, page) => ({
    type: types.RECEIVE_SPRING_REVIEW_LIST,
    posts: json,
    page,
    pageInfo: json.resultBody.pageTotal
});

/**
 * 春运活动列表Action分页逻辑
 * @param json
 * @param page
 * @param playload
 * @returns {{type, page: *, pageInfo, playload: [*,*]}}
 */

export const receiveSpringReviewListLoadMore = function(json, page, playload) {
    return {
        type: types.RECEIVE_SPRING_REVIEW_LIST_LOADMORE,
        page,
        pageInfo: json.resultBody.pageTotal,
        // 已存在数据则按照分页索引追加缓存数据
        playload: playload ? [...playload, ...json.resultBody.list] : json.resultBody.list
    };
};

/**
 * 春运活动评论图片上传Action
 */

export const requestSpringReviewImageUpload = () => ({
    type: types.REQUEST_SPRING_REVIEW_IMAGE_UPLOAD
});

export const receiveSpringReviewImageUpload = (json) => ({
    type: types.RECEIVE_SPRING_REVIEW_IMAGE_UPLOAD,
    posts: json
});

/**
 * 春运活动评论Action
 */

export const requestSpringReviewAdd = () => ({
    type: types.REQUEST_SPRING_REVIEW_ADD
});

export const receiveSpringReviewAdd = (json) => ({
    type: types.RECEIVE_SPRING_REVIEW_ADD,
    posts: json
});

export const resetSpringReviewAdd = () => ({
    type: types.RESET_SPRING_REVIEW_ADD
});

/**
 * 春运活动分享列表Action
 */

export const requestSpringShareList = () => ({
    type: types.REQUEST_SPRING_SHARE_LIST
});

export const receiveSpringShareList = (json) => ({
    type: types.RECEIVE_SPRING_SHARE_LIST,
    posts: json
});

/**
 * 春运活动助力列表Action
 */

export const requestSpringShareAdd = () => ({
    type: types.REQUEST_SPRING_SHARE_ADD
});

export const receiveSpringShareAdd = (json) => ({
    type: types.RECEIVE_SPRING_SHARE_ADD,
    posts: json
});