/**
 *
 * 前台动态路由配置表
 * 重定向配置
 * 默认页面配置
 *
 * 以下路由配置纯属运营需求
 *
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../containers/App';

/* eslint-disable */
const router = <Route path='/' component={App}>
    <IndexRoute
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'index');
        }}
    />
    <Route
        path='cj'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'cj');
        }}
    />
    <Route
        path='qq'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'qq');
        }}
    />
    <Route
        path='gp'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'gp');
        }}
    />
    <Route
        path='wh'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'wh');
        }}
    />
    <Route
        path='jj'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'jj');
        }}
    />
    <Route
        path='qh'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'qh');
        }}
    />
    <Route
        path='lc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/News').default);
            }, 'lc');
        }}
    />
    <Route
        path='hezuodengji.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Ad').default);
            }, 'ad');
        }}
    />
    <Route
        path='chunyun/1000'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Spring').default);
            }, 'spring');
        }}
    />
    <Route
        path='chunyun/1000/*'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/SpringShare').default);
            }, 'springShare');
        }}
    />
    <Route
        path='qq/ytsc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/NewsArea').default);
            }, 'newsAreaYt');
        }}
    />
    <Route
        path='qq/mgsc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/NewsArea').default);
            }, 'newsAreaMg');
        }}
    />
    <Route
        path='qq/ygsc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/NewsArea').default);
            }, 'newsAreaYg');
        }}
    />
    <Route
        path='qq/ozsc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/NewsArea').default);
            }, 'newsAreaOz');
        }}
    />
    <Route
        path='qq/mzsc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/NewsArea').default);
            }, 'newsAreaMz');
        }}
    />
    <Route
        path='qq/qtsc'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/NewsArea').default);
            }, 'newsAreaFz');
        }}
    />
    <Route
        path='zb(/:catId)'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Live').default);
            }, 'live');
        }}
    />
    <Route
        path='ht'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Topic').default);
            }, 'topic');
        }}
    />
    <Route
        path='ht/:collection'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Topic').default);
            }, 'topicList');
        }}
    />
    <Route
        path='tj'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Atlas').default);
            }, 'atlas');
        }}
    />
    <Route
        path='tj/:atlas'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/AtlasDetails').default);
            }, 'atlasDetails');
        }}
    />
    <Route
        path='cj/dashijian.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Event').default);
            }, 'event');
        }}
    />
    <Route
        path='cj/dashijian/*-d-*.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/EventDetails').default);
            }, 'eventDetails');
        }}
    />
    <Route
        path='dhcj'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Finance').default);
            }, 'finance');
        }}
    />
    <Route
        path='dhcj/*-d-*.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/FinanceDetails').default);
            }, 'financeDetails');
        }}
    />
    <Route
        path='word/*.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Word').default);
            }, 'word');
        }}
    />
    <Route
        path='review/list/:reviewId'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Comment').default);
            }, 'comment');
        }}
    />
    <Route
        path='review/detail/:replyId'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/CommentDetails').default);
            }, 'commentDetails');
        }}
    />
    <Route
        path='audio/:audio'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/TingAudio').default);
            }, 'tingAudio');
        }}
    />
    <Route
        path='author/:author'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/TingAuthor').default);
            }, 'tingAuthor');
        }}
    />
    <Route
        path='hq/gp'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Market').default);
            }, 'marketGp');
        }}
    />
    <Route
        path='hq/wh'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Market').default);
            }, 'marketWh');
        }}
    />
    <Route
        path='hq/jj'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Market').default);
            }, 'marketJj');
        }}
    />
    <Route
        path='hq/qh'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Market').default);
            }, 'marketQh');
        }}
    />
    <Route
        path='hq/zq'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Market').default);
            }, 'marketZq');
        }}
    />
    <Route
        path='*/*-d-*.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Details').default);
            }, 'details');
        }}
    />
    <Route
        path='zj'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Expert').default);
            }, 'expert');
        }}
    />
    <Route
        path='zj/*/guandian.html'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../containers/Expert').default);
            }, 'expertList');
        }}
    />
    <Route path='*/*.html'
           getComponent={(location, callback) => {
               require.ensure([], function(require) {
                   callback(null, require('../containers/NewsChannel').default);
               }, 'newsChannel');
           }}
    />
    <Route
        path='*'
        getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('../components/common/Splash').default);
            }, 'splash');
        }}
    />
</Route>;

export default router;