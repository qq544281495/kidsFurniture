const egg = require('egg')

module.exports = class UserController extends egg.Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('user/user.js')
    }
    async getUserInfo() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.user.getUserInfo(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户信息失败'
            }
        }
    }
    async editUserInfo() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.user.editUserInfo(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '编辑用户信息失败'
            }
        }
    }
    async getUserAddress() {
        const { ctx } = this;
        const params = ctx.request.query
        const result = await ctx.service.user.getUserAddress(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户收货地址失败'
            }
        }
    }
    async deleteAddress() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.user.deleteAddress(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '获取用户收货地址失败'
            }
        }
    }
    async addAddress() {
        const { ctx } = this;
        const params = ctx.request.body
        const result = await ctx.service.user.addAddress(params)
        if (result) {
            ctx.body = result
        } else {
            ctx.body = {
                message: '添加收货地址失败'
            }
        }
    }
}