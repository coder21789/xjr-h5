/**
 *
 * Action常量列表
 * Action常量列表后续无需拆分以防止常量覆盖
 *
 */

/**
 * 一级栏目推荐新闻Action常量
 * @type {string}
 */

export const REQUEST_NEWS_RECOMMEND = 'REQUEST_NEWS_RECOMMEND';
export const RECEIVE_NEWS_RECOMMEND = 'RECEIVE_NEWS_RECOMMEND';
export const RECEIVE_NEWS_RECOMMEND_LOADMORE = 'RECEIVE_NEWS_RECOMMEND_LOADMORE';

/**
 * 二级栏目推荐新闻Action常量
 * @type {string}
 */

export const REQUEST_NEWS_RECOMMEND_QQ = 'REQUEST_NEWS_RECOMMEND_QQ';
export const RECEIVE_NEWS_RECOMMEND_QQ = 'RECEIVE_NEWS_RECOMMEND_QQ';
export const RECEIVE_NEWS_RECOMMEND_QQ_LOADMORE = 'RECEIVE_NEWS_RECOMMEND_QQ_LOADMORE';

/**
 * 24小时新闻Action常量
 * @type {string}
 */

export const REQUEST_NEWS_LIVE = 'REQUEST_NEWS_LIVE';
export const RECEIVE_NEWS_LIVE = 'RECEIVE_NEWS_LIVE';

/**
 * 专家列表Action常量
 * @type {string}
 */

export const REQUEST_NEWS_EXPERT = 'REQUEST_NEWS_EXPERT';
export const RECEIVE_NEWS_EXPERT = 'RECEIVE_NEWS_EXPERT';

/**
 * 专家详情Action常量
 * @type {string}
 */

export const REQUEST_NEWS_EXPERT_DETAILS = 'REQUEST_NEWS_EXPERT_DETAILS';
export const RECEIVE_NEWS_EXPERT_DETAILS = 'RECEIVE_NEWS_EXPERT_DETAILS';
export const RECEIVE_NEWS_EXPERT_DETAILS_LOADMORE = 'RECEIVE_NEWS_EXPERT_DETAILS_LOADMORE';

/**
 * 话题列表Action常量
 * @type {string}
 */

export const REQUEST_NEWS_TOPIC = 'REQUEST_NEWS_TOPIC';
export const RECEIVE_NEWS_TOPIC = 'RECEIVE_NEWS_TOPIC';
export const RECEIVE_NEWS_TOPIC_LOADMORE = 'RECEIVE_NEWS_TOPIC_LOADMORE';

/**
 * 话题详情Action常量
 * @type {string}
 */

export const REQUEST_NEWS_TOPIC_DETAILS = 'REQUEST_NEWS_TOPIC_DETAILS';
export const RECEIVE_NEWS_TOPIC_DETAILS = 'RECEIVE_NEWS_TOPIC_DETAILS';

/**
 * 文章详情Action常量
 * @type {string}
 */

export const REQUEST_NEWS_DETAILS = 'REQUEST_NEWS_DETAILS';
export const RECEIVE_NEWS_DETAILS = 'RECEIVE_NEWS_DETAILS';

/**
 * 行情数据Action常量
 * @type {string}
 */

export const REQUEST_NEWS_RANGE = 'REQUEST_NEWS_RANGE';
export const RECEIVE_NEWS_RANGE = 'RECEIVE_NEWS_RANGE';

/**
 * 小频道栏目推荐新闻Action常量
 * @type {string}
 */

export const REQUEST_NEWS_RECOMMEND_CHANNEL = 'REQUEST_NEWS_RECOMMEND_CHANNEL';
export const RECEIVE_NEWS_RECOMMEND_CHANNEL = 'RECEIVE_NEWS_RECOMMEND_CHANNEL';

/**
 * 图集列表荐新闻Action常量
 * @type {string}
 */

