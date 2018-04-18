/**
 *
 * 词汇信息数据映射模型
 * @model word
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('word', {
    id: { type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING(32), allowNull: true },
    word_type: { type: DataTypes.INTEGER(4), allowNull: false},
    deleted: { type: DataTypes.BOOLEAN(), allowNull: false },
    creation_time: { type: DataTypes.NOW(), allowNull: true },
    code: { type: DataTypes.STRING(8), allowNull: true },
    url: { type: DataTypes.STRING(128), allowNull: true },
    title: { type: DataTypes.STRING(128), allowNull: true },
    keywords: { type: DataTypes.STRING(128), allowNull: true },
    description: { type: DataTypes.STRING(512), allowNull: true }
  }, {
      freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
      tableName: 'vocabulary',       
      timestamps: false,
      associate: (models) => {}
  });
};