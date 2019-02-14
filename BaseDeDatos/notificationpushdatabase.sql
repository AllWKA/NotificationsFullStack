-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2019 a las 18:37:37
-- Versión del servidor: 10.1.32-MariaDB
-- Versión de PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `notificationpushdatabase`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aplication`
--

CREATE TABLE `aplication` (
  `idAplication` int(10) NOT NULL,
  `aplicationName` varchar(30) NOT NULL,
  `tokenAplication` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `idUser` int(10) NOT NULL,
  `userName` varchar(30) DEFAULT NULL,
  `gmail` varchar(45) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `discriminator` int(3) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `useraplication`
--

CREATE TABLE `useraplication` (
  `userID` int(10) NOT NULL,
  `aplicationID` int(10) NOT NULL,
  `deviceToken` varchar(100) NOT NULL,
  `so` enum('android','ios','web') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aplication`
--
ALTER TABLE `aplication`
  ADD PRIMARY KEY (`idAplication`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- Indices de la tabla `useraplication`
--
ALTER TABLE `useraplication`
  ADD KEY `FK_userID` (`userID`),
  ADD KEY `FK_AplicacionID` (`aplicationID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aplication`
--
ALTER TABLE `aplication`
  MODIFY `idAplication` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `useraplication`
--
ALTER TABLE `useraplication`
  ADD CONSTRAINT `FK_AplicacionID` FOREIGN KEY (`aplicationID`) REFERENCES `aplication` (`idAplication`),
  ADD CONSTRAINT `FK_userID` FOREIGN KEY (`userID`) REFERENCES `user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
