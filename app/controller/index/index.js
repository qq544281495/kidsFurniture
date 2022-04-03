'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  
  async home() {
    await this.ctx.render('index/index.js');
  }
};