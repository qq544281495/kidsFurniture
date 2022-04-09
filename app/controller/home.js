'usestrict';
const egg = require('egg');
module.exports = class HomeController extends egg.Controller {
  
  // 渲染首页
  async index() {
    const { ctx } = this;
    await ctx.render('home/home.js');
  }

  // 获取轮播图
  async getCarousel() {
    const { ctx } = this;
    const result = await ctx.service.carousel.getCarousel();
    if (result) {
      ctx.body = result
    } else {
      ctx.body = {
        message: '获取轮播图失败'
      }
    }
  }

  // 获取首页商品分类
  async getHomeCategory() {
    const { ctx } = this;
    const params = ctx.request.query
    const result = await this.service.goods.getHomeCategory(params)
    if (result) {
      ctx.body = result
    } else {
      ctx.body = {
        message: '获取首页商品分类失败'
      }
    }
  }
};