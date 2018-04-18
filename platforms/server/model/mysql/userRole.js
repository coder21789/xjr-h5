/**
 *
 * 用户权限关联表数据映射模型
 * @model userRole
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const userRole = sequelize.define('userRole', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        role_id: {type: DataTypes.INTEGER(), allowNull: false},
        user_id: {type: DataTypes.INTEGER(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'sys_user_role',
        timestamps: false
    });
    return userRole;
};