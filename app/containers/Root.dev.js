/**
 *
 * 开发应用根元素配置
 * 获取状态树数据配置
 *
 */

import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import {Router} from 'react-router';

function ToolsBar(props) {
    if (!props.toolsBar) {
        return null;
    }
    return (
        <DevTools />
    );
};

const Root = ({store, history}) => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <ToolsBar toolsBar={false} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;