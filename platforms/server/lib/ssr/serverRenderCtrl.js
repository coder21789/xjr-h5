/**
 *
 * react服务端逻辑
 *
 */

import React from 'react';
import {RouterContext} from 'react-router';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import config from '../../../common/config';
import configureStore from '../../../../app/store/configureStore';
import {seoCtrl} from './seoRenderCtrl';

const store = configureStore();

export default async (ctx, next, renderProps) => {
  const route = renderProps.routes[renderProps.routes.length - 1];
  let prefetchTasks = [];
  for (let component of renderProps.components) {
    if (component && component.WrappedComponent && component.WrappedComponent.fetch) {
      // console.log(renderProps);
      const _tasks = await component.WrappedComponent.fetch(store.getState(), store.dispatch, renderProps, route);
      if (Array.isArray(_tasks)) {
        prefetchTasks = prefetchTasks.concat(_tasks);
      } else if (_tasks.then) {
        prefetchTasks.push(_tasks);
      }
    }
  }
  await Promise.all(prefetchTasks);

  const {platform} = ctx.query;
  console.log(ctx.url);
  const tmp = await seoCtrl(route, store.getState(), config);

  await ctx.render('index', {
    title: tmp,
    dev: ctx.app.env === 'development',
    reduxData: store.getState(),
    platform: platform,
    ad: ctx.url === '/hezuodengji.html' ? true : false,
    app: renderToString(<Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>)
  });
};