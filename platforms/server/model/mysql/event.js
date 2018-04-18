/**
 *
 * 大事件模块数据映射模型
 * @model event
 *
 */

'use strict';

module.exports = function(sequelize, DataTypes) {
    const event = sequelize.define('event', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        news_recommend_subject: {type: DataTypes.STRING(128), allowNull: false},
        news_recommend_summary: {type: DataTypes.STRING(2048), allowNull: false},
        news_url: {type: DataTypes.STRING(128), allowNull: false},
        news_event_tag: {type: DataTypes.STRING(64), allowNull: false},
        news_app_url: {type: DataTypes.STRING(128), allowNull: false},
        pic_url: {type: DataTypes.STRING(128), allowNull: false},
        video_url: {type: DataTypes.STRING(128), allowNull: false},
        state: {type: DataTypes.STRING(2), allowNull: false},
        news_id: {type: DataTypes.INTEGER(), allowNull: false},
        rel_news_id: {type: DataTypes.INTEGER(), allowNull: false},
        publish_time: {type: DataTypes.NOW(), allowNull: false},
        event_time: {type: DataTypes.NOW(), allowNull: false},
        location_code: {type: DataTypes.STRING(32), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_event_detail',
        timestamps: false
    });
    return event;
};