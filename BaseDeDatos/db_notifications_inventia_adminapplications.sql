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
-- Table structure for table `adminapplications`
--

DROP TABLE IF EXISTS `adminapplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `adminapplications` (
  `adminID` int(10) NOT NULL,
  `applicationID` int(10) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`adminID`,`applicationID`),
  KEY `FK_AplicationID_Adm_idx` (`applicationID`),
  CONSTRAINT `FK_AplicationID_Adm` FOREIGN KEY (`applicationID`) REFERENCES `applications` (`idApplication`) ON DELETE CASCADE,
  CONSTRAINT `fk_admin_application` FOREIGN KEY (`adminID`) REFERENCES `admins` (`idAdmin`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminapplications`
--

LOCK TABLES `adminapplications` WRITE;
/*!40000 ALTER TABLE `adminapplications` DISABLE KEYS */;
INSERT INTO `adminapplications` VALUES (2,1,'2019-03-26 13:03:07','2019-03-26 13:03:07'),(2,3,'2019-03-26 08:41:03','2019-03-26 08:41:03'),(2,4,'2019-03-26 08:36:03','2019-03-26 08:36:03'),(2,10,'2019-03-26 13:03:05','2019-03-26 13:03:05'),(2,11,'2019-03-28 11:18:27','2019-03-28 11:18:27'),(2,12,'2019-04-11 10:36:25','2019-04-11 10:36:25'),(2,14,'2019-04-11 10:38:18','2019-04-11 10:38:18'),(2,16,'2019-04-11 10:38:46','2019-04-11 10:38:46'),(40,1,'2019-04-11 10:19:52','2019-04-11 10:19:52'),(42,1,'2019-04-11 10:21:18','2019-04-11 10:21:18'),(43,1,'2019-04-11 10:22:20','2019-04-11 10:22:20');
/*!40000 ALTER TABLE `adminapplications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-22 15:54:47
