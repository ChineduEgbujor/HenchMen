CREATE TABLE `Customers` (
  `customer_id` int PRIMARY KEY,
  `first_name` varchar(50),
  `last_name` varchar(50),
  `email` varchar(100),
  `phone_number` varchar(20),
  `address` varchar(255)
);

CREATE TABLE `Flights` (
  `flight_id` int PRIMARY KEY,
  `departure_city` varchar(100),
  `destination_city` varchar(100),
  `departure_date` date,
  `departure_time` time,
  `arrival_date` date,
  `arrival_time` time,
  `available_seats` int,
  `ticket_price` decimal(10,2)
);

CREATE TABLE `Reservations` (
  `reservation_id` int PRIMARY KEY,
  `customer_id` int,
  `flight_id` int,
  `reservation_date` timestamp DEFAULT (current_timestamp),
  `status` enum(reserved,canceled) DEFAULT 'reserved',
  `seat_number` varchar(10),
  `confirmation_code` varchar(20)
);

CREATE TABLE `Managers` (
  `manager_id` int PRIMARY KEY,
  `username` varchar(50),
  `email` varchar(100)
  `password` varchar(255)
);

-- CREATE TABLE `Payments` (
--   `payment_id` int PRIMARY KEY,
--   `reservation_id` int,
--   `amount` decimal(10,2),
--   `payment_date` timestamp DEFAULT (current_timestamp),
--   `payment_method` varchar(50)
-- );

ALTER TABLE `Reservations` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`);

ALTER TABLE `Reservations` ADD FOREIGN KEY (`flight_id`) REFERENCES `Flights` (`flight_id`);

-- ALTER TABLE `Payments` ADD FOREIGN KEY (`reservation_id`) REFERENCES `Reservations` (`reservation_id`);
