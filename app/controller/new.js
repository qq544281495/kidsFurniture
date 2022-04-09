const egg = require('egg')

module.exports = class HotController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('new/new.js')
    }

    async getNewGoods() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.goods.getNewGoods(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取新品商品列表失败'
            }
        }
    }
}