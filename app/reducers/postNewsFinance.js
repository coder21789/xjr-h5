/**
 *
 * 大画财经新闻数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_FINANCE, 
    RECEIVE_NEWS_FINANCE,
    RECEIVE_NEWS_FINANCE_LOADMORE,
    REQUEST_NEWS_FINANCE_DETAILS,
    RECEIVE_NEWS_FINANCE_DETAILS
} from '../actions/types';

export function postNewsFinance(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_FINANCE:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_FINANCE:
            return {...state, isFetching: false, items: action.posts, page: action.page, pageInfo: action.pageInfo, playload:[]};
        case RECEIVE_NEWS_FINANCE_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};
        default:
            return state;
    }
};

export function postNewsFinanceDetails(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_FINANCE_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_FINANCE_DETAILS:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};