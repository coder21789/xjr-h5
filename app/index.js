/**
 *
 * 页面根元素配置
 * 路由-浏览器-状态树同步
 *
 */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';

// if (process.env.NODE_ENV !== 'production') {
//     const {whyDidYouUpdate} = require('why-did-you-update');
//     whyDidYouUpdate(React);
// }

const store = window.__REDUX_STATE__ ? configureStore(window.__REDUX_STATE__) : configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);