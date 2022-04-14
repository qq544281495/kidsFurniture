'use strict';
module.exports = app => {
  const { router, controller, middleware } = app;
  // middleware.jwt(app.config.jwt)
  // 首页
  router.get('/', controller.home.index);
  // 用户中心
  router.get('/user', controller.user.index);
  router.get('/getUserInfo', controller.user.getUserInfo);
  router.post('/editUserInfo', controller.user.editUserInfo);
  router.get('/getUserAddress', controller.user.getUserAddress);
  router.post('/deleteAddress', controller.user.deleteAddress);
  router.post('/addAddress', controller.user.addAddress);
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
  // 商品详情页
  router.get('/details', controller.goods.details)
  router.get('/goods/getGoodsDetails', controller.goods.getGoodsDetails)
  router.get('/goods/getRelatedGoods', controller.goods.getRelatedGoods)
  router.post('/goods/addCollect', controller.goods.addCollect) // 添加收藏
  router.post('/goods/deleteCollect', controller.goods.deleteCollect) // 取消收藏
  router.post('/goods/getCollectStatus', controller.goods.getCollectStatus) // 获取商品收藏状态
  router.get('/goods/getEvaluate', controller.goods.getEvaluate) // 获取商品评价
  // 登录
  router.get('/login', controller.login.index)
  router.post('/loginVerify', controller.login.loginVerify)
  // 注册
  router.get('/register', controller.register.index)
  router.post('/addUserInfo', controller.register.addUserInfo)
  // 收藏页面
  router.get('/like', controller.like.index)
  router.post('/getUserAllCollect', controller.like.getUserAllCollect)
  // 购物车页面
  router.get('/shop', controller.shop.index)
  router.post('/addShopCart', controller.shop.addShopCart)
  router.post('/getUserShop', controller.shop.getUserShop)
  router.post('/changeShopNum', controller.shop.changeShopNum)
  router.post('/deleteShop', controller.shop.deleteShop)
  
  // 订单模块
  router.get('/order', controller.order.index)
  router.post('/getShopGoods', controller.order.getShopGoods)
  router.post('/getDefaultAddress', controller.order.getDefaultAddress)
  router.post('/buyGoods', controller.order.buyGoods)
  // 用户订单
  router.get('/userOrder', controller.order.userOrder)
  router.post('/getUserOrder', controller.order.getUserOrder)
  router.post('/setEvaluate', controller.order.setEvaluate)
};