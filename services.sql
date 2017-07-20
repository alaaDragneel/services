-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 20, 2017 at 09:47 PM
-- Server version: 10.1.24-MariaDB
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `services`
--
CREATE DATABASE IF NOT EXISTS `services` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `services`;

-- --------------------------------------------------------

--
-- Table structure for table `buys`
--

CREATE TABLE `buys` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `recive_id` int(10) UNSIGNED DEFAULT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `buy_price` int(11) NOT NULL,
  `finish` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buys`
--

INSERT INTO `buys` (`id`, `user_id`, `recive_id`, `order_id`, `buy_price`, `finish`, `created_at`, `updated_at`) VALUES
(14, 1, 2, 12, 45, 1, '2017-07-20 16:04:33', '2017-07-20 16:04:33');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Programmers', 'Programmers category', '2017-06-21 10:09:16', '2017-06-24 16:08:08'),
(2, 'Web Development', 'development category', '2017-06-21 10:09:16', '2017-07-12 21:11:44'),
(3, 'web design', 'web design category', '2017-06-21 10:09:16', '2017-06-21 10:09:16'),
(4, 'graphic design', 'graphic design category', '2017-06-21 10:09:16', '2017-06-21 10:09:16'),
(5, 'Mobiles', 'Mobiles category', '2017-06-24 16:06:19', '2017-06-24 16:06:19'),
(6, 'Laptops', 'Laptops category', '2017-06-24 16:06:19', '2017-06-24 16:06:19'),
(7, 'Programmers', 'Programmers category', '2017-06-21 10:09:16', '2017-06-24 16:08:08'),
(8, 'Development', 'development category', '2017-06-21 10:09:16', '2017-06-21 10:09:16'),
(9, 'web design', 'web design category', '2017-06-21 10:09:16', '2017-06-21 10:09:16'),
(10, 'graphic design', 'graphic design category', '2017-06-21 10:09:16', '2017-06-21 10:09:16'),
(11, 'Mobiles', 'Mobiles category', '2017-06-24 16:06:19', '2017-06-24 16:06:19'),
(12, 'Laptops', 'Laptops category', '2017-06-24 16:06:19', '2017-06-24 16:06:19');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `own_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `user_message_you` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `seen` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `title`, `message`, `user_message_you`, `user_id`, `seen`, `created_at`, `updated_at`) VALUES
(1, 'gsgsgsgsgsg', 'gsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsggsgsgsgsgsg', 1, 2, 1, '2017-06-21 09:59:11', '2017-07-07 14:42:09'),
(2, ',a fljs fjsdn lj,sdldjs dsl, ', 'ldnljdsngljdngljfgljdfngldsjngl', 2, 1, 0, '2017-06-21 09:59:42', '2017-07-04 14:53:01'),
(3, 'thanks', 'thanks for the service', 2, 1, 1, '2017-06-21 09:59:42', '2017-07-07 05:38:23'),
(4, 'Test The Notification ', 'Test The Notification For You See Now', 2, 1, 0, '2017-07-07 06:12:43', '2017-07-07 06:12:43'),
(5, '$message->save()', '$message->save()$message->save()$message->save()$message->save()', 2, 1, 1, '2017-07-07 06:17:06', '2017-07-07 16:46:13'),
(6, 'Test The New Notification', 'Test The New Notification For YOu', 2, 1, 1, '2017-07-07 06:17:36', '2017-07-07 16:14:36'),
(7, 'aaaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 2, 1, 0, '2017-07-07 06:19:28', '2017-07-07 06:19:28'),
(8, 'aaaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 2, 1, 1, '2017-07-07 06:19:51', '2017-07-07 16:49:26'),
(9, 'Test The Notification', 'Test The Notification For You', 2, 1, 1, '2017-07-07 06:20:44', '2017-07-07 06:21:16'),
(10, 'second Test For You Fuker', 'The Notification Test', 2, 1, 1, '2017-07-07 06:23:23', '2017-07-07 08:27:16'),
(11, 'Test Notification Again', 'Test Notification AgainTest Notification Again', 2, 1, 1, '2017-07-07 08:33:47', '2017-07-07 16:13:31'),
(12, 'test again and agaian', 'test again and agaiantest again and agaiantest again and agaian', 2, 1, 1, '2017-07-07 08:35:59', '2017-07-07 08:36:11'),
(13, 'test the Comment', 'test the Commenttest the Commenttest the Comment', 2, 1, 1, '2017-07-07 09:35:09', '2017-07-07 09:35:21'),
(14, 'test the Commenttest the Commenttest the Comment', 'test the Commenttest the Commenttest the Comment', 2, 1, 1, '2017-07-07 09:35:35', '2017-07-07 09:36:05'),
(15, 'wowowowowowo', 'wowowowowowowowowowowowowowowo', 2, 1, 1, '2017-07-07 11:42:07', '2017-07-07 11:42:50'),
(16, ';dkmfflmdflkmldmk', ';dkmfflmdflkmldmk;dkmfflmdflkmldmk;dkmfflmdflkmldmk;dkmfflmdflkmldmk', 2, 1, 1, '2017-07-07 12:21:07', '2017-07-07 12:49:29'),
(17, 'nonononononononono', 'nonononononononononononononononononononononononononononononononononononononononononononono', 2, 1, 1, '2017-07-07 12:50:06', '2017-07-07 12:58:08'),
(18, 'header-counterheader-counterheader-counter', 'header-counterheader-counterheader-counter', 2, 1, 1, '2017-07-07 12:58:23', '2017-07-07 12:58:49'),
(19, 'header-counterheader-counter', 'header-counterheader-counter', 2, 1, 1, '2017-07-07 12:58:30', '2017-07-07 12:58:58'),
(20, 'header-counter 2', 'header-counterheader-counter', 2, 1, 1, '2017-07-07 12:59:20', '2017-07-07 12:59:48'),
(21, 'header-counter', 'header-counterheader-counter', 2, 1, 1, '2017-07-07 12:59:26', '2017-07-07 12:59:58'),
(22, 'header-counterheader-counterheader-counterhead', 'header-counterheader-counterheader-counter', 2, 1, 1, '2017-07-07 13:07:20', '2017-07-07 13:07:45'),
(23, 'header-counter', 'header-counterheader-counter', 2, 1, 1, '2017-07-07 13:07:25', '2017-07-07 13:09:03'),
(24, 'header-counter', 'header-counterheader-counter', 2, 1, 1, '2017-07-07 13:07:31', '2017-07-07 13:09:00'),
(25, 'hasClass(\'seen\')hasClass(\'seen\')', 'hasClass(\'seen\')hasClass(\'seen\')', 2, 1, 1, '2017-07-07 13:15:15', '2017-07-07 13:19:28'),
(26, 'headerheaderheaderheader', 'headerheaderheaderheader', 2, 1, 1, '2017-07-07 13:19:55', '2017-07-07 13:23:23'),
(27, 'headerheaderheaderheaderheader', 'headerheaderheaderheaderheader', 2, 1, 1, '2017-07-07 13:20:01', '2017-07-07 13:23:33'),
(28, 'countercountercountercounter', 'countercountercounter', 2, 1, 1, '2017-07-07 13:22:56', '2017-07-07 13:23:28'),
(29, 'counter.html > 0counter.html > 0counter.html > 0', 'counter.html > 0counter.html > 0counter.html > 0', 2, 1, 1, '2017-07-07 13:25:49', '2017-07-07 13:26:46'),
(30, 'counter.html > 0counter.html > 0counter.html > 0', 'counter.html > 0counter.html > 0counter.html > 0', 2, 1, 1, '2017-07-07 13:25:56', '2017-07-07 13:26:29'),
(31, 'notification-real-linotification-real-li', 'notification-real-li', 2, 1, 1, '2017-07-07 13:49:06', '2017-07-07 14:43:36'),
(32, 'kjejlknlfnrlnlrnl', 'lsknvldfknvonlnrnklrnkjr', 2, 1, 1, '2017-07-07 14:58:35', '2017-07-07 14:59:32'),
(33, 'commentcommentcomment', 'commentcommentcomment', 1, 2, 1, '2017-07-07 15:18:15', '2017-07-07 15:19:03'),
(34, 'Hallow From The Fucking OPther Side', 'Hallow From The Fucking OPther Side', 1, 2, 0, '2017-07-07 15:40:21', '2017-07-07 15:40:21'),
(35, ',ajebfkebfkeb', 'kjbfkrjbgkrjbgkgrkjgr ', 2, 1, 1, '2017-07-11 05:58:42', '2017-07-11 06:52:57'),
(36, 'rojgnrognroingrio', 'rngngrirngoinoininroine', 2, 1, 0, '2017-07-11 07:16:43', '2017-07-11 07:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2017_06_09_222440_create_categories_table', 1),
('2017_06_09_222503_create_orders_table', 1),
('2017_06_09_222907_create_notifications_table', 1),
('2017_06_09_223126_create_messages_table', 1),
('2017_06_09_223144_create_services_table', 1),
('2017_06_09_223232_create_comments_table', 1),
('2017_06_09_223247_create_votes_table', 1),
('2017_06_12_112319_create_views_table', 1),
('2017_06_21_111207_create_favorites_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `notify_id` int(10) UNSIGNED NOT NULL,
  `type` varchar(30) NOT NULL,
  `user_notify_you` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `seen` tinyint(1) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notify_id`, `type`, `user_notify_you`, `user_id`, `seen`, `url`, `created_at`, `updated_at`) VALUES
(28, 3, 'AdminAccepted', 1, 2, 0, NULL, '2017-07-18 14:33:17', '2017-07-18 14:33:17'),
(29, 3, 'AdminAccepted', 1, 1, 0, NULL, '2017-07-18 14:33:17', '2017-07-18 14:33:17'),
(30, 2, 'AdminCompeleted', 1, 2, 1, NULL, '2017-07-18 14:33:32', '2017-07-18 14:46:18'),
(31, 2, 'AdminCompeleted', 1, 1, 1, NULL, '2017-07-18 14:33:32', '2017-07-18 14:46:48'),
(32, 1, 'AdminAccepted', 1, 2, 1, NULL, '2017-07-18 14:33:42', '2017-07-18 14:37:36'),
(33, 1, 'AdminAccepted', 1, 1, 0, NULL, '2017-07-18 14:33:43', '2017-07-18 14:33:43'),
(34, 1, 'AdminRejected', 1, 2, 1, NULL, '2017-07-18 14:35:02', '2017-07-18 14:37:36'),
(35, 1, 'AdminRejected', 1, 1, 0, NULL, '2017-07-18 14:35:02', '2017-07-18 14:35:02'),
(36, 2, 'RejectedService', 1, 2, 1, NULL, '2017-07-18 14:38:04', '2017-07-18 14:39:45'),
(37, 2, 'RecivedComment', 2, 1, 1, NULL, '2017-07-18 14:46:30', '2017-07-18 14:46:48'),
(38, 2, 'RecivedComment', 2, 1, 1, NULL, '2017-07-18 14:46:35', '2017-07-18 14:46:48'),
(39, 2, 'RecivedComment', 1, 2, 1, NULL, '2017-07-18 14:46:57', '2017-07-18 14:48:38'),
(40, 9, 'AcceptedService', 1, 2, 0, NULL, '2017-07-18 16:56:47', '2017-07-18 16:56:47'),
(41, 4, 'ReviceOrders', 1, 2, 0, NULL, '2017-07-20 06:52:43', '2017-07-20 06:52:43'),
(42, 5, 'ReviceOrders', 1, 2, 1, NULL, '2017-07-20 07:28:57', '2017-07-20 07:29:02'),
(43, 5, 'AcceptedOrder', 2, 1, 1, NULL, '2017-07-20 07:29:06', '2017-07-20 07:29:12'),
(44, 5, 'CompeleteOrder', 1, 2, 0, NULL, '2017-07-20 07:29:14', '2017-07-20 07:29:14'),
(45, 6, 'ReviceOrders', 2, 1, 1, NULL, '2017-07-20 13:11:47', '2017-07-20 13:11:59'),
(46, 6, 'AcceptedOrder', 1, 2, 1, NULL, '2017-07-20 13:12:01', '2017-07-20 13:12:12'),
(47, 6, 'CompeleteOrder', 2, 1, 1, NULL, '2017-07-20 13:12:14', '2017-07-20 13:12:24'),
(48, 7, 'ReviceOrders', 2, 1, 1, NULL, '2017-07-20 15:09:28', '2017-07-20 15:10:44'),
(49, 7, 'CompeleteOrder', 1, 2, 1, NULL, '2017-07-20 15:10:46', '2017-07-20 15:10:51'),
(50, 8, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 15:17:36', '2017-07-20 15:17:36'),
(51, 11, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 15:42:13', '2017-07-20 15:42:13'),
(52, 12, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 15:44:50', '2017-07-20 15:44:50'),
(53, 13, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 16:20:30', '2017-07-20 16:20:30'),
(54, 14, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 16:20:56', '2017-07-20 16:20:56'),
(55, 15, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 17:00:44', '2017-07-20 17:00:44'),
(56, 16, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 17:19:39', '2017-07-20 17:19:39'),
(57, 17, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 17:24:20', '2017-07-20 17:24:20'),
(58, 18, 'ReviceOrders', 2, 1, 0, NULL, '2017-07-20 18:13:51', '2017-07-20 18:13:51');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_order` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_order`, `service_id`, `user_id`, `type`, `status`, `created_at`, `updated_at`) VALUES
(10, 1, 6, 2, 0, 3, '2017-07-20 15:32:48', '2017-07-20 18:58:25'),
(11, 2, 4, 1, 0, 2, '2017-07-20 15:42:13', '2017-07-20 18:58:21'),
(12, 2, 7, 1, 0, 1, '2017-07-20 15:44:50', '2017-07-20 18:58:19'),
(18, 2, 4, 1, 0, 0, '2017-07-20 18:13:51', '2017-07-20 18:13:51'),
(19, 1, 6, 2, 0, 4, '2017-07-20 15:32:48', '2017-07-20 18:58:25');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pays`
--

CREATE TABLE `pays` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `payer_id` varchar(100) NOT NULL,
  `pay_id` varchar(100) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pays`
--

INSERT INTO `pays` (`id`, `user_id`, `payer_id`, `pay_id`, `payment_method`, `state`, `price`, `created_at`, `updated_at`) VALUES
(13, 2, '9VRG5V4BV2BXA', 'PAY-5YL608902L915971LLFYMOCQ', 'paypal', 'created', 5, '2017-07-20 15:07:21', '2017-07-20 15:07:21'),
(14, 2, '9VRG5V4BV2BXA', 'PAY-4UG45148TC344111WLFYMPBQ', 'paypal', 'created', 10, '2017-07-20 15:09:19', '2017-07-20 15:09:19');

-- --------------------------------------------------------

--
-- Table structure for table `profits`
--

CREATE TABLE `profits` (
  `id` int(11) NOT NULL,
  `profit_price` float NOT NULL,
  `website_profit` float NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `pay_id` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profits`
--

INSERT INTO `profits` (`id`, `profit_price`, `website_profit`, `user_id`, `pay_id`, `status`, `created_at`, `updated_at`) VALUES
(56, 43, 2, 2, NULL, 0, '2017-07-20 18:20:38', '2017-07-20 18:26:35');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `cat_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `views` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `description`, `cat_id`, `user_id`, `image`, `price`, `views`, `status`, `created_at`, `updated_at`) VALUES
(2, 'testtesttesttesttest', 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', 1, 2, 'images/services/17-06-21-12-11-30_f798c5b46ab407d1e842e37bba8d99165d46a5ad.jpg', 5, 0, 0, '2017-06-21 10:11:30', '2017-07-18 14:38:04'),
(3, 'first Services After update', '                                                                                                                                                                                                                                                                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dap After Updaye                             \r\n                                    \r\n                                    \r\n                                    \r\n                                    \r\n                                    \r\n                                    ', 2, 1, 'images/services/17-07-12-11-04-04_ec63d6ec92ee283426cfcdf8c7231c1ada776113.jpg', 30, 0, 1, '2017-06-21 10:14:05', '2017-07-18 03:36:25'),
(4, 'second services', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 3, 1, 'images/services/17-06-21-12-18-31_2bb70922ab645166835bc497e8e25469d8323c06.jpg', 10, 0, 1, '2017-06-21 10:18:31', '2017-07-12 21:17:52'),
(5, 'thired services updated', '                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n\r\n                                    ', 4, 1, 'images/services/17-06-21-12-19-05_d1cd89f8c33bc6056e73d934ff060bc32a40bfde.jpg', 15, 0, 0, '2017-06-21 10:19:05', '2017-07-12 21:20:17'),
(6, 'in the service', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\n\n', 3, 2, 'images/services/17-06-21-12-25-25_3aaf007736a3fe23b53eb4b91c0f14a69fbb6d57.jpg', 35, 0, 0, '2017-06-21 10:25:25', '2017-07-12 19:02:25'),
(7, 'test the service', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 6, 1, 'images/services/17-06-21-12-25-53_94850834230f0ee157f811ed9c6aba333c971595.jpg', 50, 0, 1, '2017-06-21 10:25:53', '2017-06-24 16:39:49'),
(8, 'play with us', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 1, 1, 'images/services/17-06-21-12-26-36_60e5f8e10b3e832ade9bed68e91192653b012227.jpg', 15, 0, 0, '2017-06-21 10:26:37', '2017-06-21 10:26:37'),
(9, 'testtesttesttesttest', 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', 2, 2, 'images/services/17-06-21-12-11-30_f798c5b46ab407d1e842e37bba8d99165d46a5ad.jpg', 5, 0, 1, '2017-06-21 10:11:30', '2017-07-18 16:56:46'),
(11, 'second services', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 4, 2, 'images/services/17-06-21-12-18-31_2bb70922ab645166835bc497e8e25469d8323c06.jpg', 10, 0, 1, '2017-06-21 10:18:31', '2017-06-24 16:40:07'),
(12, 'test new image size', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 6, 2, 'images/services/17-06-21-12-32-07_69a547acfd7f24e0276e38c6471d87cca3be9341.jpg', 25, 0, 1, '2017-06-21 10:32:08', '2017-06-24 16:48:24'),
(13, 'test the service', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 3, 1, 'images/services/17-06-21-12-25-53_94850834230f0ee157f811ed9c6aba333c971595.jpg', 50, 0, 1, '2017-06-21 10:25:53', '2017-06-24 16:39:49'),
(14, 'second services', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 3, 2, 'images/services/17-06-21-12-18-31_2bb70922ab645166835bc497e8e25469d8323c06.jpg', 10, 0, 1, '2017-06-21 10:18:31', '2017-06-24 16:40:07'),
(15, 'test new image size', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu\r\n\r\n', 3, 2, 'images/services/17-06-21-12-32-07_69a547acfd7f24e0276e38c6471d87cca3be9341.jpg', 25, 0, 1, '2017-06-21 10:32:08', '2017-06-24 16:48:24'),
(16, 'testtesttesttesttest', 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', 3, 2, 'images/services/17-06-21-12-11-30_f798c5b46ab407d1e842e37bba8d99165d46a5ad.jpg', 5, 0, 1, '2017-06-21 10:11:30', '2017-06-21 10:11:30'),
(20, 'this is my new service', '                                                                                                                                                                                                                                                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestt\r\n                                    \r\n                                    ', 2, 2, 'images/services/17-07-20-05-33-35_ec63d6ec92ee283426cfcdf8c7231c1ada776113.jpg', 40, 0, 1, '2017-06-21 10:11:30', '2017-07-20 03:33:35'),
(21, 'new service Last Service', 'new service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Servicenew service Last Service', 6, 2, 'images/services/17-07-20-09-32-12_60e5f8e10b3e832ade9bed68e91192653b012227.jpg', 20, 0, 0, '2017-07-20 19:32:12', '2017-07-20 19:32:12'),
(22, 'last time finally', 'last time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finally', 1, 2, 'images/services/17-07-20-09-33-41_fd855cfe5fcc2e450b54422f60ca2e4a0b277aab.png', 50, 0, 0, '2017-07-20 19:33:42', '2017-07-20 19:33:42'),
(23, 'wowowowowowowowowowowowowowowow', 'last time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finallylast time finally', 9, 2, 'images/services/17-07-20-09-34-10_2bb70922ab645166835bc497e8e25469d8323c06.jpg', 30, 0, 0, '2017-07-20 19:34:10', '2017-07-20 19:34:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `image` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `admin`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'alaaDragneel', 'alaa_dragneel@yahoo.com', '$2y$10$DP5fX54NsfPDjCvQN5Ln1eK1aqlCw8oSkaae7aSSdfJAnXKxVcaiG', 1, 'images/users/17-07-18-07-01-10_00a3d5c716852df06ad2c90658a767e29984ee1b.jpg', 'VRSMscAT7qAcC7smraefJYo3rws3Bd00cAxsHCHQCF0BAW8sEaidPJs0BfLT', '2017-06-21 09:38:08', '2017-07-18 17:01:11'),
(2, 'sasuke_alaa', 'moa_alaa@yahoo.com', '$2y$10$FzICbQpfxM0tpCDQpdU3TOpaMBdUdhDpesARSJD3mWJxGMrHlapIG', 0, 'images/users/17-07-20-05-51-06_c5105b750e70f4fac5376db6403f6e9bfc92f636.jpg', 'nRvPm9ywtbc5n8tWPwVNLDiGryPtm9wSzZaLxJlVbYCkbTx3CucBy1b3sbat', '2017-06-21 09:39:44', '2017-07-20 15:02:39');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `service_id`, `user_id`, `ip`, `created_at`, `updated_at`) VALUES
(9, 6, 1, '::1', '2017-06-24 16:40:54', '2017-06-24 16:40:54'),
(10, 6, 1, '::1', '2017-06-24 16:40:54', '2017-06-24 16:40:54'),
(11, 12, 1, '::1', '2017-06-24 16:48:45', '2017-06-24 16:48:45'),
(13, 12, 1, '127.0.0.1', '2017-06-29 04:13:54', '2017-06-29 04:13:54'),
(15, 6, 1, '::2', '2017-06-24 16:40:54', '2017-06-24 16:40:54'),
(16, 6, 1, '::3', '2017-06-24 16:40:54', '2017-06-24 16:40:54'),
(17, 12, 1, '::3', '2017-06-24 16:48:45', '2017-06-24 16:48:45'),
(19, 12, 1, '127.0.0.4', '2017-06-29 04:13:54', '2017-06-29 04:13:54'),
(20, 11, 1, '127.0.0.1', '2017-06-29 04:55:39', '2017-06-29 04:55:39'),
(21, 16, 1, '127.0.0.1', '2017-07-04 08:10:07', '2017-07-04 08:10:07'),
(22, 13, 2, '127.0.0.1', '2017-07-07 06:11:00', '2017-07-07 06:11:00'),
(23, 4, 2, '127.0.0.1', '2017-07-07 14:58:24', '2017-07-07 14:58:24'),
(25, 6, 1, '127.0.0.1', '2017-07-11 11:25:53', '2017-07-11 11:25:53'),
(26, 16, 0, '127.0.0.1', '2017-07-12 09:41:08', '2017-07-12 09:41:08');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(10) UNSIGNED NOT NULL,
  `vote` int(11) NOT NULL,
  `service_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `vote`, `service_id`, `user_id`, `created_at`, `updated_at`) VALUES
(43, 4, 11, 1, '2017-06-24 10:46:14', '2017-06-24 10:46:14'),
(44, 3, 16, 1, '2017-07-11 10:36:40', '2017-07-18 04:11:22'),
(48, 2, 16, 1, '2017-07-11 11:23:22', '2017-07-11 11:24:48'),
(49, 2, 6, 1, '2017-07-11 11:25:55', '2017-07-11 11:26:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buys`
--
ALTER TABLE `buys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `recive_id` (`recive_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_order_id_foreign` (`order_id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_service_id_foreign` (`service_id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_user_message_you_foreign` (`user_message_you`),
  ADD KEY `messages_user_id_foreign` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_notify_you_foreign` (`user_notify_you`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_order_foreign` (`user_order`),
  ADD KEY `orders_service_id_foreign` (`service_id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profits`
--
ALTER TABLE `profits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_cat_id_foreign` (`cat_id`),
  ADD KEY `services_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `views_service_id_foreign` (`service_id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_service_id_foreign` (`service_id`),
  ADD KEY `votes_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buys`
--
ALTER TABLE `buys`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `profits`
--
ALTER TABLE `profits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `buys`
--
ALTER TABLE `buys`
  ADD CONSTRAINT `buys_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buys_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `buys_ibfk_3` FOREIGN KEY (`recive_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_user_message_you_foreign` FOREIGN KEY (`user_message_you`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_user_notify_you_foreign` FOREIGN KEY (`user_notify_you`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_user_order_foreign` FOREIGN KEY (`user_order`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pays`
--
ALTER TABLE `pays`
  ADD CONSTRAINT `pays_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profits`
--
ALTER TABLE `profits`
  ADD CONSTRAINT `profits_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `services_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `views`
--
ALTER TABLE `views`
  ADD CONSTRAINT `views_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
