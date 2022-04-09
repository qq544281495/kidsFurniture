'use strict';
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 首页请求接口
  router.get('/home/getCarousel', controller.home.getCarousel)
  router.get('/home/getHomeCategory', controller.home.getHomeCategory)
  // 商品页
  router.get('/goods', controller.goods.index)
  router.get('/goods/getGoodsList', controller.goods.getGoodsList)
  // 热销商品页
  router.get('/hot', controller.hot.index)
  router.get('/hot/getHotGoods', controller.hot.getHotGoods)
  // 新品商品页
  router.get('/new', controller.new.index)
  router.get('/new/getNewGoods', controller.new.getNewGoods)
};