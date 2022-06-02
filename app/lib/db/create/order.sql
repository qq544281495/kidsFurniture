CREATE TABLE `order` (
  `orderId` int(255) NOT NULL AUTO_INCREMENT,
  `addressInfo` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `goodsInfo` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `orderPrice` int(10) DEFAULT NULL,
  `userId` int(255) DEFAULT NULL,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;