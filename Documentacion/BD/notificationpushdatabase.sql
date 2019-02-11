-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-02-2019 a las 21:37:05
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
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(10) NOT NULL,
  `discriminator` int(5) NOT NULL DEFAULT '1',
  `userName` varchar(25) COLLATE latin1_spanish_ci NOT NULL,
  `password` varchar(30) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adminapp`
--

CREATE TABLE `adminapp` (
  `adminID` int(10) NOT NULL,
  `appID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `app`
--

CREATE TABLE `app` (
  `idApp` int(10) NOT NULL,
  `appName` varchar(35) COLLATE latin1_spanish_ci NOT NULL,
  `tokenApp` varchar(35) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientapp`
--

CREATE TABLE `clientapp` (
  `idClient` int(10) NOT NULL,
  `userName` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `password` varchar(35) COLLATE latin1_spanish_ci NOT NULL,
  `appID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `device`
--

CREATE TABLE `device` (
  `clientID` int(10) NOT NULL,
  `so` tinyint(4) NOT NULL,
  `tokenDevice` varchar(35) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `userName` (`userName`);

--
-- Indices de la tabla `adminapp`
--
ALTER TABLE `adminapp`
  ADD KEY `FK_adminID` (`adminID`),
  ADD KEY `FK_AplicacionID_Admin` (`appID`);

--
-- Indices de la tabla `app`
--
ALTER TABLE `app`
  ADD PRIMARY KEY (`idApp`),
  ADD UNIQUE KEY `appName` (`appName`),
  ADD UNIQUE KEY `tokenApp` (`tokenApp`);

--
-- Indices de la tabla `clientapp`
--
ALTER TABLE `clientapp`
  ADD PRIMARY KEY (`idClient`),
  ADD KEY `FK_appID` (`appID`);

--
-- Indices de la tabla `device`
--
ALTER TABLE `device`
  ADD KEY `FK_ClienteID` (`clientID`),
  ADD KEY `FK_AplicacionID` (`so`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `app`
--
ALTER TABLE `app`
  MODIFY `idApp` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientapp`
--
ALTER TABLE `clientapp`
  MODIFY `idClient` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adminapp`
--
ALTER TABLE `adminapp`
  ADD CONSTRAINT `FK_AplicacionID_Admin` FOREIGN KEY (`appID`) REFERENCES `app` (`idApp`),
  ADD CONSTRAINT `FK_adminID` FOREIGN KEY (`adminID`) REFERENCES `admin` (`idAdmin`);

--
-- Filtros para la tabla `clientapp`
--
ALTER TABLE `clientapp`
  ADD CONSTRAINT `FK_appID` FOREIGN KEY (`appID`) REFERENCES `app` (`idApp`);

--
-- Filtros para la tabla `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `FK_ClienteID` FOREIGN KEY (`clientID`) REFERENCES `clientapp` (`idClient`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
