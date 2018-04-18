/**
 *
 * 系统权限关联表数据映射模型
 * @model role
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const role = sequelize.define('role', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        enable: {type: DataTypes.INTEGER(), allowNull: false},
        role_name: { type: DataTypes.STRING(32), allowNull: false},
        description: { type: DataTypes.STRING(600), allowNull: true}
    }, {
        freezeTableName: true,
        tableName: 'sys_role',
        timestamps: false
    });
    return role;
};