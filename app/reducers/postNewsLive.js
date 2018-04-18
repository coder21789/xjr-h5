/**
 *
 * 24小时新闻数据状态变更处理
 *
 */

import {REQUEST_NEWS_LIVE, RECEIVE_NEWS_LIVE} from '../actions/types';

export function postNewsLive(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_LIVE:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_LIVE:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};