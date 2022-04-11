const egg = require('egg')

module.exports = class LikeController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('like/like.js')
    }

    async getUserAllCollect() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.like.getUserAllCollect(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户收藏失败'
            }
        }
    }
}