/*获取专家列表*/

'use strict';

export async function getAnswerList(_this, option) {
  await _this.proxy({
    answer: 'xinrongnews:post:news-api/web/expert/answerList' + getStr(option)
  });
  let answerList = (
    typeof(_this.backData.answer) == "object" && _this.backData.answer.resultBody ?
    _this.backData.answer.resultBody : '');
  return answerList;
};

function getStr(obj) {
  var names = "?";
  /*for in 可以用于数组或者对象*/
  for (var name in obj) {
    names += name + "=" + obj[name] + "&";
  }
  return names;
};