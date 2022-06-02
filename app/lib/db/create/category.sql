CREATE TABLE `category` (
  `categoryId` int(255) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`categoryId`),
  KEY `categoryId` (`categoryId`),
  KEY `categoryId_2` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;