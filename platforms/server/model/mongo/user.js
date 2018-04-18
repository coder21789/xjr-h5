'use strict';

exports.model = 'sys_user';

exports.schema = [{
  name: String,
  mobile: String,
  sex: Boolean,
  age: Number,
  qq: String,
  email: String,
  headImgUrl: String,
  description: String,
  nickName: String
}];

exports.statics = {};

exports.methods = {
  list: function* () {
    return this.model('sys_user').find();
  }
};