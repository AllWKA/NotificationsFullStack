-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: db_notifications_inventia
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `devicetokens`
--

DROP TABLE IF EXISTS `devicetokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `devicetokens` (
  `userID` int(10) NOT NULL,
  `applicationID` int(10) NOT NULL,
  `deviceToken` varchar(500) NOT NULL,
  `so` enum('android','ios','web') NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`,`applicationID`,`deviceToken`),
  KEY `FK_AplicacionID_idx` (`applicationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicetokens`
--

LOCK TABLES `devicetokens` WRITE;
/*!40000 ALTER TABLE `devicetokens` DISABLE KEYS */;
INSERT INTO `devicetokens` VALUES (12,1,'cBCeHrzyXVM:APA91bHL187MLbgvAGHZsSsHZkJizDv4Wja9RiYLDzVKNUKVUl37JCLuhkQwGo-Pgy-biEOeLTu3MKTCFqohbg6f34rPTVP8AHw8r-p2ifc5XOTPE4RjISbPh5Q4P6HuUTbG5ZrC_3Ay','android',NULL,NULL),(17,1,'cBCeHrzyXVM:APA91bHL187MLbgvAGHZsSsHZkJizDv4Wja9RiYLDzVKNUKVUl37JCLuhkQwGo-Pgy-biEOeLTu3MKTCFqohbg6f34rPTVP8AHw8r-p2ifc5XOTPE4RjISbPh5Q4P6HuUTbG5ZrC_3Ay','android',NULL,NULL),(18,1,'cBCeHrzyXVM:APA91bHL187MLbgvAGHZsSsHZkJizDv4Wja9RiYLDzVKNUKVUl37JCLuhkQwGo-Pgy-biEOeLTu3MKTCFqohbg6f34rPTVP8AHw8r-p2ifc5XOTPE4RjISbPh5Q4P6HuUTbG5ZrC_3Ay','android',NULL,NULL),(19,1,'q','android',NULL,NULL),(20,1,'sdf','android',NULL,NULL),(21,1,'sdffsdfff','android',NULL,NULL);
/*!40000 ALTER TABLE `devicetokens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-22 15:54:42
