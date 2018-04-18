/**
 *
 * 话题新闻数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_TOPIC, 
    RECEIVE_NEWS_TOPIC,
    RECEIVE_NEWS_TOPIC_LOADMORE, 
    REQUEST_NEWS_TOPIC_DETAILS, 
    RECEIVE_NEWS_TOPIC_DETAILS
} from '../actions/types';

export function postNewsTopic(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_TOPIC:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_TOPIC:
            return {...state, isFetching: false, items: action.posts, page: action.page, pageInfo: action.pageInfo};
        case RECEIVE_NEWS_TOPIC_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};
        default:
            return state;
    }
};

export function postNewsTopicDetails(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_TOPIC_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_TOPIC_DETAILS:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};