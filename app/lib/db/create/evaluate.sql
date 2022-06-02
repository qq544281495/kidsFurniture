CREATE TABLE `evaluate` (
  `evaluateId` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) DEFAULT NULL,
  `goodsId` int(255) DEFAULT NULL,
  `evaluateInfo` longtext COLLATE utf8_unicode_ci,
  `date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`evaluateId`),
  KEY `userId` (`userId`),
  KEY `goodsId` (`goodsId`),
  CONSTRAINT `evaluate_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`),
  CONSTRAINT `evaluate_ibfk_2` FOREIGN KEY (`goodsId`) REFERENCES `goods` (`goodsid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;