export const REQUEST_NEWS_ATLAS = 'REQUEST_NEWS_ATLAS';
export const RECEIVE_NEWS_ATLAS = 'RECEIVE_NEWS_ATLAS';
export const RECEIVE_NEWS_ATLAS_LOADMORE = 'RECEIVE_NEWS_ATLAS_LOADMORE';

/**
 * 图集详情荐新闻Action常量
 * @type {string}
 */

export const REQUEST_NEWS_ATLAS_DETAILS = 'REQUEST_NEWS_ATLAS_DETAILS';
export const RECEIVE_NEWS_ATLAS_DETAILS = 'RECEIVE_NEWS_ATLAS_DETAILS';

/**
 * 评论列表Action常量
 * @type {string}
 */

export const REQUEST_REVIEW_LIST = 'REQUEST_REVIEW_LIST';
export const RECEIVE_REVIEW_LIST = 'RECEIVE_REVIEW_LIST';

/**
 * 评论详情Action常量
 * @type {string}
 */

export const REQUEST_REVIEW_DETAILS = 'REQUEST_REVIEW_DETAILS';
export const RECEIVE_REVIEW_DETAILS = 'RECEIVE_REVIEW_DETAILS';

/**
 * 评论点赞Action常量
 * @type {string}
 */

export const REQUEST_REVIEW_LIKE = 'REQUEST_REVIEW_LIKE';
export const RECEIVE_REVIEW_LIKE = 'RECEIVE_REVIEW_LIKE';

/**
 * 回复点赞Action常量
 * @type {string}
 */

export const REQUEST_REPLY_LIKE = 'REQUEST_REPLY_LIKE';
export const RECEIVE_REPLY_LIKE = 'RECEIVE_REPLY_LIKE';

/**
 * 新闻评论Action常量
 * @type {string}
 */

export const REQUEST_NEWS_REVIEW= 'REQUEST_NEWS_REVIEW';
export const RECEIVE_NEWS_REVIEW = 'RECEIVE_NEWS_REVIEW';

/**
 * 回复评论Action常量
 * @type {string}
 */

export const REQUEST_ANSWER_REVIEW = 'REQUEST_ANSWER_REVIEW';
export const RECEIVE_ANSWER_REVIEW = 'RECEIVE_ANSWER_REVIEW';

/**
 * 回复回复Action常量
 * @type {string}
 */

export const REQUEST_ANSWER_REPLY = 'REQUEST_ANSWER_REPLY';
export const RECEIVE_ANSWER_REPLY = 'RECEIVE_ANSWER_REPLY';

/**
 * 后台请求进度Action常量
 * @type {string}
 */

export const NODE_LOAD = 'NODE_LOAD';
export const NODE_UNLOAD = 'NODE_UNLOAD';

/**
 * 下载条Action常量
 * @type {string}
 */

export const APP_DOWNLOAD = 'APP_DOWNLOAD';

/**
 * Window Object Action常量
 * @type {string}
 */

export const WINDOW_OBJECT = 'WINDOW_OBJECT';

/**
 * 大事件列表Action常量
 * @type {string}
 */

export const REQUEST_NEWS_EVENT = 'REQUEST_NEWS_EVENT';
export const RECEIVE_NEWS_EVENT = 'RECEIVE_NEWS_EVENT';

/**
 * 大事件详情Action常量
 * @type {string}
 */

export const REQUEST_NEWS_EVENT_DETAILS = 'REQUEST_NEWS_EVENT_DETAILS';
export const RECEIVE_NEWS_EVENT_DETAILS = 'RECEIVE_NEWS_EVENT_DETAILS';

/**
 * 关键词列表Action常量
 * @type {string}
 */

export const REQUEST_NEWS_WORD = 'REQUEST_NEWS_WORD';
export const RECEIVE_NEWS_WORD = 'RECEIVE_NEWS_WORD';

/**
 * 主播音频列表Action常量
 * @type {string}
 */

