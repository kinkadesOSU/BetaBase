-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 07, 2021 at 09:35 PM
-- Server version: 10.4.18-MariaDB-log
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_kinkades`
--
-- CREATE DATABASE IF NOT EXISTS `cs340_kinkades` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- USE `cs340_kinkades`;

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` float(7,4) DEFAULT NULL,
  `longitude` float(7,4) DEFAULT NULL,
  `stateID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `name`, `latitude`, `longitude`, `stateID`) VALUES
(3, 'Black Bear Buttress', 40.7410, 73.9890, 1),
(4, 'Lower Tier', 41.7410, 75.9890, 2),
(5, 'Sheepshead Dome', 33.1190, 43.0980, 2);

-- --------------------------------------------------------

--
-- Table structure for table `gyms`
--

CREATE TABLE `gyms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `stateID` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `cost` float(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gyms`
--

INSERT INTO `gyms` (`id`, `name`, `city`, `stateID`, `address`, `cost`) VALUES
(1, 'Climb to the Top', 'Madison', 3, '123 Cheese Circle', 14.00),
(2, 'Rocks and Ropes', 'Tucson', 2, '330 S Toole Ave', 16.00),
(3, 'Inner Peaks', 'Charlotte', 1, '532 N Rocky Road', 20.25);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `areaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `name`, `grade`, `description`, `areaID`) VALUES
(1, 'Hard Route A', '5.13', 'See name', 3),
(2, 'Hard Route B', '5.14', 'Even harder', 5),
(4, 'Test', '5.5', 'Testtstst', 5),
(5, 'Test More', '5.13', 'TestTestTest', 4);

-- --------------------------------------------------------

--
-- Table structure for table `routes_styles`
--

CREATE TABLE `routes_styles` (
  `id` int(11) NOT NULL,
  `routeID` int(11) NOT NULL,
  `styleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `routes_styles`
--

INSERT INTO `routes_styles` (`id`, `routeID`, `styleID`) VALUES
(5, 1, 6),
(6, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `stateName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `stateName`) VALUES
(1, 'North Carolina'),
(2, 'Arizona'),
(3, 'Wisconsin'),
(4, 'Alaska'),
(5, 'Florida');

-- --------------------------------------------------------

--
-- Table structure for table `styles`
--

CREATE TABLE `styles` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `styles`
--

INSERT INTO `styles` (`id`, `type`) VALUES
(4, 'Trad'),
(5, 'Bouldering'),
(6, 'Top-Rope'),
(7, 'Sport');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stateID` (`stateID`);

--
-- Indexes for table `gyms`
--
ALTER TABLE `gyms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stateID` (`stateID`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `areaID` (`areaID`);

--
-- Indexes for table `routes_styles`
--
ALTER TABLE `routes_styles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `routeID` (`routeID`),
  ADD KEY `styleID` (`styleID`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `styles`
--
ALTER TABLE `styles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gyms`
--
ALTER TABLE `gyms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `routes_styles`
--
ALTER TABLE `routes_styles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `styles`
--
ALTER TABLE `styles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `areas_ibfk_1` FOREIGN KEY (`stateID`) REFERENCES `states` (`id`);

--
-- Constraints for table `gyms`
--
ALTER TABLE `gyms`
  ADD CONSTRAINT `gyms_ibfk_1` FOREIGN KEY (`stateID`) REFERENCES `states` (`id`);

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`areaID`) REFERENCES `areas` (`id`);

--
-- Constraints for table `routes_styles`
--
ALTER TABLE `routes_styles`
  ADD CONSTRAINT `routes_styles_ibfk_1` FOREIGN KEY (`routeID`) REFERENCES `routes` (`id`),
  ADD CONSTRAINT `routes_styles_ibfk_2` FOREIGN KEY (`styleID`) REFERENCES `styles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
