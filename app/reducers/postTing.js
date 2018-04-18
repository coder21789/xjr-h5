/**
 *
 * 音频数据状态变更处理
 *
 */

import {
    REQUEST_TINY_AUTHOR,
    RECEIVE_TINY_AUTHOR,
    REQUEST_TINY_AUDIO,
    RECEIVE_TINY_AUDIO,
    REQUEST_AD_COOPERATE,
    RECEIVE_AD_COOPERATE,
    RESET_AD_COOPERATE
} from '../actions/types';

export function postTingAuthor(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_TINY_AUTHOR:
            return {...state, isFetching: true};
        case RECEIVE_TINY_AUTHOR:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};

export function postTingAudio(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_TINY_AUDIO:
            return {...state, isFetching: true};
        case RECEIVE_TINY_AUDIO:
            return {...state, isFetching: false, items: action.posts};
        default:
            return state;
    }
};

export function postAdCooperate(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_AD_COOPERATE:
            return {...state, isFetching: true};
        case RECEIVE_AD_COOPERATE:
            return {...state, isFetching: false, items: action.posts};
        case RESET_AD_COOPERATE:
            return {isFetching: false, items: []};
        default:
            return state;
    }
};