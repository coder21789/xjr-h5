/*获取专家新闻*/

'use strict';

import moment from 'moment';

export async function news(_this, limit, timeFormat) {
  let news = _this.mysql('news');
  let user = _this.mysql('user');
  let getAuthor = await _this.findAllMap([{
    model: user,
    arg: {
      attributes: ['id'],
      where: {
        enable: 0
      }
    }
  }]);
  getAuthor = await _this.resultMap(getAuthor);
  getAuthor = getAuthor[0];

  let getExpertArr = [];
  for (let i = 0; i < getAuthor.length; i++) {
    getExpertArr.push({
      model: news,
      arg: {
        order: "id DESC",
        attributes: ['news_url', 'subject', 'publish_author_id', 'news_author', 'publish_time', 'id'],
        where: {
          publish_author_id: getAuthor[i].id,
          category_id: 126,
          status: 1
        },
        limit: 1
      }
    });
  }
  let getExpert = await _this.findAllMap(getExpertArr);
  getExpert = await _this.resultMap(getExpert);


  function getArr(opt, limit, timeFormat) {
    var map = [];
    var time = timeFormat || 'YYYY-MM-DD';
    opt.forEach(function(value, key) {
      if (Object.prototype.toString.call(value) === '[object Array]') {
        if (value[0].hasOwnProperty("publish_time")) value[0].time = moment(value[0].publish_time).format(time);
        map.push(value[0]);
      }
    });
    return map.sort(compare('id')).slice(0, limit);
  };

  function compare(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  };

  return getArr(getExpert, limit, timeFormat);
};