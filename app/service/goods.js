const Service = require('egg').Service

class HomeCategoryService extends Service {
    // 首页分类商品
    async getHomeCategory(params) {
        const category = params.category
        const { app } = this;
        // 一定要抛出异常，避免数据库等错误出现
        try {
            const result = await app.mysql.select('goods',{where: {categoryId: category},limit:4,offset:0});
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

module.exports = HomeCategoryService