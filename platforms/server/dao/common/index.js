/**
 * 基础Dao层数据类
 * @type {DaoCommon}
 */

module.exports = class DaoCommon {
    constructor(context) {
        this.context = context;
        this.category  = this.context.mysql('category');
        this.news = this.context.mysql('news');
        this.role = this.context.mysql('role');
        this.userRole = this.context.mysql('userRole');
        this.user = this.context.mysql('user');
        this.userRole.belongsTo(this.user, {foreignKey: 'user_id'});
    };

    /**
     * 查询频道tkd信息
     * @returns {*}
     */

    async tkd(category) {
        let getCode = await this.context.findAllMap([{
            model: this.category,
            arg: {
                attributes: ['title', 'keywords', 'description', 'NAME'],
                where: {code: category}
            }
        }]);
        getCode = await this.context.resultMap(getCode);
        return getCode[0][0];
    };

    /**
     * 查询图集、话题、大画财经新闻总条数
     * @param category
     * @returns {*}
     */

    async homeListCount(newsType) {
        const homeListCount = await this.context.count({
            model: this.news,
            arg: {
                where: {news_type: newsType, status: 1}
            }
        });
        return homeListCount;
    };

    /**
     * 查询频道category_id以关联相应各级频道下新闻
     * @param level
     * @param code
     * @return {*}
     */

    async categoryId(level, code) {
        let getId = await this.context.findAllMap([{
            model: this.category,
            arg: {
                attributes: ['id', 'parent_id'],
                where: {level: level, code: code, deleted: 0}
            }
        }]);
        getId = await this.context.resultMap(getId);
        return getId[0][0];
    };

    /**
     * 查询系统权限id
     * @param roleName
     * @return {*}
     */

    async roleId(roleName) {
        let getId = await this.context.findAllMap([{
            model: this.role,
            arg: {
                attributes: ['id'],
                where: {role_name: roleName, enable: 0}
            }
        }]);
        getId = await this.context.resultMap(getId);
        return getId[0][0];
    };

    /**
     * 查询用户id列表根据系统权限id
     * @param roleId
     * @returns {Promise.<*>}
     */

    async userId(roleId, callback) {
        let getId = await this.context.findAllMap([{
            model: this.userRole,
            arg: {
                order: 'user_id ASC',
                attributes: ['user_id'],
                where: {role_id: roleId.id},
                include: [{model: this.user, attributes: ['id', 'enable'], where: {enable: 0}}]
            },
        }]);
        getId = await callback(getId, 'user');
        return getId[0];
    };
};