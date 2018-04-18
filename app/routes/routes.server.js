/**
 *
 * 后台动态路由配置表
 * 重定向配置
 * 默认页面配置
 *
 * 以下路由配置纯属运营需求
 *
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../containers/App';
import News from '../containers/News';
import NewsArea from '../containers/NewsArea';
import Live from '../containers/Live';
import Expert from '../containers/Expert';
import Topic from '../containers/Topic';
import Details from '../containers/Details';
import Market from '../containers/Market';
import NewsChannel from '../containers/NewsChannel';
import Comment from '../containers/Comment';
import CommentDetails from '../containers/CommentDetails';
import Atlas from '../containers/Atlas';
import AtlasDetails from '../containers/AtlasDetails';
import Event from '../containers/Event';
import EventDetails from '../containers/EventDetails';
import Word from '../containers/Word';
import Splash from '../components/common/Splash';
import TingAudio from '../containers/TingAudio';
import TingAuthor from '../containers/TingAuthor';
import Ad from '../containers/Ad';
import Finance from '../containers/Finance';
import FinanceDetails from '../containers/FinanceDetails';
import Spring from '../containers/Spring';
import SpringShare from '../containers/SpringShare';

/* eslint-disable */
const router = <Route path='/' component={App}>
    <IndexRoute component={News} />
    <Route path='cj' component={News} />
    <Route path='qq' component={News} />
    <Route path='gp' component={News} />
    <Route path='wh' component={News} />
    <Route path='jj' component={News} />
    <Route path='qh' component={News} />
    <Route path='lc' component={News} />
    <Route path='hezuodengji.html' component={Ad} />
    <Route path='chunyun/1000' component={Spring} />
    <Route path='chunyun/1000/*' component={SpringShare} />
    <Route path='qq/ytsc' component={NewsArea} />
    <Route path='qq/mgsc' component={NewsArea} />
    <Route path='qq/ygsc' component={NewsArea} />
    <Route path='qq/ozsc' component={NewsArea} />
    <Route path='qq/mzsc' component={NewsArea} />
    <Route path='qq/qtsc' component={NewsArea} />
    <Route path='zb(/:catId)' component={Live} />
    <Route path='ht' component={Topic} />
    <Route path='ht/:collection' component={Topic} />
    <Route path='tj' component={Atlas} />
    <Route path='tj/:atlas' component={AtlasDetails} />
    <Route path='cj/dashijian.html' component={Event} />
    <Route path='cj/dashijian/*-d-*.html' component={EventDetails} />
    <Route path='dhcj' component={Finance} />
    <Route path='dhcj/*-d-*.html' component={FinanceDetails} />
    <Route path='word/*.html' component={Word} />
    <Route path='review/list/:reviewId' component={Comment} />
    <Route path='review/detail/:replyId' component={CommentDetails} />
    <Route path='audio/:audio' component={TingAudio} />
    <Route path='author/:author' component={TingAuthor} />
    <Route path='hq/gp' component={Market} />
    <Route path='hq/wh' component={Market} />
    <Route path='hq/jj' component={Market} />
    <Route path='hq/qh' component={Market} />
    <Route path='hq/zq' component={Market} />
    <Route path='*/*-d-*.html' component={Details} />
    <Route path='zj' component={Expert} />
    <Route path='zj/*/guandian.html' component={Expert} />
    <Route path='*/*.html' component={NewsChannel} />
    <Route path='*' component={Splash} />
</Route>;

export default router;