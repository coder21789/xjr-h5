/**
 *
 * 专家新闻数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_EXPERT, 
    RECEIVE_NEWS_EXPERT, 
    REQUEST_NEWS_EXPERT_DETAILS, 
    RECEIVE_NEWS_EXPERT_DETAILS,
    RECEIVE_NEWS_EXPERT_DETAILS_LOADMORE
} from '../actions/types';

export function postNewsExpert(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_EXPERT:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_EXPERT:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};

export function postNewsExpertDetails(state = {
    isFetching: false,
    items: [],
    playload: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_EXPERT_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_EXPERT_DETAILS:
            return {...state, isFetching: false, items: action.posts, page: action.page, pageInfo: action.pageInfo};
        case RECEIVE_NEWS_EXPERT_DETAILS_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};    
        default:
            return state;
    }
};