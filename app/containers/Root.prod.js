/**
 *
 * 发布应用根元素配置
 * 获取状态树数据配置
 *
 */

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import routes from '../routes';
import {Router} from 'react-router';

const Root = ({store, history}) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;