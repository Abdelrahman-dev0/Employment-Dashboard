-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2023 at 06:58 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employment-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `offer` decimal(10,2) NOT NULL,
  `max_candidate_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `position`, `description`, `offer`, `max_candidate_number`) VALUES
(42, 'Android Developer', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 19),
(43, 'Full Stack Developer', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 7),
(44, 'Full Stack Developer', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 8),
(45, 'Tester Developer', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 7),
(46, 'Software Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 9),
(47, 'Software Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 10),
(48, 'Software Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 9),
(49, 'Software Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 9),
(50, 'aaaaaaaaaaaaaaaaaaaaaaaasasasa', 'sasasasassssssssssssssssssssssssssssssssssssssssssssssssssssss', '3000.00', 0),
(53, 'Gaming Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 10),
(54, 'Gaming Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 10),
(55, 'Test Job Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 9),
(56, 'Demo Devloper', 'Any valid descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription', '4000.00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `job_qualifications`
--

CREATE TABLE `job_qualifications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `qualification_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_qualifications`
--

INSERT INTO `job_qualifications` (`id`, `job_id`, `qualification_id`) VALUES
(123, 42, 4),
(97, 43, 5),
(98, 43, 8),
(99, 44, 5),
(100, 44, 8),
(101, 45, 5),
(102, 45, 8),
(103, 46, 5),
(104, 46, 8),
(105, 47, 5),
(106, 47, 8),
(107, 48, 5),
(108, 48, 8),
(117, 50, 5),
(118, 50, 6),
(119, 50, 7),
(130, 54, 5),
(131, 54, 8),
(132, 55, 5),
(133, 55, 8),
(134, 56, 5),
(135, 56, 8);

-- --------------------------------------------------------

--
-- Table structure for table `qualifications`
--

