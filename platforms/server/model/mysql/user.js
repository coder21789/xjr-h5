/**
 *
 * 用户信息数据映射模型
 * @model user
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true },
    user_name: { type: DataTypes.STRING(32), allowNull: false },
    name: { type: DataTypes.STRING(32), allowNull: true },
    password: { type: DataTypes.STRING(64), allowNull: false},
    enable: { type: DataTypes.INTEGER(1), allowNull: false },
    isAdmin: { type: DataTypes.INTEGER(1), allowNull: false },
    login_ip: { type: DataTypes.STRING(32), allowNull: true },
    login_fail_num: { type: DataTypes.INTEGER(3), allowNull: true },
    home_phone: { type: DataTypes.STRING(15), allowNull: true },
    mobile: { type: DataTypes.STRING(15), allowNull: true },
    create_date: { type: DataTypes.DATE(), allowNull: false },
    create_user: { type: DataTypes.STRING(40), allowNull: false },
    update_date: { type: DataTypes.DATE(), allowNull: true },
    update_user: { type: DataTypes.STRING(40), allowNull: true },
    sex: { type: DataTypes.INTEGER(1), allowNull: true },
    age: { type: DataTypes.INTEGER(3), allowNull: true },
    qq: { type: DataTypes.STRING(32), allowNull: true },
    email: { type: DataTypes.STRING(64), allowNull: true },
    head_img_url: { type: DataTypes.STRING(300), allowNull: true },
    description: { type: DataTypes.STRING(300), allowNull: true },
    nick_name: { type: DataTypes.STRING(30), allowNull: true },
    good_at_category: { type: DataTypes.STRING(32), allowNull: true }
  }, {
      freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
      tableName: 'sys_user',       
      timestamps: false,
      associate: (models) => {}
  });
};