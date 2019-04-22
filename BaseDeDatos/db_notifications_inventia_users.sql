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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `applicationName` varchar(45) NOT NULL,
  `userName` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`idUser`,`email`,`applicationName`),
  KEY `fk_applicationName_idx` (`applicationName`),
  KEY `fk_application_user_idx` (`applicationName`),
  CONSTRAINT `fk_application_user` FOREIGN KEY (`applicationName`) REFERENCES `applications` (`applicationName`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'bryan@gmail.com','SuperApp','bryan','$2a$10$EjebcxXW0sAqWRwNxBTNB.qihNxzob93mqr5lS0izcmOApbAJI/Ce','2019-03-29 09:46:24','2019-03-29 12:17:08'),(17,'bryan@gmail.com','SuperApp','bryan','$2a$10$EjebcxXW0sAqWRwNxBTNB.qihNxzob93mqr5lS0izcmOApbAJI/Ce','2019-03-29 12:09:58','2019-03-29 12:17:08'),(19,'fallo1@gmail.com','SuperApp','fallo1','$2a$10$XR1Uu/14VubZBpKp3/kVT.tnIY8SNeWQtUWI/xRuRkHAzkyFBmDzC','2019-04-02 13:30:52','2019-04-02 13:30:52'),(20,'fallo2@gmail.com','SuperApp','fallo2','$2a$10$w10GEsuK9RLQtV9JfjMYReVb2RHW.SMO/6qpGq8fR2nflCgyWnrdi','2019-04-02 13:30:57','2019-04-02 13:30:57'),(21,'fallo3@gmail.com','SuperApp','fallo3','$2a$10$f4IFaeXoQKYostLUpHChkOOM1SpHrmTiQhB/XTuhHC4xWnz93MpZm','2019-04-02 13:31:02','2019-04-02 13:31:02'),(22,'bryan@gmail.com','SuperApp','Bryan','$2a$10$kX..0Qodo4qtVhfcFhUp0uKiJIhWp0.3/Ra9qdtVK228pEDbs2ZAa','2019-04-11 10:16:11','2019-04-11 10:16:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-22 15:54:43
