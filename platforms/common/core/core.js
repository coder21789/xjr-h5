/**
 *
 * koa原始对象wrap封装
 * 添加context对象属性controller、service、dao、config
 *
 */

'use strict';

const assert = require('assert');
const Koa = require('koa');
const KoaApplication = new Koa();
const BaseContextClass = require('./baseContextClass');

/**
 * koa核心对象属性拓展
 * @class {Core}
 */

class Core {

    /**
     * type 进程类型
     * BaseContextClass 上下文属性拓展类
     * @param options
     */

	constructor(options={}) {

        /**
         * type 默认主进程
         */

    	options.type = options.type || 'application';

    	// type 参数验证
	    assert(options.type === 'application' || options.type === 'agent', 'options.type should be application or agent');

        /**
         * Core类参数对象
         * @type {{}}
         * @private
         */

	    this._options = options;

        /**
         * Core类上下文拓展对象
         */

        this.BaseContextClass = BaseContextClass;

        /**
         * Core类接口处理对象
         */

        const Controller = this.BaseContextClass;
         
	    this.Controller = Controller;

        /**
         * Core类业务逻辑实现对象
         */

        const Service = this.BaseContextClass;
         
	    this.Service = Service;

        /**
         * Core类数据Dao层对象
         */

        const Dao = this.BaseContextClass;
         
	    this.Dao = Dao;

        /**
         * Core类配置文件对象
         */

        const Config = this.BaseContextClass;
         
	    this.Config = Config;
	};

    /**
     * 返回进程类型
     */

	get type() {
    	return this._options.type;
  	};
};

/**
 * 继承koa对象原型链属性
 */
 
Core.prototype = Object.create(KoaApplication);

module.exports = Core;