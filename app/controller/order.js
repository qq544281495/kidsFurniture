const egg = require('egg')

module.exports = class OrderController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('order/order.js')
    }
}