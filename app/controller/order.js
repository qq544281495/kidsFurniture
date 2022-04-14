const egg = require('egg')

module.exports = class OrderController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('order/order.js')
    }
    async userOrder() {
        const { ctx } = this;
        await ctx.render('order/userOrder.js')
    }
    async getUserOrder() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.order.getUserOrder(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户订单列表失败'
            }
        }
    }
    async getShopGoods() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.order.getShopGoods(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取订单商品失败'
            }
        }
    }
    async getDefaultAddress() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.order.getDefaultAddress(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户默认地址失败'
            }
        }
    }
    async buyGoods() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.order.buyGoods(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '购买失败'
            }
        }
    }
    async setEvaluate() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.order.setEvaluate(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '评价失败'
            }
        }
    }
}