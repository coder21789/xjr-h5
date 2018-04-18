/*获取专家列表*/

'use strict';

export async function getExpertList(_this) {
	await _this.proxy({
		expert: 'xinrongnews:post:news-api/web/expert/list'
	});
	let expertList = (
		typeof(_this.backData.expert) == "object" && _this.backData.expert.resultBody ?
		_this.backData.expert.resultBody : '');

	return expertList;
};