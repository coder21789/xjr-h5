/**
 *
 * 大事件新闻数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_EVENT, 
    RECEIVE_NEWS_EVENT, 
    REQUEST_NEWS_EVENT_DETAILS, 
    RECEIVE_NEWS_EVENT_DETAILS
} from '../actions/types';

export function postNewsEvent(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_EVENT:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_EVENT:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};

export function postNewsEventDetails(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_EVENT_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_EVENT_DETAILS:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};