export const REQUEST_TINY_AUTHOR = 'REQUEST_TINY_AUTHOR';
export const RECEIVE_TINY_AUTHOR = 'RECEIVE_TINY_AUTHOR';

/**
 * 音频播放列表Action常量
 * @type {string}
 */

export const REQUEST_TINY_AUDIO = 'REQUEST_TINY_AUDIO';
export const RECEIVE_TINY_AUDIO = 'RECEIVE_TINY_AUDIO';

/**
 * 广告合作Action常量
 * @type {string}
 */

export const REQUEST_AD_COOPERATE = 'REQUEST_AD_COOPERATE';
export const RECEIVE_AD_COOPERATE = 'RECEIVE_AD_COOPERATE';
export const RESET_AD_COOPERATE = 'RESET_AD_COOPERATE';

/**
 * 大画财经列表Action常量
 * @type {string}
 */

export const REQUEST_NEWS_FINANCE = 'REQUEST_NEWS_FINANCE';
export const RECEIVE_NEWS_FINANCE = 'RECEIVE_NEWS_FINANCE';
export const RECEIVE_NEWS_FINANCE_LOADMORE = 'RECEIVE_NEWS_FINANCE_LOADMORE';

/**
 * 大画财经详情Action常量
 * @type {string}
 */

export const REQUEST_NEWS_FINANCE_DETAILS = 'REQUEST_NEWS_FINANCE_DETAILS';
export const RECEIVE_NEWS_FINANCE_DETAILS = 'RECEIVE_NEWS_FINANCE_DETAILS';
export const RECEIVE_NEWS_FINANCE_DETAILS_LOADMORE = 'RECEIVE_NEWS_FINANCE_DETAILS_LOADMORE';

/**
 * 微信用户信息Action常量
 * @type {string}
 */

export const REQUEST_WECHAT_INFO = 'REQUEST_WECHAT_INFO';
export const RECEIVE_WECHAT_INFO = 'RECEIVE_WECHAT_INFO';
export const INSERT_WECHAT_INFO = 'INSERT_WECHAT_INFO';

/**
 * 春运活动评论列表Action常量
 * @type {string}
 */

export const REQUEST_SPRING_REVIEW_LIST = 'REQUEST_SPRING_REVIEW_LIST';
export const RECEIVE_SPRING_REVIEW_LIST = 'RECEIVE_SPRING_REVIEW_LIST';
export const RECEIVE_SPRING_REVIEW_LIST_LOADMORE = 'RECEIVE_SPRING_REVIEW_LIST_LOADMORE';

/**
 * 春运活动评论图片上传列表Action常量
 * @type {string}
 */

export const REQUEST_SPRING_REVIEW_IMAGE_UPLOAD = 'REQUEST_SPRING_REVIEW_IMAGE_UPLOAD';
export const RECEIVE_SPRING_REVIEW_IMAGE_UPLOAD = 'RECEIVE_SPRING_REVIEW_IMAGE_UPLOAD';

/**
 * 春运活动评论列表Action常量
 * @type {string}
 */

export const REQUEST_SPRING_REVIEW_ADD = 'REQUEST_SPRING_REVIEW_ADD';
export const RECEIVE_SPRING_REVIEW_ADD = 'RECEIVE_SPRING_REVIEW_ADD';
export const RESET_SPRING_REVIEW_ADD = 'RESET_SPRING_REVIEW_ADD';

/**
 * 春运活动分享列表Action常量
 * @type {string}
 */

export const REQUEST_SPRING_SHARE_LIST = 'REQUEST_SPRING_SHARE_LIST';
export const RECEIVE_SPRING_SHARE_LIST = 'RECEIVE_SPRING_SHARE_LIST';

/**
 * 春运活动分享助力Action常量
 * @type {string}
 */

export const REQUEST_SPRING_SHARE_ADD = 'REQUEST_SPRING_SHARE_ADD';
export const RECEIVE_SPRING_SHARE_ADD = 'RECEIVE_SPRING_SHARE_ADD';