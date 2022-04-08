'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.home.index);
  router.get('/home/getCarousel', controller.home.home.getCarousel)
  router.get('/home/getHomeCategory', controller.home.home.getHomeCategory)
};