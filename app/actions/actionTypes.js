/**
 *
 * 异步Action常量
 * 异步逻辑封装
 * @todo 异步action逻辑拆分
 *
 */

import * as actions from './actionCreator';
import {HttpFetch} from '../lib/fetch';
import INTERFACE from '../config/interface';
import fetch from 'isomorphic-fetch';

/**
 * 通用逻辑
 * 判断__SERVER__是否node环境以dispatch不同node-action防止重复请求接口二次渲染
 * 判断arguments参数pageStart大于1则dispatch-loadmore实现分页逻辑
 */

/**
 * 一级栏目推荐新闻异步Action
 * @param code
 * @param pagePerNum
 * @param pageStart
 * @param playload
 * @param ratio
 * @returns {function(*)}
 */

export function fetchNewsRecommend(code, pagePerNum, pageStart, playload, ratio) {
    let newsCode = code || 'index';
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsRecommend, `catCode=${newsCode}&pagePerNum=${pagePerNum}&pageStart=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsRecommend(newsCode, pageStart));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        let reply = pageStart < 2 ? dispatch(actions.receiveNewsRecommend(newsCode, json, pageStart)) :
             dispatch(actions.receiveNewsRecommendLoadMore(newsCode, json, pageStart, playload, ratio));
        return reply;
    };
};

/**
 * 二级栏目推荐新闻异步Action
 * @param code
 * @returns {function(*)}
 */

export function fetchNewsRecommendQq(code, pagePerNum, pageStart, playload, ratio) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsChannel, `catCode=${code}&pagePerNum=${pagePerNum}&pageStart=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsRecommendQq(code, pageStart));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        let reply = pageStart < 2 ? dispatch(actions.receiveNewsRecommendQq(code, json, pageStart)) :
             dispatch(actions.receiveNewsRecommendQqLoadMore(code, json, pageStart, playload, ratio));
        return reply;
    };
};

/**
 * 24小时新闻异步Action
 * @param code
 * @param date
 * @returns {function(*)}
 */

export function fetchNewsLive(code, date) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsLive, `catId=${code}&date=${date}`);
    let InterfaceInit = FetchInit.fetch();
    return dispatch => {
        dispatch(actions.requestNewsLive(code, date));
        return fetch(InterfaceInit.myRequest, InterfaceInit.myInit)
            .then(response => response.json())
            .then(json => dispatch(actions.receiveNewsLive(code, date, json)));
    };
};

/**
 * 专家列表异步Action
 * @returns {function(*)}
 */

export function fetchNewsExpert() {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsExpert, `catCode=zj`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsExpert());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsExpert(json));
    };
};

/**
 * 专家详情异步Action
 * @param username
 * @returns {function(*)}
 */

export function fetchNewsExpertAuthor(username, pagePerNum, pageStart, playload, ratio) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsExpertDetails, `userId=${username}&pagePerNum=${pagePerNum}&pageStart=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsExpertDetails(username));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        let reply = pageStart < 2 ? dispatch(actions.receiveNewsExpertDetails(json, pageStart)) :
             dispatch(actions.receiveNewsExpertDetailsLoadMore(username, json, pageStart, playload, ratio));
        return reply;
    };
};

/**
 * 话题列表异步Action
 * @param pagePerNum
 * @param pageStart
 * @param playload
 * @param ratio
 * @returns {function(*)}
 */

export function fetchNewsTopic(pagePerNum, pageStart, playload, ratio) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsTopic, `catCode=ht&pagePerNum=${pagePerNum}&pageStart=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsTopic());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        let reply = pageStart < 2 ? dispatch(actions.receiveNewsTopic(json, pageStart)) :
             dispatch(actions.receiveNewsTopicLoadMore(json, pageStart, playload, ratio));
        return reply;
    };
};

/**
 * 话题详情异步Action
 * @param id
 * @returns {function(*)}
 */

export function fetchNewsTopicDetails(id) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsTopicDetails, `newsId=${id}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsTopicDetails());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsTopicDetails(json));
    };
};

/**
 * 文章详情异步Action
 * @param newsId
 * @returns {function(*)}
 */

export function fetchNewsContent(newsId, platform) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsDetails, `newsId=${newsId}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsDetails(newsId));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        const array = platform ? [] : await fetchNewsAbout(newsId);
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsDetails(json, array));
    };
};

function fetchNewsAbout(newsId) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsDetailsAbout, `clientVer=1.2.0&newsId=${newsId}`);
    let InterfaceInit = FetchInit.fetch();
    return fetch(InterfaceInit.myRequest, InterfaceInit.myInit)
        .then(response => response.json());
};

/**
 * 行情数据异步Action
 * @param catCode
 * @param payload
 * @returns {function(*)}
 */

export function fetchNewsRange(catCode, payload) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsRange[catCode], `clientVer=1.2.0`);
    let InterfaceInit = FetchInit.fetch();
    return dispatch => {
        dispatch(actions.requestNewsRange(catCode));
        return fetch(InterfaceInit.myRequest, InterfaceInit.myInit)
            .then(response => response.json())
            .then(data => dispatch(actions.receiveNewsRange(payload, catCode, data)));
    };
};

