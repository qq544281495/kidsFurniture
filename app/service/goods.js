const { not } = require('ip');

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
    // 获取商品详情
    async getGoodsDetails(params) {
        const { app } = this;
        const goodsId = params.goodsId
        try {
            const result = await app.mysql.get('goods', { goodsId });
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
    // 获取商品相关商品
    async getRelatedGoods(params) {
        const { app } = this;
        const goodsId = params.goodsId
        try {
            const categoryId = (await app.mysql.get('goods', { goodsId })).categoryId;
            let result = await app.mysql.select('goods', { where: { categoryId: categoryId },limit: 4, offset: 0 })
            result = result.filter(item => {
                return item.goodsId != goodsId
            })
            return result
        } catch (error) {
            console.log(err);
            return null
        }
    }
    // 添加收藏
    async addCollect(params) {
        const { app } = this;
        const judg = await app.mysql.select('collect', { where: { userId: params.userId, goodsId: params.goodsId } })
        if (judg.length == 0) {
            const result = await app.mysql.insert('collect', params)
            if (result.affectedRows === 1) {
                return { code: 200, message: '收藏成功' }
            }
        } else {
            const result = await app.mysql.update('collect', params, {where:{userId: params.userId, goodsId: params.goodsId}})
            if (result.affectedRows === 1) {
                return { code: 200, message: '收藏成功' }
            }
        }
    }
    // 取消收藏
    async deleteCollect(params) {
        const { app } = this;
        const result = await app.mysql.update('collect', params, {where:{userId: params.userId, goodsId: params.goodsId}})
        if (result.affectedRows === 1) {
            return { code: 200, message: '取消收藏' }
        } else {
            return { code: 500, message: '取消收藏失败，请稍后重试'}
        }
    }
    // 获取商品收藏状态
    async getCollectStatus(params) {
        const { app } = this;
        const result = await app.mysql.select('collect', { where: { userId: params.userId, goodsId: params.goodsId, goodsLike: 1 } })
        if (result.length == 0) {
            return { collect: false };
        } else {
            return { collect: true };
        }
    }
    // 获取商品评价
    async getEvaluate(params) {
        const { app } = this;
        try {
            const result = await app.mysql.select('evaluate', { where: { goodsId: params.goodsId } })
            return result
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = HomeCategoryService