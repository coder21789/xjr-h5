/**
 *
 * 新闻详情数据状态变更处理
 *
 */

import {REQUEST_NEWS_DETAILS, RECEIVE_NEWS_DETAILS} from '../actions/types';

export function postNews(state = {
    isFetching: false,
    isLoaded: false,
    content: [],
    about: [],
    comment: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_DETAILS:
            return {...state, isFetching: false,
                content: action.content,
                about: action.about,
                comment: action.comment};
        default:
            return state;
    }
};