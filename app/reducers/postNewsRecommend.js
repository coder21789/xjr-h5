/**
 *
 * 推荐新闻数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_RECOMMEND, 
    RECEIVE_NEWS_RECOMMEND, 
    RECEIVE_NEWS_RECOMMEND_LOADMORE,
    REQUEST_NEWS_RECOMMEND_QQ, 
    RECEIVE_NEWS_RECOMMEND_QQ, 
    RECEIVE_NEWS_RECOMMEND_QQ_LOADMORE,
    REQUEST_NEWS_RECOMMEND_CHANNEL, 
    RECEIVE_NEWS_RECOMMEND_CHANNEL
} from '../actions/types';

export function postNewsRecommend(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_RECOMMEND:
            return {...state, isFetching: true, page: action.page};
        case RECEIVE_NEWS_RECOMMEND:
            return {...state, isFetching: false, items: action.posts, page: action.page, pageInfo: action.pageInfo};
        case RECEIVE_NEWS_RECOMMEND_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};
        default:
            return state;
    }
};

export function postNewsRecommendQq(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_RECOMMEND_QQ:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_RECOMMEND_QQ:
            return {...state, isFetching: false, items: action.posts, page: action.page, pageInfo: action.pageInfo};
        case RECEIVE_NEWS_RECOMMEND_QQ_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};    
        default:
            return state;
    }
};

export function postNewsRecommendChannel(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_RECOMMEND_CHANNEL:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_RECOMMEND_CHANNEL:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};