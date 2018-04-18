/**
 *
 * 行情数据状态变更处理
 *
 */

import {REQUEST_NEWS_RANGE, RECEIVE_NEWS_RANGE} from '../actions/types';

export function postNewsRange(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_RANGE:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_RANGE:
            return {...state, isFetching: false, items: action.payload};
        default:
            return state;
    }
};