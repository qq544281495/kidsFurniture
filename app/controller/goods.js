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
}