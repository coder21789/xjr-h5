/**
 * 接口数据格式转换
 * @func resultMapNormal resultMapTable resultMapCollection
 */

'use strict';

const moment = require('moment');

export default {

  /**
   * resultMapNormal 返回结果，数组格式
   * @param {Array} list mysql请求列表
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */
 
  resultMapNormal: function (list) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
      var arr = [];
      var option = {};
      var map;
      var time = 'YYYY-MM-DD HH:mm';
      opt.forEach(function(value, key) {
        let data = value.dataValues;
        data.publish_time = moment(data.publish_time).format(time);
        arr.push(data);
      });
      map = arr;
      return map;
    };
  },

  /**
   * mysqlMapTable  联表数据查询结果格式化
   * @param {Array} list mysql请求列表 foreignKey 联表外键id
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */
    
  resultMapTable: function(list, foreignKey) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
      var arr = [],
          option = {},
          map,
          format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'];
      opt.forEach(function(value, key) {
        let data = value.dataValues;
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
  },

  /**
   * resultMapCollection  大列表套小列表集合嵌套数据扁平化
   * @param {Array} list mysql请求列表 foreignKey 联表外键id
   *        {Object}    list[].model 模型
   *        {Array}     list[].arg 参数
   */
  
  resultMapCollection: async function (list, foreignKey, array) {
    return Promise.all(list.map(getMap));
    function getMap(opt) {
      var arr = [],
          map,
          format = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'HH:mm'];
      opt.forEach(function (value) {
          let data = value.dataValues;
          data[foreignKey] && (data[foreignKey] = data[foreignKey].dataValues.name);
          data.publish_time && (data.publish_time = moment(data.publish_time).format(format[1]));
          data.event_time && (data.event_time = moment(data.event_time).format(format[1]));
          if (data[array]) {
              var list = [];
              data[array].forEach(function (value) {
                  var item = value.dataValues;
                  item.publish_time && (item.publish_time = moment(value.dataValues.publish_time).format(format[1]));
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
  },

  getRecommend: function(opt, timeFormat){
    let time = timeFormat || 'YYYY-MM-DD HH:mm';
    let option = {};
    opt.forEach(function(value, key) {
        if(value.recommend_code){
            if (option[value.recommend_code] === undefined) option[value.recommend_code] = [];
            if (value.publish_time) value.time = moment(value.publish_time).format(time);
            option[value.recommend_code].push(value);
        }
    });
    return option;
  },

  setNewsFormat: function(opt, getCode){
    let code = getCode;
    let newsList = {};
    opt.forEach(function(value, key) {
        if (value.publish_time) value.time = moment(value.publish_time).format(time);
        if(Object.prototype.toString.call(value) === '[object Array]' && value[0].category_id) {
            for(let i= 0; i < code.length; i++){
                if(code[i].id == value[0].category_id){
                    newsList[code[i].code] =  value;
                    break;
                }
            }   
        }
    });
    return newsList;
  }
  
};

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