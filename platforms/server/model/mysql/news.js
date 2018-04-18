/**
 *
 * 新闻数据映射模型
 * @model news
 *
 */

'use strict';

const topic = require('./topic');
const category = require('./category');

module.exports = function(sequelize, DataTypes) {
  const news =  sequelize.define('news', {
    id: { type: DataTypes.INTEGER(), allowNull: false , primaryKey: true},
    subject: { type: DataTypes.STRING(255), allowNull: false },
    summary: { type: DataTypes.STRING(1022), allowNull: true },
    content: { type: DataTypes.TEXT('medium'), allowNull: false},
    publish_time: { type: DataTypes.NOW(), allowNull: true },
    publish_author_id: { type: DataTypes.INTEGER(), allowNull: true },
    read_count: { type: DataTypes.INTEGER(), allowNull: true },
    category_id: { type: DataTypes.INTEGER(), allowNull: true },
    status: { type: DataTypes.INTEGER(), allowNull: false },
    content_template_id: { type: DataTypes.INTEGER(), allowNull: false },
    news_url: { type: DataTypes.STRING(255), allowNull: true },
    news_source: { type: DataTypes.STRING(31), allowNull: false },
    news_source_url: { type: DataTypes.STRING(255), allowNull: true },
    news_author: { type: DataTypes.STRING(63), allowNull: true },
    thumbnail_url: { type: DataTypes.STRING(255), allowNull: true },
    video_url: { type: DataTypes.STRING(255), allowNull: true },
    news_type: { type: DataTypes.INTEGER(), allowNull: false },
    news_keywords: { type: DataTypes.STRING(4902), allowNull: true },
    news_sensitive_words: { type: DataTypes.STRING(4092), allowNull: true },
    config_id: { type: DataTypes.INTEGER(), allowNull: true },
    p_catCode: { type: DataTypes.STRING(1022), allowNull: true }
  }, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    tableName: 'news',
    timestamps: false,
    classMethods: {
      associate: function(models) {
          news.hasMany(topic, {foreignKey: 'news_id'});
          news.hasMany(category, {foreignKey: 'category_id'});
      }
    }
  });
  return news;
};