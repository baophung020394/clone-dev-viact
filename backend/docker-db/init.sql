CREATE DATABASE IF NOT EXISTS viact;
USE viact;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    accessToken VARCHAR(255),
    refreshToken VARCHAR(255),
    role VARCHAR(255),
    status ENUM('0', '1') DEFAULT '1'
);