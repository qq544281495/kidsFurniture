const egg = require('egg')

module.exports = class GoodsController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('goods/goods.js')
    }

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
}