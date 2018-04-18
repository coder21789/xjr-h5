/*获取频道页的code*/

'use strict';

export async function getCode(code, _this) {
  let category = _this.mysql('category');

  /*获取频道页的关键字，描述，标题和ID*/
  let getCode = await _this.findAllMap([{
    model: category,
    arg: {
      attributes: ['title', 'keywords', 'description', 'id'],
      where: {
        code: code
      }
    }
  }]);

  getCode = await _this.resultMap(getCode);
  getCode = getCode[0][0];

  /*友情链接*/
  await _this.proxy({
    friendlyLink: 'xinrongnews:post:news-api/m/friendlyLinkService?categoryCode=' + code + '&method=friendlyLinks'
  });
  let friendLinks = (
    typeof(_this.backData.friendlyLink) == "object" && _this.backData.friendlyLink.resultBody ?
    _this.backData.friendlyLink.resultBody : '');

  /*根据频道页的ID 获取该ID下所有子类*/
  if (getCode) {
    let getMenu = await _this.findAllMap([{
      model: category,
      arg: {
        attributes: ['name', 'code', 'id'],
        where: {
          parent_id: getCode.id,
          deleted: 0
        }
      }
    }]);
    getMenu = await _this.resultMap(getMenu);
    getMenu = getMenu[0];

    return {
      friendLinks: friendLinks,
      getMenu: getMenu,
      getCode: getCode
    };
  } else {
    return {
      friendLinks: friendLinks,
      getCode: getCode
    };
  }
};