CREATE TABLE `qualifications` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qualifications`
--

INSERT INTO `qualifications` (`id`, `description`) VALUES
(4, 'Hello, World !1231'),
(5, 'Hello, World !'),
(6, 'Hello, World !'),
(7, 'Hello, World !'),
(8, 'Hello, World !'),
(9, 'Hello, World !'),
(10, 'Hello, World !'),
(11, 'Hello, World !'),
(12, 'Hello, World !'),
(13, 'ssssssssssssssssssssssssssssssssssssss'),
(16, 'Test api create'),
(17, 'Test api create1'),
(21, 'Test api create1'),
(22, 'Test api create1'),
(23, 'Test api create1'),
(24, 'Test api create1'),
(25, 'Test api create1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> in-active\r\n1 -> active',
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> Applicant user\r\n1-> Admin user',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `status`, `type`, `token`) VALUES
(1, 'Ezio Auditore', 'admin@gmail.com', '12345678910', '$2b$10$v4aeMDQWhLd7hFDCewh3rOrWEKpbWBe12qG2MySQQSJoueLLXqIfe', 1, 1, '83dbcf9d38c2c2da0f77b6d62400b59c'),
(2, 'user one 113', 'user1@gmail.com', '12345678910', '$2b$10$OPFERpRaEFZr/xrxjHxFdOd6UUyXx58nh9xmqipODvAaFn7OyXlOq', 0, 0, 'ce1f178e60cbedf19fdea78b405211d9'),
(3, 'user one 2', 'user2@gmail.com', '12345678910', '$2b$10$kB4BCoD8AstWRvQOiPvB6ewmXYfwSLQjET6wgG1caMYOVdomrPBFm', 1, 0, 'b2b09210cbc414e654c979754a524503'),
(4, 'user one 3', 'user3@gmail.com', '12345678910', '$2b$10$bh8ixhhKhojg0EVGE3kqd.6WX7lZ6KZPQwgMOHCk6yakrKLy4nJUu', 0, 0, '0d33c7e57f11b038d4e44889653061b9'),
(5, 'user one 4', 'user4@gmail.com', '12345678910', '$2b$10$hCNdDq/REN3sR9bcIAkaiuZ97psslvISnMyKOu7nTLiWc3u8hEzO6', 0, 0, 'af02c32bca43196db3816ba2c62eb551'),
(6, 'user one 5', 'user5@gmail.com', '12345678910', '$2b$10$rskPGL4gg9RmdzD1t2jNMuR6tDzk0lAc7bna0nUBmzAfFgxwnxqqO', 1, 0, '57d24aa694dcd3fbd5e8e20409098dab'),
(7, 'user one 6', 'user6@gmail.com', '12345678910', '$2b$10$YStQWJZg8jM5cE97OExrzelKvgzDSqnAwaC5YcGfy6q072CI.onwS', 0, 0, '173f3a43d828e0347fc3882ba15b3d88'),
(8, 'user one 7', 'user7@gmail.com', '12345678910', '$2b$10$Bowf6R8wFqQldQejoX72Y.yX9lLhEnH0A7uc5twriHDkifxgakSq6', 0, 0, '7cee70d3eaa94e29c7fef03f4ec3d179'),
(9, 'user one 8', 'user8@gmail.com', '12345678910', '$2b$10$sgJgkLzcFHEw.5OZwoYj1u/Wi67.fmgey06g7A47sFIr73uU/HV4W', 0, 0, '3e3ce0eb505e8f32e64523eb2883aaa7'),
(10, 'user one 9', 'user9@gmail.com', '12345678910', '$2b$10$CYzER61ZhMRnIXd9Se/JZelCc2TIZkowaemzxKJhIKVkYTpNr3ksi', 0, 0, 'fc1a7b02c6f81f114650cd25b9e490ca'),
(11, 'user one 10', 'user10@gmail.com', '12345678910', '$2b$10$sANeHQc/eUrpzdqx/dRNQu.32E9bSIKH5LY5k4aZ3PYVRN/1Am5Iq', 1, 0, 'e4549b6b65cb786871b6b804af44f00c'),
(12, 'user one test', 'usertest@gmail.com', '12345678910', '$2b$10$A7Towh7TGT2A1BSw90skmevh53DMwjsBQJ5salvN5oRtZzHYVYazq', 0, 0, '2f2b99b578f81b38d6f96d51679db2f8'),
(13, 'Ezio Auditore', 'user3000@gmail.com', '12345678900', '$2b$10$bXI7tAWvs9LT7o.BC6pbquaFulkEacZV3iw1a5wxINOpLrY/ef0Re', 1, 0, '334fae76a8895b3d906efcb25090b504'),
(16, 'sqsqsqsqssq', 'qsqsqsqs@gmail.com', '1212121212', '$2b$10$GDNbKN.f/B.Y0.ofg3EY8uGsDMQVd.nkzKKDXDPnw/xcqci6p.ns.', 0, 0, 'e7c51abd787f78710d1ccfc559c8ae10'),
(17, 'asdfvbnmivxvx', 'asasasa@gmail.com', '121212121', '$2b$10$mZjDNOxDAHxVZcvigvFiuOqNt5mRQEQxRN.tpK/FOsPtE.SuFFmLK', 0, 0, 'cebd130df866fc7419193953f4e73476'),
(18, 'Mohamed ahmed', 'user1232@gmail.com', '036649494102020', '$2b$10$msiwEyX0fdwCQWFH7WfO3uyrErd4EpS3UTnFLsNDjeF0WTqeOEV/6', 1, 0, '7b70295e516958826644ffc83648b900'),
(19, 'user one test1', 'usertest1@gmail.com', '12345678910', '$2b$10$kuh8ylnJz7CWNw9ugZAruuAhhC3WDL.ggkAPkQ7QMJvxiWs.tj8uK', 0, 0, 'db24ef90e6fc529fd23ea2811bd929e2'),
(20, 'user one test2', 'usertest2@gmail.com', '12345678910', '$2b$10$NMJibVJIpr5STiIT3SjLDu5VcE98oCRTWksQPZQbjNzeKdGf5hNGO', 0, 0, '611047b2ed50165236a09fcddf243317'),
(21, 'user one test3', 'usertest3@gmail.com', '12345678910', '$2b$10$hKNrLXuvXLLvimKIcdbtH.n/AEEadi2.GYmgOBXWfYrUkgLnkUjYG', 0, 0, '8e58ac167f7b070d940848e68d4bd529');

-- --------------------------------------------------------

--
-- Table structure for table `user_requests`
--

CREATE TABLE `user_requests` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT '"Pending"',
  `requested_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_requests`
--

INSERT INTO `user_requests` (`id`, `job_id`, `user_id`, `status`, `requested_time`) VALUES
(158, 56, 11, 'Accepted', '2023-04-28 00:12:34'),
(159, 56, 12, 'Accepted', '2023-04-28 00:12:45'),
(161, 56, 5, 'Declined', '2023-04-28 00:12:45'),
(164, 44, 6, 'pending', '2023-04-29 13:48:19'),
(167, 42, 13, 'Accepted', '2023-04-29 15:51:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_search_history`
--

