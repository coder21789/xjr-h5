'use strict';

import moment from 'moment';

// model名称，即表名
exports.model = 'news';

// 表结构
exports.schema = [{
  summary: String,
  keywords: String,
  publishTime: String,
  state: String,
  subject: String,
  readCount: String,
  categoryId: String,
  code: String,
  type: String,
  content: String,
  author: String,
  parentId: String,
  source: String,
  publishAuthorId: String,
  parentCode: String,
  sensitiveWords: String,
  configId: String,
  thumbnailUrl: {
    type: String,
    default: ''
  },
  url: String
}];

// 静态方法:http://mongoosejs.com/docs/guide.html#statics
exports.statics = {};

// http://mongoosejs.com/docs/guide.html#methods
exports.methods = {
  getRank: function* (day) {
    return this.model('news').find({
      publishTime: {
        "$gte": moment().subtract(day, "days").format("YYYY-MM-DD"),
        "$lt": moment().format('YYYY-MM-DD')
      },
      state: '1'
    }).sort({
      'publishTime': 'desc'
    });
  },
  getDetail: function* (id) {
    return this.model('news').find({
      _id: id,
      state: '1'
    }).sort({
      'publishTime': 'desc'
    });
  },
  getAuthorId: function* (opt) {
    return this.model('news').find({
      categoryId: "126",
      state: '1'
    }).sort({
      'publishTime': 'desc'
    }).limit(opt.len);
  },
  getExpert: function* (opt) {
    return this.model('news').find({
      categoryId: "126",
      publishAuthorId: opt._id,
      state: '1'
    }).sort({
      'publishTime': 'desc'
    }).limit(opt.len);
  },
  list: function* (opt) {
    return this.model('news').find(opt.param).limit(opt.len);
  },
  delete: function* (opt) {
    return this.model('news').findOneAndRemove(opt.param);
  }
};