const egg = require('egg')

module.exports = class UserController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('user/user.js')
    }
}