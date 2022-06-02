CREATE TABLE `address` (
  `addressId` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(255) DEFAULT NULL,
  `userName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userPhone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userAddress` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `addressJudg` int(255) DEFAULT NULL,
  PRIMARY KEY (`addressId`),
  KEY `userId` (`userId`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;