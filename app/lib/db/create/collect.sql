CREATE TABLE `collect` (
  `collectId` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) DEFAULT NULL,
  `goodsId` int(255) DEFAULT NULL,
  `goodsLike` int(255) DEFAULT NULL,
  PRIMARY KEY (`collectId`),
  KEY `userId` (`userId`),
  KEY `goodsId` (`goodsId`),
  CONSTRAINT `collect_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`),
  CONSTRAINT `collect_ibfk_2` FOREIGN KEY (`goodsId`) REFERENCES `goods` (`goodsid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;