'use strict';

/*
用法：见model->mysql模块
*/

const logger = require('koa-log4').getLogger('index');
const path = require('path');
const fs = require('fs');
const co = require('co');
const Sequelize = require('sequelize');

/**
 * @param  {string} app     context
 * @param  {object} options 配置项
 *         {string} options.root mysql的model配置路径
 *         {string} options.connect mysql连接路径
 * @return {function}
 */

module.exports = function setMysql(app, options) {
  const root = options.root;
  const connect = options.connect;
  const settings = options.settings;
  connect.option = { ...connect.option,
    ...settings
  };
  // console.log(root, connect);

  // 如果root不存在则直接跳过
  if (!fs.existsSync(root)) {
    logger.error('error : can\'t find mysql path ' + root);
    return async function mysql(ctx, next) {
      await next()
    };
  }

  //设置log配置
  connect.option.logging = function(sql) {
    // logger为log4js的Logger实例
    process.env.NODE_ENV !== 'production' && logger.info(sql);
  };

  // 创建数据库连接
  const sequelize = new Sequelize(connect.database, connect.username, connect.password, connect.option);

  sequelize.authenticate().then(function() {
    logger.info("CONNECTED! ");
  }).catch(function(err) {
    logger.error("SOMETHING DONE GOOFED");
  });

  let Model = {};
  let db = {};
  _ls(root).forEach(function(filePath) {
    if (/\\/.test(filePath)) {
      filePath = filePath.replace(/\\/g, '/');
    }
    // console.log(filePath);
    if (!/.js$/.test(filePath)) {
      return;
    }
    let mod = path.basename(filePath, '.js');
    let model = sequelize.import(filePath);
    db[mod] = model;
    if (model.options.hasOwnProperty('associate')) {
      model.options.associate(db);
    }
    Model[mod] = model;
  });
  // console.log(Model);

  return async function mysql(ctx, next) {
    if (ctx.mysql) return await next();

    Object.assign(ctx, {

      /**
       * mysql
       * @return {Object} 返回一个Entity对象
       */

      mysql: function(mod, data) {
        // console.log(mod);
        if (!Model || !Model[mod]) {
          logger.error("can't find model : " + mod);
          return;
        }
        return Model[mod];
      },

      /**
       * mysqlMap 查找方法 检查全部_返回表中所有字段
       * @param {Array} list mysql请求列表
       *        {Object}    list[].model 模型
       *        {Array}     list[].arg 参数
       */

      findAllMap: function(list) {
        return Promise.all(list.map(mysqlExecMap));

        function mysqlExecMap(opt) {
          let arg = opt.arg || [];
          let model = opt.model;
          return model.findAll(opt.arg);
        }
      },

      /**
       * mysqlMap 查找方法 检查单个_返回表中所有字段
       * @param {Array} list mysql请求列表
       *        {Object}    list[].model 模型
       *        {Array}     list[].arg 参数
       */

      findOneMap: function(list) {
        return Promise.all(list.map(mysqlExecMap));

        function mysqlExecMap(opt) {
          let arg = opt.arg || [];
          let model = opt.model;
          return model.findOne(opt.arg);
        }
      },

      /**
       * queryMap 查找方法 自定义sql查询
       * @param {Object}    opt 请求对象
       *        {Object}    opt.sqlQuery 查询语句
       */

      setQuery: function(opt) {
        return Promise.resolve(queryExecMap(opt));

        function queryExecMap(opt) {
          let sqlQuery = opt.sqlQuery;
          if (!sqlQuery) return;
          let query = sequelize.query(sqlQuery, {
            type: sequelize.QueryTypes.SELECT // 指定sql为SELECT
          })
          return query;
        }
      },

      /**
       * queryListMap 查找方法 自定义sql查询
       * @param {Object}    opt 请求对象
       *        {Object}    opt.sqlQuery 查询语句
       */

      setQueryListMap: function(list) {
        return Promise.all(list.map(queryExecMap));

        function queryExecMap(opt) {
          let sqlQuery = opt.sqlQuery;
          if (!sqlQuery) return;
          let query = sequelize.query(sqlQuery, {
            type: sequelize.QueryTypes.SELECT // 指定sql为SELECT
          })
          return query;
        }
      },

      /**
       * count  计算总数
       * @param {Object}    opt 请求对象
       *        {Object}    opt.sqlQuery 查询语句
       */

      count: function(opt) {
        return Promise.resolve(getMap(opt));

        function getMap(opt) {
          let model = opt.model;
          return model.count(opt.arg);
        };
      },

      /**
       * findAllMap 返回结果，转换为数组对象 mysql 
          返回的数据对象中dataValues属性才是需要的数据
          此方法用于取data.dataValues 转为一个数组对象
       * @param {Array}     list mysql请求列表
       *        {Object}    list[].model 模型
       *        {Array}     list[].arg 参数
       */

      resultMap: function(list) {
        return Promise.all(list.map(getMap));

        function getMap(opt) {
          var arr = [];
          var option = {};
          var map;
          if (Object.prototype.toString.call(opt) === '[object Array]') {
            opt.forEach(function(value, key) {
              let data = value.dataValues;
              arr.push(data);
            });
          } else {
            if (opt && opt.dataValues) arr.push(opt.dataValues);
          }
          map = arr.length ? arr : option;
          return map;
        };
      }

    });
    await next();
  };
};

/**
 * 查找目录中的所有文件
 * @param  {string} dir       查找路径
 * @param  {init}   _pending  递归参数，忽略
 * @param  {array}  _result   递归参数，忽略
 * @return {array}            文件list
 */

function _ls(dir, _pending, _result) {
  _pending = _pending ? _pending++ : 1;
  _result = _result || [];
  if (!path.isAbsolute(dir)) {
    dir = path.join(process.cwd(), dir);
  }
  let stat = fs.lstatSync(dir);
  if (stat.isDirectory()) {
    let files = fs.readdirSync(dir);
    files.forEach(function(part) {
      _ls(path.join(dir, part), _pending, _result);
    });
    if (--_pending === 0) {
      return _result;
    }
  } else {
    _result.push(dir);
    if (--_pending === 0) {
      return _result;
    }
  }
};