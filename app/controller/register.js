const egg = require('egg')

module.exports = class RegisterController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('register/register.js')
    }

    async addUserInfo() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.register.addUserInfo(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '注册失败，请稍后重试'
            }
        }
    }
}