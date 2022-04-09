const egg = require('egg')

module.exports = class HotController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('hot/hot.js')
    }

    async getHotGoods() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.goods.getHotGoods(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取热销商品列表失败'
            }
        }
    }
}