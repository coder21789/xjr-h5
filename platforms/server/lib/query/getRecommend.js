/*证券公司，证券公司详情页面，详情页的links 和新闻*/

'use strict';

export async function news(_this) {
  let recommend = _this.mysql('recommend');
  let other = [{
    code: 'cj',
    name: '财经'
  }, {
    code: 'qq',
    name: '全球'
  }, {
    code: 'gp',
    name: '股票'
  }, {
    code: 'jj',
    name: '基金'
  }, {
    code: 'lc',
    name: '理财'
  }, {
    code: 'qh',
    name: '期货'
  }];

  let getRecommendNewsArr = [{
    model: recommend,
    arg: {
      limit: 5,
      attributes: ['news_url', 'news_pic', 'news_recommend_subject', 'news_recommend_summary', 'recommend_code', 'recommend_name'],
      where: {
        category_code: 'index',
        state: '1',
        recommend_code: {
          $like: 'web_sy_tt%'
        }
      },
      order: [
        ['recommend_code', 'DESC'],
        ['recommend_name']
      ]
    }
  }, {
    model: recommend,
    //首页小标题推荐
    arg: {
      attributes: ['news_url', 'news_pic', 'news_recommend_subject', 'news_recommend_summary', 'recommend_code', 'recommend_name'],
      limit: 10,
      order: [
        ['recommend_code', 'DESC'],
        ['recommend_name']
      ],
      where: {
        category_code: 'index',
        state: '1',
        recommend_code: {
          $like: 'web_sy_tjxbt_%'
        }
      }
    }
  }];

  for (let i = 0; i < other.length; i++) {
    getRecommendNewsArr.push({
      model: recommend,
      arg: {
        order: "id DESC",
        attributes: ['news_url', 'news_pic', 'news_recommend_subject', 'news_recommend_summary', 'recommend_code'],
        where: {
          category_code: other[i].code,
          state: '1'
        },
        limit: 8
      }
    });
  }

  let getRecommendNews = await _this.findAllMap(getRecommendNewsArr);
  getRecommendNews = await _this.resultMap(getRecommendNews);
  return {
    getRecommendNews: getRecommendNews,
    other: other
  };
};