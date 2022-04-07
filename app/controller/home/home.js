'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  
  async index() {
    await this.ctx.render('home/index.js');
  }
};