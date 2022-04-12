const egg = require('egg')

module.exports = class ShopController extends egg.Controller {
    // 购物车页面
    async index() {
        const { ctx } = this;
        await ctx.render('shop/shop.js')
    }
    // 加入购物车
    async addShopCart() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.shop.addShopCart(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '加入购物车失败'
            }
        }
    }
    // 获取用户购物车信息
    async getUserShop() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.shop.getUserShop(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户购物车信息失败'
            }
        }
    }
    // 修改购物车商品数量
    async changeShopNum() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.shop.changeShopNum(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '修改购物车商品数量失败'
            }
        }
    }
    // 删除购物车商品
    async deleteShop() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.shop.deleteShop(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '删除购物车商品失败'
            }
        }
    }
}