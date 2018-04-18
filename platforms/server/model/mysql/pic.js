/**
 *
 * 图集模块数据映射模型
 * @model pic
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const pic = sequelize.define('pic', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        pic_desc: {type: DataTypes.STRING(512), allowNull: false},
        pic_url_detail: {type: DataTypes.STRING(128), allowNull: false},
        pic_url_list: {type: DataTypes.STRING(128), allowNull: false},
        pic_url_cover: {type: DataTypes.STRING(128), allowNull: false},
        state: {type: DataTypes.INTEGER(), allowNull: false},
        news_id: {type: DataTypes.INTEGER(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_pics_detail',
        timestamps: false
    });
    return pic;
};