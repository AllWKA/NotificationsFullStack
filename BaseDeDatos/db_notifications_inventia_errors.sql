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
-- Table structure for table `errors`
--

DROP TABLE IF EXISTS `errors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `errors` (
  `iderrors` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `desc` varchar(300) NOT NULL,
  PRIMARY KEY (`iderrors`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `errors`
--

LOCK TABLES `errors` WRITE;
/*!40000 ALTER TABLE `errors` DISABLE KEYS */;
INSERT INTO `errors` VALUES (1,'success',''),(2,'messaging/invalid-argument',''),(3,'messaging/invalid-recipient',''),(4,'messaging/invalid-payload',''),(5,'messaging/invalid-data-payload-key',''),(6,'messaging/payload-size-limit-exceeded',''),(7,'messaging/invalid-options',''),(8,'messaging/invalid-registration-token',''),(9,'messaging/registration-token-not-registered','The provided registration token is not registered. A previously valid registration token can be unregistered for a variety of reasons. See the error documentation for more details. Remove this registration token and stop using it to send messages.'),(10,'messaging/invalid-package-name',''),(11,'message-rate-exceeded',''),(12,'messaging/device-message-rate-exceeded',''),(13,'messaging/topics-message-rate-exceeded',''),(14,'messaging/too-many-topics',''),(15,'messaging/invalid-apns-credentials',''),(16,'messaging/mismatched-credential',''),(17,'messaging/authentication-error',''),(18,'messaging/server-unavailable',''),(19,'messaging/internal-error',''),(20,'messaging/unknown-error','');
/*!40000 ALTER TABLE `errors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-26 15:09:20
