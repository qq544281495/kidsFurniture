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
    // 商品页面分类商品
    async getGoodsList(params) {
        const category = params.category
        const pageSize = (params.page - 1) * 8
        const { app } = this;
        try {
            // category为0获取全部商品数据
            let result = {}
            if (category == 0) {
                const total = (await app.mysql.select('goods')).length
                const list = await app.mysql.select('goods', { limit: 8, offset: pageSize })
                result = {list,total}
            } else {
                const total = (await app.mysql.select('goods',{where: {categoryId: category}})).length;
                const list = await app.mysql.select('goods', { where: { categoryId: category }, limit: 8, offset: pageSize });
                result = {list,total}
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    // 热销商品列表
    async getHotGoods(params) {
        const category = params.category
        const pageSize = (params.page - 1) * 8
        const { app } = this;
        try {
            // category为0获取全部商品数据
            let result = {}
            if (category == 0) {
                const total = (await app.mysql.select('goods', {where: {goodsStatus: '热销'}})).length
                const list = await app.mysql.select('goods', {where: {goodsStatus: '热销'},limit: 8, offset: pageSize })
                result = {list,total}
            } else {
                const total = (await app.mysql.select('goods',{where: {categoryId: category,goodsStatus: '热销'}})).length;
                const list = await app.mysql.select('goods', { where: { categoryId: category,goodsStatus: '热销' }, limit: 8, offset: pageSize });
                result = {list,total}
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    // 新品商品列表
    async getNewGoods(params) {
        const category = params.category
        const pageSize = (params.page - 1) * 8
        const { app } = this;
        try {
            // category为0获取全部商品数据
            let result = {}
            if (category == 0) {
                const total = (await app.mysql.select('goods', {where: {goodsStatus: '新品'}})).length
                const list = await app.mysql.select('goods', {where: {goodsStatus: '新品'},limit: 8, offset: pageSize })
                result = {list,total}
            } else {
                const total = (await app.mysql.select('goods',{where: {categoryId: category,goodsStatus: '新品'}})).length;
                const list = await app.mysql.select('goods', { where: { categoryId: category,goodsStatus: '新品' }, limit: 8, offset: pageSize });
                result = {list,total}
            }
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = HomeCategoryService