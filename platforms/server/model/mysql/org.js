/**
 *
 * 公司信息数据映射模型
 * @model org
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('org', {
    id: { type: DataTypes.INTEGER(11), allowNull: false , primaryKey: true},
    country_id: { type: DataTypes.STRING(8), allowNull: true },
    province_id: { type: DataTypes.STRING(8), allowNull: true },
    city_id: { type: DataTypes.STRING(8), allowNull: true},
    name: { type: DataTypes.STRING(64), allowNull: true },
    simplyname: { type: DataTypes.STRING(64), allowNull: true },
    representative: { type: DataTypes.STRING(64), allowNull: true },
    registered_capital: { type: DataTypes.STRING(64), allowNull: true },
    zip_code: { type: DataTypes.STRING(64), allowNull: true },
    office_address: { type: DataTypes.STRING(64), allowNull: true },
    registered_address: { type: DataTypes.STRING(64), allowNull: true },
    permission_code: { type: DataTypes.STRING(64), allowNull: true },
    service_tel: { type: DataTypes.STRING(64), allowNull: true },
    //org_code: { type: DataTypes.STRING(64), allowNull: true },
    info: { type: DataTypes.STRING(512), allowNull: true },
    logo: { type: DataTypes.STRING(128), allowNull: true },
    org_type: { type: DataTypes.STRING(8), allowNull: true },
    status: { type: DataTypes.STRING(2), allowNull: true },
    create_time: { type: DataTypes.NOW(), allowNull: true }
  }, {
      freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步      
      tableName: 'db_org',       
      timestamps: false,
      classMethods: {
      associate: function(models) {}
    }
  });
};