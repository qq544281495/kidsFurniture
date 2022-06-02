CREATE TABLE `carousel` (
  `carouselId` int(255) NOT NULL,
  `carouselUrl` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `goodsId` int(255) NOT NULL,
  PRIMARY KEY (`carouselId`),
  KEY `goodsId` (`goodsId`),
  CONSTRAINT `carousel_ibfk_1` FOREIGN KEY (`goodsId`) REFERENCES `goods` (`goodsid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;