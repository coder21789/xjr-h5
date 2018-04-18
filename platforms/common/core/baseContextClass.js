/**
 * context对象属性拓展类
 * @option {ctx}
 * @constructor {app, Controller, Service, Dao, Config}
 *
 */

'use strict';

/**
 * 上下文对象wrap封装
 */

class BaseContextClass {

    constructor(ctx) {

        /**
         * 传递实例上下文对象
         */

        this.ctx = ctx;

        /**
         * 实例app对象
         * @type {*}
         */

        this.app = ctx.app;

        /**
         * 实例Controller对象
         */

        this.Controller = ctx.Controller;

        /**
         * 实例Service对象
         */

        this.Service = ctx.Service;

        /**
         * 实例Dao对象
         */

        this.Dao = ctx.Dao;

        /**
         * 实例Config对象
         */

        this.Config = ctx.Config;
    };
};

module.exports = BaseContextClass;