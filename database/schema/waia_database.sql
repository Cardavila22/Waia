-- Esquema inicial de la base de datos WAIA.
-- Se completará en la siguiente fase de desarrollo.
/* ============================================================
   WAIA
   Plataforma Digital de Experiencias Turísticas de Nicaragua

   Proyecto:
   Hackathon Nicaragua 2026

   Equipo:
   <CodeInfinity/>

   Base de datos:
   MySQL 8.0+

   Herramienta de administración:
   MySQL Workbench

   Arquitectura:
   React → API REST PHP → MySQL

   ============================================================ */


/* ============================================================
   1. CREACIÓN DE BASE DE DATOS
   ============================================================ */

CREATE DATABASE IF NOT EXISTS waia
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE waia;


/* ============================================================
   2. LIMPIEZA PREVIA
   ------------------------------------------------------------
   Se utiliza para facilitar las pruebas durante el desarrollo.
   En producción NO debe ejecutarse automáticamente.
   ============================================================ */

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS experience_images;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;


/* ============================================================
   3. USUARIOS
   ------------------------------------------------------------
   Usuarios que interactúan con la plataforma.
   ============================================================ */

CREATE TABLE users (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NULL,

    phone VARCHAR(30) NULL,

    country VARCHAR(100) DEFAULT 'Nicaragua',

    profile_image VARCHAR(500) NULL,

    role ENUM(
        'user',
        'host',
        'admin'
    ) NOT NULL DEFAULT 'user',

    status ENUM(
        'active',
        'inactive',
        'blocked'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB;


/* ============================================================
   4. DEPARTAMENTOS
   ------------------------------------------------------------
   Los 15 departamentos + regiones autónomas de Nicaragua
   pueden administrarse desde esta tabla.
   ============================================================ */

CREATE TABLE departments (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    slug VARCHAR(120) NOT NULL UNIQUE,

    description TEXT NULL,

    short_description VARCHAR(500) NULL,

    capital VARCHAR(100) NULL,

    image_url VARCHAR(500) NULL,

    latitude DECIMAL(10,7) NULL,

    longitude DECIMAL(10,7) NULL,

    status ENUM(
        'active',
        'inactive'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB;


/* ============================================================
   5. CATEGORÍAS
   ------------------------------------------------------------
   Categorías utilizadas actualmente por WAIA.
   ============================================================ */

CREATE TABLE categories (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    slug VARCHAR(120) NOT NULL UNIQUE,

    description TEXT NULL,

    icon VARCHAR(100) NULL,

    status ENUM(
        'active',
        'inactive'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB;


/* ============================================================
   6. COMUNIDADES
   ------------------------------------------------------------
   Representa comunidades vinculadas a las experiencias.
   ============================================================ */

CREATE TABLE communities (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    slug VARCHAR(180) NOT NULL UNIQUE,

    description TEXT NULL,

    short_description VARCHAR(500) NULL,

    department_id INT UNSIGNED NULL,

    image_url VARCHAR(500) NULL,

    latitude DECIMAL(10,7) NULL,

    longitude DECIMAL(10,7) NULL,

    contact_phone VARCHAR(30) NULL,

    contact_email VARCHAR(150) NULL,

    website VARCHAR(255) NULL,

    status ENUM(
        'active',
        'inactive'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_communities_department

        FOREIGN KEY (department_id)

        REFERENCES departments(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   7. ANFITRIONES
   ------------------------------------------------------------
   Personas encargadas de ofrecer o dirigir experiencias.
   ============================================================ */

CREATE TABLE hosts (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NULL,

    name VARCHAR(150) NOT NULL,

    bio TEXT NULL,

    profile_image VARCHAR(500) NULL,

    phone VARCHAR(30) NULL,

    email VARCHAR(150) NULL,

    experience_years INT UNSIGNED DEFAULT 0,

    verified BOOLEAN NOT NULL DEFAULT FALSE,

    status ENUM(
        'active',
        'inactive'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_hosts_user

        FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   8. ARTESANOS
   ------------------------------------------------------------
   Información de artesanos relacionados con experiencias
   culturales y productos locales.
   ============================================================ */

CREATE TABLE artisans (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NULL,

    community_id INT UNSIGNED NULL,

    name VARCHAR(150) NOT NULL,

    specialty VARCHAR(150) NULL,

    biography TEXT NULL,

    profile_image VARCHAR(500) NULL,

    phone VARCHAR(30) NULL,

    email VARCHAR(150) NULL,

    years_experience INT UNSIGNED DEFAULT 0,

    verified BOOLEAN NOT NULL DEFAULT FALSE,

    status ENUM(
        'active',
        'inactive'
    ) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_artisans_user

        FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE,

    CONSTRAINT fk_artisans_community

        FOREIGN KEY (community_id)

        REFERENCES communities(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   9. EXPERIENCIAS
   ------------------------------------------------------------
   Tabla principal de WAIA.

   Aquí se almacenará la información mostrada inicialmente
   por ExperienceCard y posteriormente por ExperienceDetails.
   ============================================================ */

CREATE TABLE experiences (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    slug VARCHAR(220) NOT NULL UNIQUE,

    category_id INT UNSIGNED NOT NULL,

    department_id INT UNSIGNED NOT NULL,

    community_id INT UNSIGNED NULL,

    host_id INT UNSIGNED NULL,

    artisan_id INT UNSIGNED NULL,

    location VARCHAR(200) NOT NULL,

    short_description VARCHAR(500) NOT NULL,

    long_description TEXT NULL,

    duration_minutes INT UNSIGNED NULL,

    max_participants INT UNSIGNED NULL,

    difficulty ENUM(
        'easy',
        'moderate',
        'difficult'
    ) DEFAULT 'easy',

    price_nio DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    price_usd DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    currency_primary ENUM(
        'NIO',
        'USD'
    ) NOT NULL DEFAULT 'NIO',

    latitude DECIMAL(10,7) NULL,

    longitude DECIMAL(10,7) NULL,

    main_image_url VARCHAR(500) NULL,

    requirements TEXT NULL,

    includes TEXT NULL,

    recommendations TEXT NULL,

    status ENUM(
        'draft',
        'published',
        'inactive'
    ) NOT NULL DEFAULT 'draft',

    featured BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_experiences_category

        FOREIGN KEY (category_id)

        REFERENCES categories(id)

        ON DELETE RESTRICT

        ON UPDATE CASCADE,

    CONSTRAINT fk_experiences_department

        FOREIGN KEY (department_id)

        REFERENCES departments(id)

        ON DELETE RESTRICT

        ON UPDATE CASCADE,

    CONSTRAINT fk_experiences_community

        FOREIGN KEY (community_id)

        REFERENCES communities(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE,

    CONSTRAINT fk_experiences_host

        FOREIGN KEY (host_id)

        REFERENCES hosts(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE,

    CONSTRAINT fk_experiences_artisan

        FOREIGN KEY (artisan_id)

        REFERENCES artisans(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   10. IMÁGENES DE EXPERIENCIAS
   ------------------------------------------------------------
   Una experiencia puede tener varias fotografías.
   ============================================================ */

CREATE TABLE experience_images (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    experience_id INT UNSIGNED NOT NULL,

    image_url VARCHAR(500) NOT NULL,

    alt_text VARCHAR(255) NULL,

    display_order INT UNSIGNED DEFAULT 0,

    is_cover BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_experience_images_experience

        FOREIGN KEY (experience_id)

        REFERENCES experiences(id)

        ON DELETE CASCADE

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   11. RESERVAS
   ------------------------------------------------------------
   Reservas realizadas por los usuarios.

   Actualmente el proyecto puede funcionar con localStorage.
   Esta tabla queda preparada para la futura persistencia
   mediante PHP + MySQL.
   ============================================================ */

CREATE TABLE bookings (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    booking_code VARCHAR(50) NOT NULL UNIQUE,

    user_id INT UNSIGNED NULL,

    experience_id INT UNSIGNED NOT NULL,

    booking_date DATE NOT NULL,

    booking_time TIME NULL,

    participants INT UNSIGNED NOT NULL DEFAULT 1,

    customer_name VARCHAR(200) NOT NULL,

    customer_email VARCHAR(150) NOT NULL,

    customer_phone VARCHAR(30) NULL,

    notes TEXT NULL,

    price_per_person_nio DECIMAL(10,2) DEFAULT 0.00,

    price_per_person_usd DECIMAL(10,2) DEFAULT 0.00,

    total_nio DECIMAL(10,2) DEFAULT 0.00,

    total_usd DECIMAL(10,2) DEFAULT 0.00,

    currency ENUM(
        'NIO',
        'USD'
    ) NOT NULL DEFAULT 'NIO',

    status ENUM(
        'pending',
        'confirmed',
        'cancelled',
        'completed'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_bookings_user

        FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE SET NULL

        ON UPDATE CASCADE,

    CONSTRAINT fk_bookings_experience

        FOREIGN KEY (experience_id)

        REFERENCES experiences(id)

        ON DELETE RESTRICT

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   12. FAVORITOS
   ------------------------------------------------------------
   Permite guardar experiencias favoritas.

   En el prototipo actual puede continuar utilizando
   localStorage. Posteriormente se sincronizará con esta tabla.
   ============================================================ */

CREATE TABLE favorites (

    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    experience_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_experience (
        user_id,
        experience_id
    ),

    CONSTRAINT fk_favorites_user

        FOREIGN KEY (user_id)

        REFERENCES users(id)

        ON DELETE CASCADE

        ON UPDATE CASCADE,

    CONSTRAINT fk_favorites_experience

        FOREIGN KEY (experience_id)

        REFERENCES experiences(id)

        ON DELETE CASCADE

        ON UPDATE CASCADE

) ENGINE=InnoDB;


/* ============================================================
   13. ÍNDICES
   ------------------------------------------------------------ */

CREATE INDEX idx_experiences_category
ON experiences(category_id);

CREATE INDEX idx_experiences_department
ON experiences(department_id);

CREATE INDEX idx_experiences_community
ON experiences(community_id);

CREATE INDEX idx_experiences_host
ON experiences(host_id);

CREATE INDEX idx_experiences_artisan
ON experiences(artisan_id);

CREATE INDEX idx_experiences_status
ON experiences(status);

CREATE INDEX idx_experiences_featured
ON experiences(featured);

CREATE INDEX idx_experiences_location
ON experiences(location);

CREATE INDEX idx_bookings_experience
ON bookings(experience_id);

CREATE INDEX idx_bookings_user
ON bookings(user_id);

CREATE INDEX idx_bookings_status
ON bookings(status);

CREATE INDEX idx_bookings_date
ON bookings(booking_date);

CREATE INDEX idx_communities_department
ON communities(department_id);

CREATE INDEX idx_artisans_community
ON artisans(community_id);


/* ============================================================
   14. CATEGORÍAS INICIALES
   ============================================================ */

INSERT INTO categories
(name, slug, description, icon)
VALUES

(
    'Gastronomía',
    'gastronomia',
    'Experiencias gastronómicas y sabores tradicionales de Nicaragua.',
    'restaurant'
),

(
    'Artesanía',
    'artesania',
    'Experiencias relacionadas con artesanía, arte y producción local.',
    'palette'
),

(
    'Mitos e Historias',
    'mitos-e-historias',
    'Historias, leyendas, tradiciones y patrimonio cultural.',
    'auto_stories'
),

(
    'Naturaleza y Aventura',
    'naturaleza-y-aventura',
    'Experiencias de naturaleza, aventura y exploración.',
    'landscape'
);


/* ============================================================
   15. DEPARTAMENTOS DE NICARAGUA
   ============================================================ */

INSERT INTO departments
(name, slug, capital)
VALUES

('Boaco', 'boaco', 'Boaco'),

('Carazo', 'carazo', 'Jinotepe'),

('Chinandega', 'chinandega', 'Chinandega'),

('Chontales', 'chontales', 'Juigalpa'),

('Estelí', 'esteli', 'Estelí'),

('Granada', 'granada', 'Granada'),

('Jinotega', 'jinotega', 'Jinotega'),

('León', 'leon', 'León'),

('Madriz', 'madriz', 'Somoto'),

('Managua', 'managua', 'Managua'),

('Masaya', 'masaya', 'Masaya'),

('Matagalpa', 'matagalpa', 'Matagalpa'),

('Nueva Segovia', 'nueva-segovia', 'Ocotal'),

('Río San Juan', 'rio-san-juan', 'San Carlos'),

('Rivas', 'rivas', 'Rivas'),

('Región Autónoma de la Costa Caribe Norte',
 'racn',
 'Puerto Cabezas'),

('Región Autónoma de la Costa Caribe Sur',
 'raccs',
 'Bluefields');


/* ============================================================
   16. VERIFICACIÓN
   ============================================================ */

SELECT
    'WAIA Database' AS database_name,
    DATABASE() AS current_database;


/* ============================================================
   FIN DEL SCRIPT
   ============================================================ */