/**
 * 小频道栏目推荐新闻异步Action
 * @param code
 * @returns {function(*)}
 */

export function fetchNewsRecommendChannel(code) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsRecommend, `catCode=${code}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsRecommendChannel(code));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveNewsRecommendChannel(code, json));
    };
};

/**
 * 图集新闻异步Action
 * @param pagePerNum
 * @param pageStart
 * @param playload
 * @param ratio
 * @returns {function(*)}
 */

export function fetchNewsAtlas(pagePerNum, pageStart, playload, ratio) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsAtlas, `catCode=tj&pagePerNum=${pagePerNum}&pageStart=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsAtlas());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        let reply = pageStart < 2 ? dispatch(actions.receiveNewsAtlas(json, pageStart)) :
             dispatch(actions.receiveNewsAtlasLoadMore(json, pageStart, playload, ratio));
        return reply;
    };
};

/**
 * 图集详情异步Action
 * @param newsId
 * @returns {function(*)}
 */

export function fetchNewsAtlasDetails(newsId) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsAtlasDetails, `method=picsAndPicSet&newsId=${newsId}`, '', {'api-version': '1.7.0'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsAtlasDetails(newsId));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveNewsAtlasDetails(json));
    };
};

/**
 * 评论列表异步Action
 * @param newsId
 * @param isAll
 * @returns {function(*)}
 */

export function fetchReviewList(newsId, isAll) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postReviewList, `newsId=${newsId}&isAll=${isAll}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestReviewList(newsId, isAll));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveReviewList(json, isAll));
    };
};

/**
 * 评论详情异步Action
 * @param reviewId
 * @param newsId
 * @returns {function(*)}
 */

export function fetchReviewDetails(reviewId, newsId) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postReviewDetails, `reviewId=${reviewId}&newsId=${newsId}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestReviewDetails(reviewId, newsId));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveReviewDetails(json));
    };
};

/**
 * 评论点赞异步Action
 * @param reviewId
 * @returns {function(*)}
 */

export function fetchReviewLike(reviewId) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postLikeReview, `reviewId=${reviewId}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestReviewLike(reviewId));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveReviewLike(reviewId, json));
    };
};

/**
 * 回复点赞异步Action
 * @param reviewId
 * @param newsId
 * @returns {function(*)}
 */

export function fetchReplyLike(reviewId, newsId) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postLikeReply, `replyId=${reviewId}&newsId=${newsId}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestReplyLike(reviewId, newsId));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveReplyLike(reviewId, newsId, json));
    };
};

/**
 * 新闻评论异步Action
 * @param newsId
 * @param content
 * @returns {function(*)}
 */

export function fetchNewsReview(newsId, content) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postNewsReview, `newsId=${newsId}&content=${content}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsReview(newsId, content));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveNewsReview(newsId, json));
    };
};

/**
 * 回复评论异步Action
 * @param reviewId
 * @param content
 * @returns {function(*)}
 */

export function fetchAnswerReview(reviewId, content) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postAnswerReview, `reviewId=${reviewId}&content=${content}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestAnswerReview(reviewId, content));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveAnswerReview(reviewId, json));
    };
};

/**
 * 回复回复异步Action
 * @param replyId
 * @param content
 * @returns {function(*)}
 */

export function fetchAnswerReply(replyId, content) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postAnswerReply, `replyId=${replyId}&content=${content}`, '', {'api-version': '1.7.3'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestAnswerReply(replyId, content));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.receiveAnswerReply(replyId, json));
    };
};

/**
 * 大事件列表异步Action
 * @returns {function(*)}
 */

export function fetchNewsEvent() {
    let code = 'dashijian';
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsEvent, `code=${code}`, '', '');
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsEvent(code));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsEvent(code, json));
    };
};

/**
 * 大事件详情异步Action
 * @param id
 * @returns {function(*)}
 */

export function fetchNewsEventDetails(id) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsEventDetails, `id=${id}`, '', '');
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsEventDetails(id));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsEventDetails(id, json));
    };
};

/**
 * 关键词列表异步Action
 * @param id
 * @returns {function(*)}
 */

export function fetchNewsWordList(id) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWordList, `method=newsList&kId=${id}`, '', '');
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsWordList(id));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsWordList(id, json));
    };
};

/**
 * 主播音频列表异步Action
 * @param id
 * @returns {function(*)}
 */

export function fetchTingAuthor(id) {
    let FetchInit = new HttpFetch(`${INTERFACE.URL.postTingAuthor}${id}`, `id=${id}`, '', {'ting-api-version': '1.0.0'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestTingAuthor(id));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveTingAuthor(id, json));
    };
};

/**
 * 音频播放列表异步Action
 * @param id
 * @returns {function(*)}
 */

export function fetchTingAudio(id) {
    let FetchInit = new HttpFetch(`${INTERFACE.URL.postTingAudioPlayer}${id}`, `id=${id}`, '', {'ting-api-version': '1.0.0'});
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestTingAudio(id));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveTingAudio(id, json));
    };
};