CREATE TABLE `user_search_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `search_text` varchar(255) NOT NULL,
  `search_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_search_history`
--

INSERT INTO `user_search_history` (`id`, `user_id`, `job_id`, `search_text`, `search_time`) VALUES
(136, 3, 42, 'Android Developer', '2023-04-21 18:22:32'),
(137, 18, 42, 'Android Developer', '2023-04-21 18:23:40'),
(138, 13, 42, 'Android Developer', '2023-04-21 19:11:26'),
(139, 13, 45, 'Tester Developer', '2023-04-22 18:56:21'),
(140, 13, 45, 'Tester', '2023-04-22 21:13:13'),
(141, 13, 42, '4000', '2023-04-22 21:16:11'),
(142, 13, 42, '0', '2023-04-22 21:16:19'),
(143, 13, 44, '9', '2023-04-22 21:16:35'),
(144, 13, 50, '3000', '2023-04-22 21:16:40'),
(145, 13, 42, 'Android', '2023-04-24 01:22:51'),
(146, 13, 43, 'Full Stack', '2023-04-24 01:23:28'),
(147, 13, 43, 'full stack', '2023-04-24 01:23:46'),
(148, 13, 50, 'aaaaaaaaaaaaaaaaaaaaaaqsqsq', '2023-04-28 01:16:33'),
(149, 13, 50, 'movies', '2023-04-28 01:16:42'),
(150, 13, 50, 'movies', '2023-04-28 01:16:43'),
(151, 13, 50, 'movies', '2023-04-28 01:16:44'),
(152, 13, 50, 'movies', '2023-04-28 01:16:45'),
(153, 13, 50, 'movies', '2023-04-28 01:16:45'),
(154, 13, 50, 'movies', '2023-04-28 01:16:45'),
(155, 13, 50, 'movies', '2023-04-28 01:16:46'),
(156, 13, 50, 'movies', '2023-04-28 01:16:46'),
(157, 13, 50, 'z', '2023-04-28 01:17:08'),
(158, 13, 43, '7', '2023-04-28 01:17:42'),
(161, 13, 46, 'Software Devloper', '2023-04-29 14:02:38'),
(162, 13, 46, 'Software', '2023-04-29 14:02:52'),
(163, 13, 46, 'Software', '2023-04-29 14:02:57'),
(164, 6, 50, 'Android Devloper', '2023-04-29 14:12:10'),
(165, 13, 50, 'Android Devloper', '2023-04-29 14:12:40'),
(166, 13, 46, 'Software Devloper', '2023-04-29 14:16:05'),
(167, 13, 50, 'Software', '2023-04-29 14:16:16'),
(168, 13, 46, 'Software', '2023-04-29 14:16:36'),
(169, 13, 46, 'software', '2023-04-29 14:16:46'),
(170, 13, 46, 'software', '2023-04-29 14:19:42'),
(171, 13, 50, 'software', '2023-04-29 14:21:16'),
(172, 13, 46, 'software Devloper', '2023-04-29 14:21:21'),
(173, 13, 50, '3000', '2023-04-29 14:21:29'),
(174, 13, 43, '7', '2023-04-29 14:21:37'),
(175, 13, 43, 'Full Stack Developer', '2023-04-29 14:22:25'),
(176, 13, 50, 'Demo Devloper', '2023-04-29 14:22:33'),
(177, 13, 50, 'aaaaaaaaaaaaaaaaaaaaaaaasasasa', '2023-04-29 14:22:40'),
(178, 13, 46, 'Software Devloper', '2023-04-29 14:23:32'),
(179, 13, 46, 'Software Devloper', '2023-04-29 14:24:31'),
(180, 13, 50, '3000', '2023-04-29 14:25:06'),
(181, 13, 50, 'Demo Devloper', '2023-04-29 14:25:13'),
(182, 13, 50, 'Demo Devloper', '2023-04-29 14:25:21'),
(183, 13, 50, 'Demo Devloper', '2023-04-29 14:27:22'),
(184, 13, 50, 'Demo Devloper', '2023-04-29 14:27:28'),
(185, 13, 50, 'Demo Devloper', '2023-04-29 14:27:44'),
(186, 13, 50, 'Demo Devloper', '2023-04-29 14:30:24'),
(187, 13, 50, 'Demo Devloper', '2023-04-29 14:30:25'),
(188, 13, 42, 'Android Developer', '2023-04-29 14:30:32'),
(189, 13, 56, 'Demo Devloper', '2023-04-29 14:33:45'),
(190, 13, 50, 'Demo Devloper', '2023-04-29 14:35:17'),
(191, 13, 50, 'Demo Devloper', '2023-04-29 14:37:14'),
(192, 13, 56, 'Demo Devloper', '2023-04-29 14:37:25'),
(193, 13, 50, 'Demo Devloper', '2023-04-29 14:39:37'),
(194, 13, 56, 'Demo Devloper', '2023-04-29 14:40:24'),
(195, 13, 42, 'Android Developer', '2023-04-29 14:40:33'),
(196, 13, 46, 'Software Devloper', '2023-04-29 14:40:42'),
(197, 13, 43, '7', '2023-04-29 14:40:46'),
(198, 13, 46, '9', '2023-04-29 14:40:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_qualifications`
--
ALTER TABLE `job_qualifications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_id_2` (`job_id`,`qualification_id`),
  ADD KEY `job_id` (`job_id`) USING BTREE,
  ADD KEY `qualification_id` (`qualification_id`) USING BTREE;

--
-- Indexes for table `qualifications`
--
ALTER TABLE `qualifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_requests`
--
ALTER TABLE `user_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_id` (`job_id`,`user_id`),
  ADD KEY `fk_user_req` (`user_id`);

--
-- Indexes for table `user_search_history`
--
ALTER TABLE `user_search_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_job_const` (`job_id`),
  ADD KEY `fk_user_const` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `job_qualifications`
--
ALTER TABLE `job_qualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `qualifications`
--
ALTER TABLE `qualifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_requests`
--
ALTER TABLE `user_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `user_search_history`
--
ALTER TABLE `user_search_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `job_qualifications`
--
ALTER TABLE `job_qualifications`
  ADD CONSTRAINT `job_const4_id` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `qualification_const_id` FOREIGN KEY (`qualification_id`) REFERENCES `qualifications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_requests`
--
ALTER TABLE `user_requests`
  ADD CONSTRAINT `fk_job_req` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_req` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_search_history`
--
ALTER TABLE `user_search_history`
  ADD CONSTRAINT `fk_job_const` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_const` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
