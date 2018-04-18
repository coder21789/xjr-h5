/**
 *
 * 评论数据状态变更处理
 *
 */

import {
    REQUEST_REVIEW_LIST, 
    RECEIVE_REVIEW_LIST, 
    REQUEST_REVIEW_DETAILS, 
    RECEIVE_REVIEW_DETAILS
} from '../actions/types';

export function postReviewList(state = {
    isFetching: false,
    items: [],
    isAll: 0
}, action) {
    switch (action.type) {
        case REQUEST_REVIEW_LIST:
            return {...state, isFetching: true};
        case RECEIVE_REVIEW_LIST:
            return {...state, isFetching: false, items: action.posts, isAll: action.isAll};
        default:
            return state;
    }
};

export function postReviewDetails(state = {
    isFetching: false,
    items: [],
    isAll: 0
}, action) {
    switch (action.type) {
        case REQUEST_REVIEW_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_REVIEW_DETAILS:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};