const egg = require('egg')

module.exports = class LoginController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('login/login.js')
    }

    async loginVerify() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.login.loginVerify(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '登录失败，请稍后重试'
            }
        }
    }
}