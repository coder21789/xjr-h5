/*证券公司，证券公司详情页面，详情页的links 和新闻*/

'use strict';

export async function news(_this, id) {
  let news = _this.mysql('news');
  let links = [{
    code: 'gsyw',
    name: '股市要闻',
    id: 24
  }, {
    code: 'jggd',
    name: '机构观点',
    id: 40
  }, {
    code: 'dpfx',
    name: '大盘分析',
    id: 25
  }, {
    code: 'grfx',
    name: '个股分析',
    id: 26
  }, {
    code: 'bkrd',
    name: '板块热点',
    id: 27
  }, {
    code: 'zldt',
    name: '主力动态',
    id: 29
  }, {
    code: 'hyyj',
    name: '行业研究',
    id: 28
  }, {
    code: 'hwgs',
    name: '海外股市',
    id: 41
  }, {
    code: 'ssgs',
    name: '上市公司',
    id: 191
  }, {
    code: 'cyb',
    name: '创业板',
    id: 42
  }];

  let getNewsArr = [{
    model: news,
    arg: {
      order: "id DESC",
      attributes: ['news_url', 'subject', 'publish_author_id', 'news_author'],
      where: {
        category_id: id,
        status: 1
      },
      limit: 12
    }
  }];

  for (let i = 0; i < links.length; i++) {
    getNewsArr.push({
      model: news,
      arg: {
        order: "id DESC",
        attributes: ['news_url', 'subject', 'publish_author_id', 'news_author'],
        where: {
          category_id: links[i].id,
          status: 1
        }
      }
    });
  }
  let getNews = await _this.findOneMap(getNewsArr.slice(1));
  getNews = await _this.resultMap(getNews);
  return {
    getNewsArr: getNewsArr,
    getNews: getNews,
    links: links
  };
};