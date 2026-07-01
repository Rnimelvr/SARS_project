-- =====================================================
-- SARS Database Schema
-- Import fail ini melalui phpMyAdmin > tab "Import"
-- Database: SARS_DB
-- =====================================================

CREATE DATABASE IF NOT EXISTS SARS_DB;
USE SARS_DB;

-- Jadual admin (untuk login system)
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) DEFAULT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin (username, password, full_name, role) VALUES
('admin', 'admin123', 'Administrator', 'admin');

-- Jadual detections (rekod pengesanan haiwan)
CREATE TABLE IF NOT EXISTS detections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_type VARCHAR(50) NOT NULL,      -- Lebah / Anjing / Monyet
    location VARCHAR(100) NOT NULL,        -- Zon / Bilik / Node
    status VARCHAR(20) DEFAULT 'detected', -- detected / repelled
    detected_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Data contoh (sepadan dengan dummy data asal dalam index.php / history.php)


CREATE TABLE system_status (
id INT AUTO_INCREMENT PRIMARY KEY,
system_status VARCHAR(20),
esp32_status VARCHAR(20),
arduino_status VARCHAR(20),
mode VARCHAR(20),
siren_status VARCHAR(20),
relay_status VARCHAR(20),
current_animal VARCHAR(50),
confidence INT,
detection_date DATE,
detection_time TIME
);
