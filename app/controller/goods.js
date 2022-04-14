const egg = require('egg')

module.exports = class GoodsController extends egg.Controller {
    // 商品页
    async index() {
        const { ctx } = this;
        await ctx.render('goods/goods.js')
    }
    // 商品详情页
    async details() {
        const { ctx } = this;
        await ctx.render('goods/details.js')
    }
    // 获取商品列表
    async getGoodsList() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.goods.getGoodsList(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取商品列表失败'
            }
        }
    }
    // 获取商品详情
    async getGoodsDetails() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.goods.getGoodsDetails(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取商品详情失败'
            }
        }
    }
    // 获取商品相关商品
    async getRelatedGoods() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.goods.getRelatedGoods(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取商品相关信息失败'
            }
        }
    }
    // 添加收藏
    async addCollect() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.goods.addCollect(params);
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '添加收藏失败'
            }
        }
    }
    // 取消收藏
    async deleteCollect() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.goods.deleteCollect(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '取消收藏失败'
            }
        }
    }
    // 获取商品收藏状态
    async getCollectStatus() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.goods.getCollectStatus(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取商品收藏状态失败'
            }
        }
    }
    // 获取商品评价
    async getEvaluate() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.goods.getEvaluate(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取商品评价失败'
            }
        }
    }
}