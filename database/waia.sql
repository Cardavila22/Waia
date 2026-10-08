CREATE DATABASE IF NOT EXISTS waia DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE waia;

CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(150) NOT NULL,email VARCHAR(190) NOT NULL UNIQUE,password_hash VARCHAR(255) NOT NULL,role ENUM('turista','anfitrion','guia','negocio','tour-operadora','admin') NOT NULL DEFAULT 'turista',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE departments (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(150) NOT NULL UNIQUE,region VARCHAR(150),description TEXT,image_url VARCHAR(500));
CREATE TABLE municipalities (id INT AUTO_INCREMENT PRIMARY KEY,department_id INT NOT NULL,name VARCHAR(150) NOT NULL,description TEXT,UNIQUE KEY uq_municipality (department_id,name),FOREIGN KEY (department_id) REFERENCES departments(id));
CREATE TABLE categories (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(150) NOT NULL UNIQUE,description TEXT,icon VARCHAR(80));
CREATE TABLE hosts (id INT AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,name VARCHAR(150) NOT NULL,description TEXT,phone VARCHAR(40),email VARCHAR(190),image_url VARCHAR(500),FOREIGN KEY (user_id) REFERENCES users(id));
CREATE TABLE places (id INT AUTO_INCREMENT PRIMARY KEY,municipality_id INT,category_id INT,host_id INT,name VARCHAR(180) NOT NULL,description TEXT,address VARCHAR(255),latitude DECIMAL(10,7),longitude DECIMAL(10,7),price DECIMAL(10,2) NULL,rating DECIMAL(3,2) NULL,image_url VARCHAR(500),status ENUM('draft','active','inactive') DEFAULT 'active',FOREIGN KEY (municipality_id) REFERENCES municipalities(id),FOREIGN KEY (category_id) REFERENCES categories(id),FOREIGN KEY (host_id) REFERENCES hosts(id),INDEX idx_places_municipality (municipality_id),INDEX idx_places_category (category_id));
CREATE TABLE experiences (id INT AUTO_INCREMENT PRIMARY KEY,host_id INT,place_id INT,title VARCHAR(180) NOT NULL,description TEXT,price DECIMAL(10,2) NULL,duration VARCHAR(80),capacity INT,image_url VARCHAR(500),FOREIGN KEY (host_id) REFERENCES hosts(id),FOREIGN KEY (place_id) REFERENCES places(id));
CREATE TABLE bookings (id BIGINT AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,experience_id INT NOT NULL,date DATE NOT NULL,guests INT NOT NULL DEFAULT 1,status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id) REFERENCES users(id),FOREIGN KEY (experience_id) REFERENCES experiences(id),INDEX idx_bookings_date (date));
CREATE TABLE favorites (id BIGINT AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,place_id INT NOT NULL,UNIQUE KEY uq_favorite (user_id,place_id),FOREIGN KEY (user_id) REFERENCES users(id),FOREIGN KEY (place_id) REFERENCES places(id));
CREATE TABLE reviews (id BIGINT AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,place_id INT NOT NULL,rating TINYINT NOT NULL,comment TEXT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id) REFERENCES users(id),FOREIGN KEY (place_id) REFERENCES places(id));
CREATE TABLE itineraries (id BIGINT AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL,name VARCHAR(180) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user_id) REFERENCES users(id));
CREATE TABLE itinerary_items (id BIGINT AUTO_INCREMENT PRIMARY KEY,itinerary_id BIGINT NOT NULL,place_id INT NOT NULL,visit_date DATE NULL,visit_time TIME NULL,position INT NOT NULL DEFAULT 0,FOREIGN KEY (itinerary_id) REFERENCES itineraries(id),FOREIGN KEY (place_id) REFERENCES places(id),INDEX idx_itinerary_position (itinerary_id,position));

INSERT INTO categories (name,description,icon) VALUES
('Hospedaje','Hoteles, hostales, lodges y alojamientos rurales.','hotel'),
('Restaurantes','Opciones gastronómicas y cocina local.','restaurant'),
('Bares','Ambiente y vida nocturna.','local_bar'),
('Cafeterías','Café, postres y espacios de encuentro.','coffee'),
('Agencias de Viajes','Servicios de planificación y comercialización.','travel'),
('Tour Operadoras','Tours y experiencias organizadas.','map'),
('Centros Recreativos','Espacios familiares y recreativos.','park'),
('Transporte','Movilidad turística y traslados.','directions_car'),
('Rent a Car','Alquiler de vehículos.','car_rental'),
('Guías Turísticos','Guías locales, nacionales y especializados.','guide'),
('Turismo Rural Sostenible','Experiencias rurales y comunitarias.','nature');
