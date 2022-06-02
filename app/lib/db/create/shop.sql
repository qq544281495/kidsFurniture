CREATE TABLE `shop` (
  `goodsId` int(255) NOT NULL,
  `userId` int(255) DEFAULT NULL,
  `goodsNum` int(255) DEFAULT NULL,
  PRIMARY KEY (`goodsId`),
  KEY `userId` (`userId`),
  CONSTRAINT `shop_ibfk_1` FOREIGN KEY (`goodsId`) REFERENCES `goods` (`goodsid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shop_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;