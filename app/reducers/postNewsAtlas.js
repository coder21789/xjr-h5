/**
 *
 * 推荐新闻数据状态变更处理
 *
 */

import {
    REQUEST_NEWS_ATLAS,
    RECEIVE_NEWS_ATLAS,
    RECEIVE_NEWS_ATLAS_LOADMORE,
    REQUEST_NEWS_ATLAS_DETAILS,
    RECEIVE_NEWS_ATLAS_DETAILS
} from '../actions/types';

export function postNewsAtlas(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_ATLAS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_ATLAS:
            return {...state, isFetching: false, items: action.posts, page: action.page, pageInfo: action.pageInfo};
        case RECEIVE_NEWS_ATLAS_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};
        default:
            return state;
    }
};

export function postNewsAtlasDetails(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_NEWS_ATLAS_DETAILS:
            return {...state, isFetching: true};
        case RECEIVE_NEWS_ATLAS_DETAILS:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};