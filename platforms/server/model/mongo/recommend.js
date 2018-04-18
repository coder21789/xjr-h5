'use strict';

exports.model = 'web_recommend_news';

exports.schema = [{
  creationDate: String,
  rank: String,
  recommendCode: String,
  newsId: Number,
  publishTime: String,
  recommendName: String,
  categoryCode: String,
  subject: String,
  summary: {
    type: String,
    default: ''
  },
  url: String,
  picUrl: {
    type: String,
    default: ''
  },
  picDesc: {
    type: String,
    default: ''
  },
  newsVideo: {
    type: String,
    default: ''
  },
  recommendRank: String,
  state: String
}];

exports.statics = {};

exports.methods = {
  list: function* (obj) {
    return this.model('web_recommend_news').find(obj);
  }
};