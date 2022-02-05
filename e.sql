-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2022 at 11:38 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ems`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `leave_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `emp_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`leave_id`, `start_date`, `end_date`, `status`, `emp_id`) VALUES
(59, '2022-01-19', '2022-01-30', 'approach', 60),
(200, '2022-01-17', '2022-01-21', 'onleave', 57),
(201, '2022-01-17', '2022-01-21', 'onleave', 58),
(202, '2022-01-17', '2022-01-19', 'onleave', 62),
(203, '2022-01-30', '2022-01-10', 'approach', 61);

--
-- Triggers `attendance`
--
DELIMITER $$
CREATE TRIGGER `ls` AFTER INSERT ON `attendance` FOR EACH ROW update 
employee set leave_status = new.leave_id where new.emp_id = id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int(11) NOT NULL,
  `dept_name` varchar(50) DEFAULT NULL,
  `mgr_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`, `mgr_id`) VALUES
(300, 'Technical', 58),
(301, 'sales', 57),
(302, 'Teacher', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `did` int(11) NOT NULL,
  `des_name` varchar(50) DEFAULT NULL,
  `sal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`did`, `des_name`, `sal`) VALUES
(500, 'ai engineer', 1800),
(501, 'webdev', 1600),
(502, 'dbms expert', 1200);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `role` int(11) DEFAULT NULL,
  `bonus` int(11) DEFAULT NULL,
  `total_salary` int(11) DEFAULT NULL,
  `leave_status` int(11) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `Name`, `role`, `bonus`, `total_salary`, `leave_status`, `dept_id`) VALUES
(57, 'Anjali', 501, 500, 2100, 200, 300),
(58, 'Raj', 500, 1000, 2800, 201, 301),
(60, 'Luqmaan', 501, 800, 2400, 59, 301),
(61, 'Zakriah', 500, 300, 2100, 203, 300),
(62, 'karteek', NULL, 600, NULL, 202, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `pid` int(11) NOT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `funds` int(11) DEFAULT NULL,
  `pname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`pid`, `dept_id`, `funds`, `pname`) VALUES
(800, 300, 2000, 'IOT'),
(801, 302, 2000, 'Car price prediction');

-- --------------------------------------------------------

--
-- Table structure for table `works_on`
--

CREATE TABLE `works_on` (
  `id` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `hours` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `works_on`
--

INSERT INTO `works_on` (`id`, `pid`, `hours`) VALUES
(57, 800, 9),
(58, 800, 9),
(61, 800, 6),
(62, 801, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`leave_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`),
  ADD KEY `mgr_id` (`mgr_id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leave_status` (`leave_status`),
  ADD KEY `role` (`role`),
  ADD KEY `employee_ibfk_6` (`dept_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `project_ibfk_2` (`dept_id`);

--
-- Indexes for table `works_on`
--
ALTER TABLE `works_on`
  ADD PRIMARY KEY (`id`,`pid`),
  ADD KEY `pid` (`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`mgr_id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`role`) REFERENCES `designation` (`did`) ON DELETE CASCADE,
  ADD CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`leave_status`) REFERENCES `attendance` (`leave_id`),
  ADD CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`role`) REFERENCES `designation` (`did`) ON DELETE CASCADE,
  ADD CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `employee_ibfk_6` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON UPDATE CASCADE;

--
-- Constraints for table `works_on`
--
ALTER TABLE `works_on`
  ADD CONSTRAINT `works_on_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `project` (`pid`) ON DELETE CASCADE,
  ADD CONSTRAINT `works_on_ibfk_2` FOREIGN KEY (`id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


alter table attendance  ADD CONSTRAINT FOREIGN KEY (`emp_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE;

create table works_on(id int,pid int,hours int,foreign key(id) REFERENCES employee(id) ON DELETE CASCADE, foreign key(pid) REFERENCES project(pid) ON DELETE CASCADE);
