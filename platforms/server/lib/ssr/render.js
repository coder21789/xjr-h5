/**
 *
 * react前后端统一解析
 *
 */

import {match} from 'react-router';
import renderCtrl from './serverRenderCtrl';
import routes from '../../../../app/routes';

function _match(location) {
  return new Promise((resolve, reject) => {
    match(location, (error, redirectLocation, renderProps) => {
      if(error) {
        return reject(error);
      }
      resolve({redirectLocation, renderProps});
    });
  });
};

async function routerClient(ctx, next) {
  const {redirectLocation, renderProps} = await _match({routes: routes, location: ctx.url});
  if (ctx.url.match('/chunyun/1000')) {
    await ctx.render('index', {
      title: {title: '我在参加新融街免费领春运火车票活动，请求支援！'},
      dev: ctx.app.env === 'development',
      reduxData: '',
      platform: '',
      ad: '',
      app: ''
    });
  } else if (redirectLocation) {
    ctx.redirect(redirectLocation.pathname + redirectLocation.search);
  } else if (renderProps) {
    await renderCtrl(ctx, next, renderProps);
  } else {
    await next();
  }
};

export default async (ctx, next) => {
  try{
    await routerClient(ctx, next);
  } catch(e) {
    console.error('Server-Render Error Occurs First: %s', e.stack);
    await routerClient(ctx, next);
  };
};