/**
 * 广告合作异步Action
 * @param params
 * @returns {function(*)}
 */

export function fetchAdCooperate(params, callback) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postAdCooperate, JSON.stringify(params), '', '', 'application/json');
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestAdCooperate(params));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        console.log(json);
        if (json && json.resultCode === 10000) await callback;
        return dispatch(actions.receiveAdCooperate(json));
    };
};

/**
 * 大画财经列表新闻异步Action
 * @param pagePerNum
 * @param pageStart
 * @param playload
 * @param ratio
 * @returns {function(*)}
 */

export function fetchNewsFinance(pagePerNum, pageStart, playload, ratio) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsFinance, `catCode=tj&pagePerNum=${pagePerNum}&pageStart=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsFinance());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        let reply = pageStart < 2 ? dispatch(actions.receiveNewsFinance(json, pageStart)) :
             dispatch(actions.receiveNewsFinanceLoadMore(json, pageStart, playload, ratio));
        return reply;
    };
};

/**
 * 大画财经文章详情异步Action
 * @param newsId
 * @returns {function(*)}
 */

export function fetchNewsFinanceDetails(newsId) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapNewsFinanceDetails, `newsId=${newsId}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestNewsFinanceDetails(newsId));
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        if (__SERVER__) {dispatch(actions.nodeLoad());} else {dispatch(actions.nodeUnLoad());}
        return dispatch(actions.receiveNewsFinanceDetails(json));
    };
};

/**
 * 微信用户信息异步Action
 * @param code
 * @returns {function(*)}
 */

export function fetchWechatInfo(code) {
    return async dispatch => {
        let params = await fetchWapWechatInfo(dispatch, code);
        dispatch(actions.receiveWechatInfo(params));
        let {userinfo} = params.resultBody;
        let data = `thirdInfo=['${userinfo.openid}','${userinfo.headimgurl}','${userinfo.nickname}','2']&method=login`;
        let FetchInit = new HttpFetch(INTERFACE.URL.postUser, data, '', {'api-version': '1.7.1'});
        let InterfaceInit = FetchInit.fetch();
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        return dispatch(actions.insertWechatInfo(json));
    };
};

async function fetchWapWechatInfo(dispatch, code) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapWechat, `code=${code}`);
    let InterfaceInit = FetchInit.fetch();
    dispatch(actions.requestWechatInfo(code));
    return fetch(InterfaceInit.myRequest, InterfaceInit.myInit)
        .then(response => response.json());
};

/**
 * 春运活动评论列表异步Action
 * @param pagePerNum
 * @param pageStart
 * @param playload
 * @param ratio
 * @returns {function(*)}
 */

export function fetchSpringReviewList(pagePerNum, pageStart, playload) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postSpringReviewList, `newsId=1000&pageSize=${pagePerNum}&page=${pageStart}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestSpringReviewList());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        let reply = pageStart < 2 ? dispatch(actions.receiveSpringReviewList(json, pageStart)) :
             dispatch(actions.receiveSpringReviewListLoadMore(json, pageStart, playload));
        return reply;
    };
};

/**
 * 春运活动评论图片上传异步Action
 * @param file
 * @returns {function(*)}
 */

export function fetchSpringReviewImageUpload(file) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postWapImageUpload, file);
    return async dispatch => {
        dispatch(actions.requestSpringReviewImageUpload());
        function callback(json) {
            dispatch(actions.receiveSpringReviewImageUpload(json));
        };
        return FetchInit.XMLHttp(callback);
    };
};

/**
 * 春运活动评论异步Action
 * @param json
 * @returns {function(*)}
 */

export function fetchSpringReviewAdd(data) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postSpringReviewAdd, `newsId=${data.newsId}&content=${data.content}&picture=${data.picture}&userId=${data.userId}&start=${data.start}&end=${data.end}`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestSpringReviewAdd());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        let reply = dispatch(actions.receiveSpringReviewAdd(json));
        return reply;
    };
};

/**
 * 春运活动分享列表异步Action
 * @param data
 * @returns {function(*)}
 */

export function fetchSpringShareList(data) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postSpringShareList, `newsId=${data.newsId}&userId=${data.userId}&type=chunyun`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestSpringShareList());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        let reply = dispatch(actions.receiveSpringShareList(json));
        return reply;
    };
};

/**
 * 春运活动分享助力异步Action
 * @param data
 * @returns {function(*)}
 */

export function fetchSpringShareAdd(data) {
    let FetchInit = new HttpFetch(INTERFACE.URL.postSpringShareAdd, `byHelpUserId=${data.shareId}&helpUserId=${data.userId}&type=chunyun`);
    let InterfaceInit = FetchInit.fetch();
    return async dispatch => {
        dispatch(actions.requestSpringShareAdd());
        const json = await fetch(InterfaceInit.myRequest, InterfaceInit.myInit).then(response => response.json());
        let reply = dispatch(actions.receiveSpringShareAdd(json));
        return reply;
    };
};