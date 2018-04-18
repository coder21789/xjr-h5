/**
 * 接口数据格式转换类
 * @class format
 */

'use strict';

import moment from 'moment';

/**
 * 数据处理工具类
 * @returns {{timeago: timeago}}
 */

function utils() {

  /**
   * 时间值转换
   * @param date
   * @returns {string}
   */

  function timeago(date, year) {
    date = new Date(date);
    const dateYear = date.getFullYear();
    const dateMonths = date.getMonth() + dateYear * 12; //计算总月数
    const time = date.getTime();
    const curDate = new Date();
    const curDateYear = curDate.getFullYear();
    const curDateMonths = curDate.getMonth() + curDateYear * 12; //计算总月数
    const curTime = curDate.getTime();
    const deltaTime = Math.floor((curTime - time) / 1000); //转为秒

    let formatDate = year ? formatYear() : formatHour();
    return formatDate;

    function formatYear() {
      if (curDateMonths - dateMonths > 12) {
        return `${Math.floor((curDateMonths - dateMonths) / 12)}年前`;
      } else if (curDateMonths - dateMonths > 1) {
        return `${curDateMonths - dateMonths}个月前`;
      } else {
        if (deltaTime < 60) {
          return `${deltaTime}秒前`;
        } else if (deltaTime < 3600) {
          return `${Math.floor(deltaTime / 60)}分钟前`;
        } else if (deltaTime < 86400) {
          return `${Math.floor(deltaTime / 3600)}小时前`;
        } else if (deltaTime < 604800) {
          return `${Math.floor(deltaTime / 86400)}天前`;
        } else {
          return `${Math.floor(deltaTime / 604800)}周前`;
        }
      }
    };

    function formatHour() {
      const format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'];
      const formatDate = moment(date).format(format[0]);
      
      if (curDateMonths - dateMonths > 1) {
        return formatDate;
      } else {
        if (deltaTime < 30) {
          return `刚刚`;
        } else if (deltaTime < 60) {
          return `1分钟内`;
        } else if (deltaTime < 3600) {
          return `${Math.floor(deltaTime / 60)}分钟前`;
        } else if (deltaTime < 86400) {
          return `${Math.floor(deltaTime / 3600)}小时前`;
        } else {
          return formatDate;
        }
      }
    };
  };

  return {
    timeago: timeago
  };

};

module.exports = class format {

  /**
   * 列表分页信息封装
   * @param count
   * @param pagePerNum
   * @param pageStart
   * @return {{}}
   */

  pageNotice(count, pagePerNum, pageStart) {
    const MAX_LIMIT = 100;
    let totalPage = Math.ceil(count / pagePerNum);
    let _offset = pagePerNum * pageStart;
    let _nextPage = pageStart + 1;
    let nextPage;
    if (_offset < MAX_LIMIT) {
      nextPage = _nextPage > totalPage ? null : _nextPage;
    } else {
      nextPage = null;
    }
    let pageInfo = {};
    pageInfo.currentPage = pageStart;
    pageInfo.nextPage = nextPage;
    pageInfo.totalPage = totalPage;
    return pageInfo;
  };

  /**
   * 中英文转换
   * @param source
   * @param targetObject
   * @param targetObjectName
   * @param configObject
   * @param configName
   * @param range
   * @returns {{}}
   * @constructor
   */

  En2Cn(source, targetObject, targetObjectName, configObject, configName, range) {
    let target = source[targetObject],
        CnStringArray = [],
        _object = configObject[configName];
    if (target) {
      let EnStringArray = target.match(',') ? target.split(',') : [target];
      EnStringArray.slice(0, range).map(item => {
        CnStringArray.push(_object[item]);
      });
    }   
    return {...source, [targetObjectName]: CnStringArray};
  };

  /**
   * 字符串集合转数组类型
   * @param stringList
   * @param tag
   * @return {*}
     */

  string2ArrayList(stringList, tag) {
    if (stringList.match(tag)) {
      let arrayList = stringList.split(tag);
      return arrayList;
    } else {
      return [stringList];
    }
  };

  /**
   * resultMapNormal 返回结果，数组格式
   * @param {Array} list mysql请求列表
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */
  
  resultMapNormal(list, foreignKey) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
      var arr = [];
      var map;
      var time = 'YYYY-MM-DD HH:mm';
      opt.forEach(function(value, key) {
        var data = value.dataValues;
        data.publish_time = data.time = utils().timeago(moment(data.publish_time).format(time));
        if (data[foreignKey]) {
          data[foreignKey].forEach(function(value, key) {
            for (let item in value.dataValues) {
              data[item] = value.dataValues[item];
            }
          });
          delete data[foreignKey];
        }
        delete data.publish_time;
        arr.push(data);
      });
      map = arr;
      return map;
    };
  };

  /**
   * mysqlMapTable  联表数据查询结果格式化
   * @param {Array} list mysql请求列表 foreignKey 联表外键id
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */

  resultMapTable(list, foreignKey) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
      var arr = [],
          map,
          format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'];
      opt.forEach(function(value, key) {
        let data = value.dataValues;
        if (data.newsType) data.newsType = data.newsType -1;
        if (data[foreignKey]) {
          for (let item in data[foreignKey].dataValues) {
            // console.log(item, data[foreignKey].dataValues[item]);
            item.match('publish_time') ? 
            data[item] = data.time = utils().timeago(moment(data[foreignKey].dataValues[item]).format(format[0])) : 
            data[item] = data[foreignKey].dataValues[item];
          }
          delete data.publish_time;
          delete data[foreignKey];
        }
        arr.push(data);
      });
      map = arr;
      return map;
    };
  };

  /**
   * resultMapCollection  大列表套小列表集合嵌套数据扁平化
   * @param {Array} list mysql请求列表 foreignKey 联表外键id
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */
  
  resultMapCollection(list, foreignKey, array) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
      var arr = [],
          map,
          format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'];
      opt.forEach(function (value) {
        let data = value.dataValues;
        data[foreignKey] && (data[foreignKey] = data[foreignKey].dataValues.name);
        data.publish_time && (data.publish_time = data.time = utils().timeago(moment(data.publish_time).format(format[1])));
        delete data.publish_time;
        data.event_time && (data.event_time = utils().timeago(moment(data.event_time).format(format[1])));
        if (data[array]) {
            var list = [];
            data[array].forEach(function (value) {
                var item = value.dataValues;
                item.publish_time && (item.publish_time = utils().timeago(moment(value.dataValues.publish_time).format(format[1])));
                list.push(item);
            });
            data.list = list;
            delete data[array];
        }
        arr.push(data);
      });
      map = arr;
      return map;
    };
  };

};