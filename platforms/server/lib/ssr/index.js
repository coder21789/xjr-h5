/**
 *
 * Node端路由请求处理
 *
 */

import render from './render';

async function routerError(ctx, next, e) {
  await ctx.render('500', {
    msg: ctx.app.env === 'development' ? e.message : false
  });
};

export default async (ctx, next) => {
  // console.log(ctx);
  if (ctx.url.match('/wap-news-api')) {
  		await next();
  } else {
  	try {
	   	await render(ctx, next);
	} catch (e) {
  	 	console.error('Server-Render Error Occurs Finaly: %s', e.stack);
	   	await routerError(ctx, next, e);
	}
  }		 
};