/**
 *
 * 数据接口配置
 *
 */

/* eslint-disable */
const __XRJ_APP = __SERVER__
    ? (__PRODUCT__ ? 'http://127.0.0.1' : 'http://172.16.60.160')
    : ``;
const __NODE = __SERVER__
    ? `http://127.0.0.1:3000`
    : ``;
const URL = {
    postNewsRecommend: `${__XRJ_APP}/news-api/wap/m/newsService2`,
    postNewsLive: `${__XRJ_APP}/news-api/newsLive/getNewsLiveList`,
    postNewsDetails: `${__XRJ_APP}/news-api/wap/news/getNewsInformationById`,
    postNewsDetailsAbout: `${__XRJ_APP}/news-api/m/newsDetailService`,
    postNewsDetailsComment: `${__XRJ_APP}/news-api/newsReview/getNewsReviewList`,
    postNewsRange: {
        gp: `${__XRJ_APP}/news-api/wap/front/getStockData`,
        wh: `${__XRJ_APP}/news-api/wap/front/getForexData`,
        jj: `${__XRJ_APP}/news-api/wap/front/getFundData`,
        qh: `${__XRJ_APP}/news-api/wap/front/getFuturesData`,
        zq: `${__XRJ_APP}/news-api/wap/front/getBondData`
    },
    postNewsAtlasDetails: `${__XRJ_APP}/news-api/m/picSetService`,
    postReviewList: `${__XRJ_APP}/news-api/m/newsReview/list`,
    postReviewDetails: `${__XRJ_APP}/news-api/m/newsReview/detail`,
    postLikeReview: `${__XRJ_APP}/news-api/m/like/review`,
    postLikeReply: `${__XRJ_APP}/news-api/m/like/reply`,
    postNewsReview: `${__XRJ_APP}/news-api/m/newsReview/addReview`,
    postAnswerReview: `${__XRJ_APP}/news-api/m/callback/newsReview`,
    postAnswerReply: `${__XRJ_APP}/news-api/m/callback/reply`,
    postWordList: `${__XRJ_APP}/news-api/wap/m/wordService`,
    postTingAudioPlayer: `${__XRJ_APP}/ting-api/m/audioDetail/`,
    postTingAuthor: `${__XRJ_APP}/ting-api/m/anchor/`,
    postAdCooperate: `${__XRJ_APP}/news-api/wap/company/register`,
    postUser: `${__XRJ_APP}/news-api/m/loginService`,
    postSpringReviewList: `${__XRJ_APP}/news-api/wap/newsReview/list`,
    postSpringReviewAdd: `${__XRJ_APP}/news-api/wap/newsReview/add`,
    postSpringShareList: `${__XRJ_APP}/news-api/wap/activity/chunyun/helpInfo`,
    postSpringShareAdd: `${__XRJ_APP}/news-api/wap/user/addHelp`,
    postWapNewsEvent: `${__NODE}/wap-news-api/event/list`,
    postWapNewsEventDetails: `${__NODE}/wap-news-api/event/details`,
    postWapNewsRecommend: `${__NODE}/wap-news-api/news/recommend`,
    postWapNewsChannel: `${__NODE}/wap-news-api/news/channel`,
    postWapNewsAtlas: `${__NODE}/wap-news-api/atlas/list`,
    postWapNewsTopic: `${__NODE}/wap-news-api/topic/list`,
    postWapNewsTopicDetails: `${__NODE}/wap-news-api/topic/details`,
    postWapNewsExpert: `${__NODE}/wap-news-api/expert/list`,
    postWapNewsExpertDetails: `${__NODE}/wap-news-api/expert/details`,
    postWapNewsFinance: `${__NODE}/wap-news-api/finance/list`,
    postWapNewsFinanceDetails: `${__NODE}/wap-news-api/finance/details`,
    postWapWechat: `${__NODE}/wap-news-api/user`,
    postWapImageUpload: `${__NODE}/wap-news-api/upload`,
    postWapWechatSignature: `${__NODE}/wap-news-api/signature`
};

export default {
    URL
};