/**
 *
 * node请求进度数据状态变更处理
 *
 */

import {
    NODE_LOAD, 
    NODE_UNLOAD, 
    APP_DOWNLOAD,
    WINDOW_OBJECT
} from '../actions/types';

export function postNode(state = {
    isNodeLoad: false
}, action) {
    switch (action.type) {
        case NODE_LOAD:
            return {...state, isNodeLoad: true};
        case NODE_UNLOAD:
            return {...state, isNodeLoad: false};    
        default:
            return state;
    }
};

export function postAppDownLoad(state = {
    isHidden: false
}, action) {
    switch (action.type) {
        case APP_DOWNLOAD:
            return {...state, isHidden: true};
        default:
            return state;
    }
};

export function postWindowObject(state = {
    height: '100%'
}, action) {
    switch (action.type) {
        case WINDOW_OBJECT:
            return {...state, height: action.height, fontSize: action.fontSize};
        default:
            return state;
    }
};