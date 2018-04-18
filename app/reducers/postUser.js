/**
 *
 * 微信用户信息数据状态变更处理
 *
 */

import {
    REQUEST_WECHAT_INFO, 
    RECEIVE_WECHAT_INFO,
    INSERT_WECHAT_INFO,
    REQUEST_SPRING_REVIEW_LIST,
    RECEIVE_SPRING_REVIEW_LIST,
    RECEIVE_SPRING_REVIEW_LIST_LOADMORE,
    REQUEST_SPRING_REVIEW_ADD,
    RECEIVE_SPRING_REVIEW_ADD,
    RESET_SPRING_REVIEW_ADD,
    REQUEST_SPRING_SHARE_LIST,
    RECEIVE_SPRING_SHARE_LIST,
    REQUEST_SPRING_SHARE_ADD,
    RECEIVE_SPRING_SHARE_ADD,
    REQUEST_SPRING_REVIEW_IMAGE_UPLOAD,
    RECEIVE_SPRING_REVIEW_IMAGE_UPLOAD
} from '../actions/types';

//DB微信用户信息
export function postWechat(state = {
    isLogin: false
}, action) {
    switch (action.type) {
        case REQUEST_WECHAT_INFO:
            return {...state, isLogin: false, usercode: action.code};
        case RECEIVE_WECHAT_INFO:
            return {...state, isLogin: true, userinfo: action.posts.resultBody.userinfo};
        case INSERT_WECHAT_INFO:
            return {...state, isLogin: true, userinfoDB: action.posts.resultBody};    
        default:
            return state;
    }
};

/*
 * ====================================
 * 春运活动活动本地DB数据集暂时存放在此
 * ====================================
 */

//DB春运评论列表
export function postSpringReviewList(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_SPRING_REVIEW_LIST:
            return {...state, isFetching: true};
        case RECEIVE_SPRING_REVIEW_LIST:
            return {...state, isFetching: false, items: action.posts.resultBody.list, page: action.page, pageInfo: action.pageInfo};
        case RECEIVE_SPRING_REVIEW_LIST_LOADMORE:
            return {...state, isFetching: false, playload: action.playload, page: action.page, pageInfo: action.pageInfo};
        default:
            return state;
    }
};

//DB图片上传存储
export function postSpringReviewImage(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_SPRING_REVIEW_IMAGE_UPLOAD:
            return {...state, isFetching: true};
        case RECEIVE_SPRING_REVIEW_IMAGE_UPLOAD:
            return {...state, isFetching: false, items: action.posts.resultBody};
        default:
            return state;
    }
};

//DB评论添加
export function postSpringReviewAdd(state = {
    isFetching: false
}, action) {
    switch (action.type) {
        case REQUEST_SPRING_REVIEW_ADD:
            return {...state, isFetching: true};
        case RECEIVE_SPRING_REVIEW_ADD:
            return {...state, isFetching: false, items: action.posts.resultCode};
        case RESET_SPRING_REVIEW_ADD:
            return {...state, isFetching: false, items: 0};
        default:
            return state;
    }
};

//DB春运分享数据
export function postSpringShareList(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_SPRING_SHARE_LIST:
            return {...state, isFetching: true};
        case RECEIVE_SPRING_SHARE_LIST:
            return {...state, isFetching: false, items: action.posts.resultBody};
        default:
            return state;
    }
};

//DB春运助力
export function postSpringShareAdd(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_SPRING_SHARE_ADD:
            return {...state, isFetching: true};
        case RECEIVE_SPRING_SHARE_ADD:
            return {...state, isFetching: false, items: action.posts.resultCode};
        default:
            return state;
    }
};