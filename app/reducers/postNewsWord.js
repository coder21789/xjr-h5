/**
 *
 * 关键词数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_WORD, 
    RECEIVE_NEWS_WORD
} from '../actions/types';

export function postNewsWord(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_WORD:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_WORD:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};