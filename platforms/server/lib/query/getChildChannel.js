/*获取子类页的code*/

'use strict';

export async function getCode(code, _this) {
  let category = _this.mysql('category');

  /*获取频道页的关键字，描述，标题和ID*/
  let getCode = await _this.findAllMap([{
    model: category,
    arg: {
      attributes: ['title', 'keywords', 'description', 'id', 'parent_id', 'name'],
      where: {
        code: code,
        deleted: 0
      }
    }
  }]);

  getCode = await _this.resultMap(getCode);
  getCode = getCode[0][0];

  /*根据频道页的ID 获取该ID下所有子类*/
  let getMenu = await _this.findAllMap([{
    model: category,
    arg: {
      attributes: ['name', 'code', 'id'],
      where: {
        parent_id: getCode.parent_id,
        deleted: 0
      }
    }
  }]);
  getMenu = await _this.resultMap(getMenu);
  getMenu = getMenu[0];

  return {
    getMenu: getMenu,
    getCode: getCode
  };
};