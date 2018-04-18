/**
 *
 * 话题模块数据映射模型
 * @model topic
 *
 */

'use strict';

const news = require('./news');

module.exports = function(sequelize, DataTypes) {
    const topic = sequelize.define('topic', {
        id: {type: DataTypes.INTEGER(), allowNull: false, primaryKey: true},
        news_recommend_subject: {type: DataTypes.STRING(128), allowNull: false},
        news_url: {type: DataTypes.STRING(128), allowNull: false},
        news_app_url: {type: DataTypes.STRING(128), allowNull: false},
        pic_url_list: {type: DataTypes.STRING(128), allowNull: false},
        pic_url_cover: {type: DataTypes.STRING(128), allowNull: false},
        state: {type: DataTypes.INTEGER(), allowNull: false},
        news_id: {type: DataTypes.INTEGER(), allowNull: false},
        rel_news_id: {type: DataTypes.INTEGER(), allowNull: false}
    }, {
        freezeTableName: true,
        tableName: 'news_topic_detail',
        timestamps: false,
        classMethods: {
            associate: function(models) {
                topic.belongsTo(news, {foreignKey: 'news_id'});
            }
        }
    });
    return topic;
};