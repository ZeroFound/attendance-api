# 📚 API Sistem Absensi Mahasiswa

<div align="center">

[![API Status](https://img.shields.io/badge/API-Online-brightgreen?style=flat-square)](https://api-absensi-mahasiswa.up.railway.app/)
![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=flat-square&logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8.1+-blue?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

**REST API untuk sistem pencatatan kehadiran mahasiswa dengan validasi GPS dan autentikasi JWT**

[Live Demo](https://api-absensi-mahasiswa.up.railway.app/) · [Dokumentasi API](https://documenter.getpostman.com/view/37522624/2sBXVfiBEM) · [Report Bug](https://github.com/ZeroFound/attendance-api.git) · [Request Feature](https://github.com/ZeroFound/attendance-api.git)

</div>

---

## 📑 Table of Contents

- [Tentang Project](#-tentang-project)
  - [Fitur Utama](#-fitur-utama)
  - [Built With](#️-built-with)
- [Demo & Screenshots](#-demo--screenshots)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Instalasi](#-instalasi)
  - [Konfigurasi](#️-konfigurasi)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
  - [Authentication](#-authentication)
  - [Endpoints](#-endpoints)
- [Usage Examples](#-usage-examples)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Tentang Project

**API Sistem Absensi Mahasiswa** adalah solusi digital modern untuk mengelola kehadiran mahasiswa dengan validasi lokasi GPS real-time. Sistem ini dibangun menggunakan Laravel 10 dan dirancang untuk memudahkan proses pencatatan kehadiran, monitoring, dan pelaporan kehadiran mahasiswa secara efisien dan akurat.

### 💡 Latar Belakang

Sistem absensi tradisional yang masih menggunakan kertas atau spreadsheet memiliki beberapa kelemahan:
- Rentan terhadap kecurangan (titip absen)
- Sulit untuk monitoring real-time
- Proses rekap yang memakan waktu
- Data yang tidak terstruktur

Oleh karena itu, kami mengembangkan sistem absensi digital dengan fitur validasi GPS untuk memastikan mahasiswa benar-benar hadir di lokasi perkuliahan.

### ✨ Fitur Utama

#### 🔐 Authentication & Authorization
- JWT Token-based authentication
- Role-based access control (Admin, Dosen, Mahasiswa)
- Refresh token mechanism
- Secure password hashing dengan bcrypt
- Email verification (optional)

#### 📍 GPS Validation
- Real-time location tracking
- Radius validation (100 meter default)
- Haversine formula untuk perhitungan jarak
- Support multiple class locations
- Anti-spoofing detection

#### 📚 Course Management
- CRUD mata kuliah
- Penjadwalan otomatis
- Manajemen SKS dan semester
- Kategori mata kuliah (Wajib/Pilihan)

#### 🏫 Class Management
- Buat dan kelola kelas
- Daftarkan mahasiswa ke kelas
- Set lokasi GPS untuk setiap kelas
- Jadwal pertemuan otomatis
- Kapasitas kelas

#### ✅ Attendance System
- Check-in dengan validasi GPS
- Auto check-out
- Timestamp akurat
- Status kehadiran (Hadir, Izin, Sakit, Alpha)
- Late attendance marking
- Attendance notes

#### 📊 Reporting & Analytics
- Rekap kehadiran per mahasiswa
- Statistik kehadiran per kelas
- Export ke Excel/PDF
- Grafik visualisasi kehadiran
- Attendance percentage calculation
- Early warning system untuk absensi rendah

#### 🔔 Notifications (Upcoming)
- Push notification untuk reminder
- Email notification untuk laporan
- SMS gateway integration
- WhatsApp notification

### 🏗️ Built With

#### Backend Framework & Language
- **[Laravel 10.x](https://laravel.com/)** - PHP Framework untuk REST API
- **[PHP 8.1+](https://www.php.net/)** - Server-side programming language

#### Database
- **[MySQL 8.0](https://www.mysql.com/)** - Relational Database Management System
- **[Laravel Eloquent ORM](https://laravel.com/docs/10.x/eloquent)** - Object-Relational Mapping

#### Authentication
- **[JWT (tymon/jwt-auth)](https://jwt-auth.readthedocs.io/)** - JSON Web Token Authentication
- **[Laravel Sanctum](https://laravel.com/docs/10.x/sanctum)** - API Token Authentication (Alternative)

#### Validation & Security
- **[Laravel Validation](https://laravel.com/docs/10.x/validation)** - Built-in validation rules
- **[CORS Middleware](https://github.com/fruitcake/laravel-cors)** - Cross-Origin Resource Sharing
- **[Laravel Throttle](https://laravel.com/docs/10.x/routing#rate-limiting)** - API Rate Limiting

#### GPS & Location
- **Haversine Formula** - Distance calculation algorithm
- **GPS Coordinate Validation** - Latitude/Longitude validation

#### Development Tools
- **[Composer](https://getcomposer.org/)** - Dependency Manager for PHP
- **[Postman](https://www.postman.com/)** - API Testing & Documentation
- **[Git](https://git-scm.com/)** - Version Control System

#### Deployment & Hosting
- **[Railway](https://railway.app/)** - Cloud Platform for Deployment
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD Pipeline (Optional)

#### Testing
- **[PHPUnit](https://phpunit.de/)** - PHP Testing Framework
- **[Laravel Testing](https://laravel.com/docs/10.x/testing)** - Built-in testing features

---

## 🖼️ Demo & Screenshots

### Live API
**Base URL:** [https://api-absensi-mahasiswa.up.railway.app/](https://api-absensi-mahasiswa.up.railway.app/)

### API Documentation
**Postman:** [View Documentation](https://documenter.getpostman.com/view/37522624/2sBXVfiBEM)

### Screenshots

```
<img width="2880" height="1724" alt="screencapture-api-absensi-mahasiswa-up-railway-app-2026-01-10-22_10_21" src="https://github.com/user-attachments/assets/9550d05c-2d68-40e3-b52e-b20e54c2dabb" />

```

---

## 🏛️ Arsitektur Sistem

### System Architecture

```
┌─────────────────┐
│  Mobile/Web App │
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/HTTPS
         │ JSON Request
         ▼
┌─────────────────────────────────────────┐
│         Laravel API Gateway             │
│  ┌───────────────────────────────────┐  │
│  │     Middleware Layer              │  │
│  │  - CORS                           │  │
│  │  - Rate Limiting                  │  │
│  │  - JWT Authentication             │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │     Controller Layer              │  │
│  │  - Request Validation             │  │
│  │  - Business Logic                 │  │
│  │  - Response Formatting            │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │     Service Layer                 │  │
│  │  - GPS Validation Service         │  │
│  │  - Attendance Service             │  │
│  │  - Notification Service           │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │     Repository Layer              │  │
│  │  - Eloquent ORM                   │  │
│  │  - Query Builder                  │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
               ▼
      ┌─────────────────┐
      │  MySQL Database │
      │   - Users       │
      │   - Courses     │
      │   - Classes     │
      │   - Attendances │
      └─────────────────┘
```

### Database Design

```
users (Role: Admin, Dosen, Mahasiswa)
├── courses (Mata Kuliah)
│   └── classes (Kelas Perkuliahan)
│       ├── class_students (Pendaftaran Mahasiswa)
│       ├── class_schedules (Jadwal Kelas)
│       └── attendances (Kehadiran)
│           └── attendance_logs (Log Check-in/out)
```

### Request Flow

1. **Client** mengirim request ke API endpoint
2. **CORS Middleware** memvalidasi origin
3. **Rate Limiter** mencegah spam request
4. **JWT Middleware** memverifikasi token
5. **Controller** menerima request
6. **Validator** memvalidasi input data
7. **Service Layer** menjalankan business logic
8. **Repository** berinteraksi dengan database
9. **Response** dikembalikan ke client dalam format JSON

---

## 🚀 Getting Started

### 📋 Prerequisites

Pastikan sistem Anda sudah terinstall:

| Software | Version | Keterangan |
|----------|---------|------------|
| **PHP** | >= 8.1 | [Download](https://www.php.net/downloads) |
| **Composer** | >= 2.0 | [Download](https://getcomposer.org/download/) |
| **MySQL** | >= 8.0 | [Download](https://dev.mysql.com/downloads/mysql/) |
| **Git** | Latest | [Download](https://git-scm.com/downloads) |
| **Postman** | Latest | [Download](https://www.postman.com/downloads/) (Optional) |

#### Cek Versi Installed

```bash
php -v
composer -v
mysql --version
git --version
```

#### PHP Extensions Required

Pastikan PHP extensions berikut sudah enabled:

```bash
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
- Ctype PHP Extension
- JSON PHP Extension
- BCMath PHP Extension
```

Cek extensions:
```bash
php -m
```

---

### 💻 Instalasi

#### 1️⃣ Clone Repository

```bash
# Clone repository
git clone https://github.com/username/attendance-api.git

# Masuk ke direktori project
cd attendance-api
```

#### 2️⃣ Install Dependencies

```bash
# Install semua PHP dependencies via Composer
composer install

# Atau untuk production (tanpa dev dependencies)
composer install --no-dev --optimize-autoloader
```

**Troubleshooting:** Jika ada error saat install, coba:
```bash
composer update
composer dump-autoload
```

#### 3️⃣ Setup Environment File

```bash
# Copy file .env.example menjadi .env
cp .env.example .env

# Atau untuk Windows
copy .env.example .env
```

#### 4️⃣ Generate Application Key

```bash
# Generate unique application key
php artisan key:generate
```

Output:
```
Application key set successfully.
```

#### 5️⃣ Setup Database

##### a. Buat Database Baru

Masuk ke MySQL console:
```bash
mysql -u root -p
```

Buat database:
```sql
CREATE DATABASE attendance_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Cek database berhasil dibuat
SHOW DATABASES;

-- Keluar dari MySQL
EXIT;
```

##### b. Konfigurasi Database di .env

Edit file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=attendance_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

#### 6️⃣ Setup JWT Authentication

```bash
# Install JWT package (jika belum terinstall)
composer require tymon/jwt-auth

# Publish JWT config file
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

# Generate JWT secret key
php artisan jwt:secret
```

File `.env` akan otomatis ditambahkan:
```env
JWT_SECRET=your_generated_jwt_secret_key
```

#### 7️⃣ Run Database Migrations

```bash
# Jalankan semua migration files
php artisan migrate

# Atau jika ingin fresh install (hapus semua data existing)
php artisan migrate:fresh
```

Output:
```
Migration table created successfully.
Migrating: 2014_10_12_000000_create_users_table
Migrated:  2014_10_12_000000_create_users_table (50.00ms)
...
```

#### 8️⃣ Seed Database (Optional)

```bash
# Seed semua tables dengan data dummy
php artisan db:seed

# Atau seed specific seeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=CourseSeeder
php artisan db:seed --class=ClassSeeder
```

#### 9️⃣ Clear Cache & Optimize

```bash
# Clear semua cache
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Optimize untuk production (optional)
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### 🔟 Jalankan Development Server

```bash
# Start Laravel development server
php artisan serve
```

Output:
```
Starting Laravel development server: http://127.0.0.1:8000
```

Server berjalan di:
- Local: http://127.0.0.1:8000
- Network: http://localhost:8000

**Custom Host & Port:**
```bash
# Jalankan di custom host dan port
php artisan serve --host=0.0.0.0 --port=8080

# Accessible dari network lain
php artisan serve --host=192.168.1.100 --port=3000
```

---

### ⚙️ Konfigurasi

#### Konfigurasi .env Lengkap

```env
# Application
APP_NAME="Attendance API"
APP_ENV=local
APP_KEY=base64:your_generated_key_here
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_TIMEZONE=Asia/Makassar

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=attendance_db
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_TTL=60                    # Token lifetime (60 minutes)
JWT_REFRESH_TTL=20160        # Refresh token (14 days)
JWT_ALGO=HS256
JWT_BLACKLIST_ENABLED=true
JWT_BLACKLIST_GRACE_PERIOD=30

# GPS Validation
GPS_RADIUS=100               # Radius dalam meter
GPS_ENABLE_VALIDATION=true

# Cache & Session
CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Queue
QUEUE_CONNECTION=sync

# Mail Configuration (Optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@attendance.com
MAIL_FROM_NAME="${APP_NAME}"

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=debug

# Security
BCRYPT_ROUNDS=10

# CORS
CORS_ALLOWED_ORIGINS=*
CORS_ALLOWED_METHODS=GET,POST,PUT,PATCH,DELETE,OPTIONS
CORS_ALLOWED_HEADERS=Content-Type,Authorization
```

#### Konfigurasi CORS

Edit `config/cors.php`:
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // Untuk production, ganti dengan domain specific
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

#### Konfigurasi Rate Limiting

Edit `app/Http/Kernel.php`:
```php
protected $middlewareGroups = [
    'api' => [
        \Illuminate\Routing\Middleware\ThrottleRequests::class.':60,1', // 60 requests per minute
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ],
];
```

---

## 🗄️ Database Schema

### ERD (Entity Relationship Diagram)

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    users     │         │   courses    │         │   classes    │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │         │ id (PK)      │
│ name         │         │ code         │         │ course_id(FK)│
│ email        │         │ name         │         │ lecturer_id  │
│ password     │         │ sks          │         │ name         │
│ role         │◀───┐    │ semester     │◀───┐    │ room         │
│ nim/nip      │    │    │ type         │    │    │ latitude     │
│ phone        │    │    │ created_at   │    │    │ longitude    │
│ created_at   │    │    │ updated_at   │    │    │ radius       │
│ updated_at   │    │    └──────────────┘    │    │ created_at   │
└──────────────┘    │                        │    │ updated_at   │
                    │                        │    └──────────────┘
                    │                        │            │
                    │                        └────────────┤
                    │                                     │
                    │    ┌──────────────────┐            │
                    │    │ class_students   │            │
                    │    ├──────────────────┤            │
                    │    │ id (PK)          │            │
                    └────│ student_id (FK)  │            │
                         │ class_id (FK)    │────────────┘
                         │ enrolled_at      │
                         │ status           │            ┌──────────────────┐
                         └──────────────────┘            │  class_schedules │
                                                         ├──────────────────┤
                         ┌──────────────────┐            │ id (PK)          │
                         │   attendances    │            │ class_id (FK)    │
                         ├──────────────────┤◀───────────│ day              │
                         │ id (PK)          │            │ start_time       │
                    ┌────│ student_id (FK)  │            │ end_time         │
                    │    │ class_id (FK)    │            │ created_at       │
                    │    │ schedule_id (FK) │            │ updated_at       │
                    │    │ date             │            └──────────────────┘
                    │    │ status           │                     │
                    │    │ check_in_time    │                     │
                    │    │ check_out_time   │                     │
                    │    │ latitude         │                     │
                    │    │ longitude        │─────────────────────┘
                    │    │ notes            │
                    │    │ created_at       │
                    │    │ updated_at       │
                    │    └──────────────────┘
                    │              │
                    │              │
                    │    ┌──────────────────┐
                    │    │ attendance_logs  │
                    │    ├──────────────────┤
                    │    │ id (PK)          │
                    └────│ attendance_id(FK)│
                         │ type             │
                         │ latitude         │
                         │ longitude        │
                         │ distance         │
                         │ ip_address       │
                         │ user_agent       │
                         │ created_at       │
                         └──────────────────┘
```

### Table Structures

#### users
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'dosen', 'mahasiswa') NOT NULL DEFAULT 'mahasiswa',
    nim VARCHAR(20) NULL,
    nip VARCHAR(20) NULL,
    phone VARCHAR(20) NULL,
    photo VARCHAR(255) NULL,
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_nim (nim),
    INDEX idx_nip (nip)
);
```

#### courses
```sql
CREATE TABLE courses (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    sks INT NOT NULL DEFAULT 3,
    semester INT NOT NULL,
    type ENUM('wajib', 'pilihan') NOT NULL DEFAULT 'wajib',
    description TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX idx_code (code),
    INDEX idx_semester (semester)
);
```

#### classes
```sql
CREATE TABLE classes (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    course_id BIGINT UNSIGNED NOT NULL,
    lecturer_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    room VARCHAR(100) NOT NULL,
    capacity INT NOT NULL DEFAULT 40,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    radius INT NOT NULL DEFAULT 100,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (lecturer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_course_id (course_id),
    INDEX idx_lecturer_id (lecturer_id),
    INDEX idx_status (status)
);
```

#### class_students
```sql
CREATE TABLE class_students (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT UNSIGNED NOT NULL,
    class_id BIGINT UNSIGNED NOT NULL,
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'dropped') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, class_id),
    INDEX idx_student_id (student_id),
    INDEX idx_class_id (class_id)
);
```

#### class_schedules
```sql
CREATE TABLE class_schedules (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    class_id BIGINT UNSIGNED NOT NULL,
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    INDEX idx_class_id (class_id),
    INDEX idx_day (day)
);
```

#### attendances
```sql
CREATE TABLE attendances (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT UNSIGNED NOT NULL,
    class_id BIGINT UNSIGNED NOT NULL,
    schedule_id BIGINT UNSIGNED NULL,
    date DATE NOT NULL,
    status ENUM('hadir', 'izin', 'sakit', 'alpha') NOT NULL DEFAULT 'hadir',
    check_in_time TIMESTAMP NULL,
    check_out_time TIMESTAMP NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    distance DECIMAL(8, 2) NULL,
    notes TEXT NULL,
    is_late BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (schedule_id) REFERENCES class_schedules(id) ON DELETE SET NULL,
    UNIQUE KEY unique_attendance (student_id, class_id, date),
    INDEX idx_student_id (student_id),
    INDEX idx_class_id (class_id),
    INDEX idx_date (date),
    INDEX idx_status (status)
);
```

#### attendance_logs
```sql
CREATE TABLE attendance_logs (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    attendance_id BIGINT UNSIGNED NOT NULL,
    type ENUM('check_in', 'check_out') NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    distance DECIMAL(8, 2) NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP NULL,
    FOREIGN KEY (attendance_id) REFERENCES attendances(id) ON DELETE CASCADE,
    INDEX idx_attendance_id (attendance_id),
    INDEX idx_type (type)
);
```

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:8000/api
Production:  https://api-absensi-mahasiswa.up.railway.app/api
```

### 🔐 Authentication

API menggunakan **JWT (JSON Web Token)** untuk authentication. Token harus disertakan di header setiap request.

#### Header Format

```http
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
Accept: application/json
```

#### Token Lifecycle

- **Access Token**: Valid selama 60 menit
- **Refresh Token**: Valid selama 14 hari
- **Blacklist**: Token yang sudah logout akan di-blacklist

---

### 📚 Endpoints

#### Authentication Endpoints

##### 1. Register
```http
POST /api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "mahasiswa",
    "nim": "A1B220123",
    "phone": "081234567890"
}
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "mahasiswa",
            "nim": "A1B220123",
            "phone": "081234567890"
        },
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
        "token_type": "bearer",
        "expires_in": 3600
    }
}
```

##### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "mahasiswa"
        },
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
        "token_type": "bearer",
        "expires_in": 3600
    }
}
```

##### 3. Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Successfully logged out"
}
```

##### 4. Refresh Token
```http
POST /api/auth/refresh
Authorization: Bearer {token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
        "token_type": "bearer",
        "expires_in": 3600
    }
}
```

##### 5. Get Profile
```http
GET /api/auth/me
Authorization: Bearer {token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "mahasiswa",
        "nim": "A1B220123",
        "phone": "081234567890",
        "photo": null,
        "email_verified_at": null,
        "created_at": "2026-01-10T14:30:00.000000Z"
    }
}
```

---

#### Course Endpoints

##### 1. Get All Courses
```http
GET /api/courses
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (int): Page number (default: 1)
- `per_page` (int): Items per page (default: 10)
- `semester` (int): Filter by semester
- `type` (string): Filter by type (wajib/pilihan)

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "courses": [
            {
                "id": 1,
                "code": "CS101",
                "name": "Pemrograman Web",
                "sks": 3,
                "semester": 3,
                "type": "wajib",
                "description": "Mata kuliah dasar pemrograman web"
            }
        ],
        "pagination": {
            "current_page": 1,
            "per_page": 10,
            "total": 25,
            "last_page": 3
        }
    }
}
```

##### 2. Get Course Detail
```http
GET /api/courses/{id}
Authorization: Bearer {token}
```

##### 3. Create Course (Admin/Dosen Only)
```http
POST /api/courses
Authorization: Bearer {token}
Content-Type: application/json

{
    "code": "CS101",
    "name": "Pemrograman Web",
    "sks": 3,
    "semester": 3,
    "type": "wajib",
    "description": "Mata kuliah dasar pemrograman web"
}
```

##### 4. Update Course
```http
PUT /api/courses/{id}
Authorization: Bearer {token}
```

##### 5. Delete Course
```http
DELETE /api/courses/{id}
Authorization: Bearer {token}
```

---

#### Class Endpoints

##### 1. Get All Classes
```http
GET /api/classes
Authorization: Bearer {token}
```

##### 2. Get Class Detail
```http
GET /api/classes/{id}
Authorization: Bearer {token}
```

##### 3. Create Class (Dosen Only)
```http
POST /api/classes
Authorization: Bearer {token}
Content-Type: application/json

{
    "course_id": 1,
    "name": "Kelas A",
    "room": "R.301",
    "capacity": 40,
    "latitude": -8.583333,
    "longitude": 116.116667,
    "radius": 100,
    "schedules": [
        {
            "day": "Monday",
            "start_time": "08:00:00",
            "end_time": "10:00:00"
        }
    ]
}
```

##### 4. Enroll Student to Class
```http
POST /api/classes/{id}/enroll
Authorization: Bearer {token}
Content-Type: application/json

{
    "student_id": 5
}
```

##### 5. Get Class Students
```http
GET /api/classes/{id}/students
Authorization: Bearer {token}
```

---

#### Attendance Endpoints

##### 1. Check-In
```http
POST /api/attendances/check-in
Authorization: Bearer {token}
Content-Type: application/json

{
    "class_id": 1,
    "latitude": -8.583400,
    "longitude": 116.116700,
    "notes": "Hadir tepat waktu"
}
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "Check-in successful",
    "data": {
        "attendance": {
            "id": 1,
            "student_id": 5,
            "class_id": 1,
            "date": "2026-01-10",
            "status": "hadir",
            "check_in_time": "2026-01-10T08:05:00.000000Z",
            "latitude": -8.583400,
            "longitude": 116.116700,
            "distance": 45.67,
            "is_late": false
        }
    }
}
```

**Response Error - Out of Range (400):**
```json
{
    "success": false,
    "message": "You are too far from the class location",
    "data": {
        "distance": 250.45,
        "max_distance": 100,
        "your_location": {
            "latitude": -8.585000,
            "longitude": 116.118000
        },
        "class_location": {
            "latitude": -8.583333,
            "longitude": 116.116667
        }
    }
}
```

##### 2. Check-Out
```http
POST /api/attendances/check-out
Authorization: Bearer {token}
Content-Type: application/json

{
    "attendance_id": 1,
    "latitude": -8.583400,
    "longitude": 116.116700
}
```

##### 3. Get My Attendances
```http
GET /api/attendances/me
Authorization: Bearer {token}
```

**Query Parameters:**
- `class_id` (int): Filter by class
- `start_date` (date): Filter start date (YYYY-MM-DD)
- `end_date` (date): Filter end date (YYYY-MM-DD)
- `status` (string): Filter by status

##### 4. Get Class Attendances (Dosen Only)
```http
GET /api/classes/{id}/attendances
Authorization: Bearer {token}
```

##### 5. Update Attendance Status (Dosen Only)
```http
PUT /api/attendances/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
    "status": "izin",
    "notes": "Sakit dengan surat dokter"
}
```

##### 6. Get Attendance Statistics
```http
GET /api/attendances/statistics
Authorization: Bearer {token}
```

**Response Success (200):**
```json
{
    "success": true,
    "data": {
        "student_id": 5,
        "total_classes": 12,
        "total_present": 10,
        "total_absent": 1,
        "total_excused": 1,
        "attendance_percentage": 83.33,
        "by_class": [
            {
                "class_id": 1,
                "class_name": "Pemrograman Web - Kelas A",
                "present": 10,
                "absent": 1,
                "excused": 1,
                "percentage": 83.33
            }
        ]
    }
}
```

---

### Response Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request berhasil |
| 201 | Created - Resource berhasil dibuat |
| 400 | Bad Request - Request tidak valid |
| 401 | Unauthorized - Token tidak valid/expired |
| 403 | Forbidden - Tidak memiliki akses |
| 404 | Not Found - Resource tidak ditemukan |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

### Error Response Format

```json
{
    "success": false,
    "message": "Validation error",
    "errors": {
        "email": [
            "The email field is required."
        ],
        "password": [
            "The password must be at least 8 characters."
        ]
    }
}
```

---

## 💡 Usage Examples

### Example: Complete Attendance Flow

#### 1. Login sebagai Mahasiswa

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mahasiswa@example.com",
    "password": "password123"
  }'
```

#### 2. Get My Classes

```bash
curl -X GET http://localhost:8000/api/classes \
  -H "Authorization: Bearer {token}" \
  -H "Accept: application/json"
```

#### 3. Check-In to Class

```bash
curl -X POST http://localhost:8000/api/attendances/check-in \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 1,
    "latitude": -8.583400,
    "longitude": 116.116700
  }'
```

#### 4. Check-Out from Class

```bash
curl -X POST http://localhost:8000/api/attendances/check-out \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "attendance_id": 1,
    "latitude": -8.583400,
    "longitude": 116.116700
  }'
```

#### 5. View Attendance Statistics

```bash
curl -X GET http://localhost:8000/api/attendances/statistics \
  -H "Authorization: Bearer {token}" \
  -H "Accept: application/json"
```

---

### Example: Dosen Managing Class

#### 1. Create New Class

```bash
curl -X POST http://localhost:8000/api/classes \
  -H "Authorization: Bearer {dosen_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": 1,
    "name": "Kelas A",
    "room": "R.301",
    "capacity": 40,
    "latitude": -8.583333,
    "longitude": 116.116667,
    "radius": 100,
    "schedules": [
      {
        "day": "Monday",
        "start_time": "08:00:00",
        "end_time": "10:00:00"
      }
    ]
  }'
```

#### 2. View Class Attendance Report

```bash
curl -X GET "http://localhost:8000/api/classes/1/attendances?start_date=2026-01-01&end_date=2026-01-31" \
  -H "Authorization: Bearer {dosen_token}" \
  -H "Accept: application/json"
```

---

## 🧪 Testing

### Manual Testing dengan Postman

1. **Import Postman Collection**
   - Download collection: [Postman Documentation](https://documenter.getpostman.com/view/37522624/2sBXVfiBEM)
   - Import ke Postman
   - Set environment variables

2. **Environment Variables**
```json
{
  "base_url": "http://localhost:8000/api",
  "token": "",
  "user_id": ""
}
```

3. **Testing Flow**
   - Test authentication endpoints
   - Test CRUD operations
   - Test GPS validation
   - Test authorization

---

### Automated Testing dengan PHPUnit

#### Setup Testing Environment

Edit `phpunit.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php">
    <testsuites>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
    </testsuites>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="DB_CONNECTION" value="sqlite"/>
        <env name="DB_DATABASE" value=":memory:"/>
    </php>
</phpunit>
```

#### Run Tests

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test --filter AuthenticationTest

# Run with coverage
php artisan test --coverage

# Run specific test method
php artisan test --filter test_user_can_login
```

#### Example Test Cases

**Feature Test - Authentication:**
```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'mahasiswa',
            'nim' => 'A1B220123'
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'success',
                     'message',
                     'data' => [
                         'user',
                         'access_token',
                         'token_type',
                         'expires_in'
                     ]
                 ]);
    }

    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('password123')
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'john@example.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => ['access_token']
                 ]);
    }

    public function test_login_fails_with_invalid_credentials()
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'wrong@example.com',
            'password' => 'wrongpassword'
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'success' => false
                 ]);
    }
}
```

**Unit Test - GPS Validation:**
```php
<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\GPSValidationService;

class GPSValidationTest extends TestCase
{
    protected $gpsService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->gpsService = new GPSValidationService();
    }

    public function test_calculates_distance_correctly()
    {
        $point1 = ['latitude' => -8.583333, 'longitude' => 116.116667];
        $point2 = ['latitude' => -8.583400, 'longitude' => 116.116700];

        $distance = $this->gpsService->calculateDistance(
            $point1['latitude'],
            $point1['longitude'],
            $point2['latitude'],
            $point2['longitude']
        );

        $this->assertIsFloat($distance);
        $this->assertLessThan(100, $distance);
    }

    public function test_validates_location_within_radius()
    {
        $result = $this->gpsService->isWithinRadius(
            -8.583333,
            116.116667,
            -8.583400,
            116.116700,
            100
        );

        $this->assertTrue($result);
    }

    public function test_rejects_location_outside_radius()
    {
        $result = $this->gpsService->isWithinRadius(
            -8.583333,
            116.116667,
            -8.585000,
            116.118000,
            100
        );

        $this->assertFalse($result);
    }
}
```

#### Test Coverage

Generate test coverage report:
```bash
php artisan test --coverage-html coverage-report
```

View report di `coverage-report/index.html`

---

## 🌐 Deployment

### Deploy ke Railway

Railway adalah platform cloud yang mudah untuk deploy Laravel apps dengan auto-detection.

#### Prerequisites
- Akun Railway ([daftar gratis](https://railway.app/))
- Repository GitHub
- MySQL database (Railway menyediakan)

#### Step-by-Step Deployment

##### 1. Prepare Repository

Pastikan file berikut ada di root project:

**Procfile** (opsional, Railway auto-detect):
```
web: php artisan serve --host=0.0.0.0 --port=$PORT
```

**nixpacks.toml**:
```toml
[phases.build]
cmds = [
  "composer install --no-dev --optimize-autoloader",
  "php artisan config:cache",
  "php artisan route:cache",
  "php artisan view:cache"
]

[start]
cmd = "php artisan serve --host=0.0.0.0 --port=$PORT"
```

##### 2. Push ke GitHub

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

##### 3. Setup Railway Project

1. Login ke [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose repository `attendance-api`
5. Railway akan auto-detect Laravel

##### 4. Add MySQL Database

1. Di Railway Dashboard, click "New"
2. Select "Database" → "MySQL"
3. Database akan otomatis provisioned
4. Connection details akan tersedia di variables

##### 5. Set Environment Variables

Di Railway Dashboard → Variables, tambahkan:

```env
APP_NAME=Attendance API
APP_ENV=production
APP_KEY=base64:your_generated_key
APP_DEBUG=false
APP_URL=https://your-app.railway.app

DB_CONNECTION=mysql
DB_HOST=${{MYSQLHOST}}
DB_PORT=${{MYSQLPORT}}
DB_DATABASE=${{MYSQLDATABASE}}
DB_USERNAME=${{MYSQLUSER}}
DB_PASSWORD=${{MYSQLPASSWORD}}

JWT_SECRET=your_jwt_secret_key
JWT_TTL=60
JWT_REFRESH_TTL=20160

GPS_RADIUS=100
GPS_ENABLE_VALIDATION=true

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

**Generate APP_KEY:**
```bash
php artisan key:generate --show
```

##### 6. Run Migrations

Di Railway Dashboard → Deployments → Click latest deployment → Variables → Add:

```env
RUN_MIGRATIONS=true
```

Atau run manual via Railway CLI:
```bash
railway run php artisan migrate --force
```

##### 7. Deploy

Railway akan auto-deploy setiap push ke GitHub. Track deployment di Dashboard.

**Manual Deploy:**
```bash
railway up
```

##### 8. Get Public URL

Railway akan generate public URL:
```
https://attendance-api.up.railway.app
```

Set di `APP_URL` variable.

---

### Alternative: Deploy ke Heroku

#### Prerequisites
- Akun Heroku
- Heroku CLI installed

#### Deployment Steps

```bash
# Login ke Heroku
heroku login

# Create new app
heroku create attendance-api

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set buildpack
heroku buildpacks:set heroku/php

# Set environment variables
heroku config:set APP_KEY=$(php artisan key:generate --show)
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main

# Run migrations
heroku run php artisan migrate --force

# Open app
heroku open
```

---

### Alternative: Deploy ke VPS (Ubuntu)

#### Server Requirements
- Ubuntu 20.04/22.04 LTS
- Minimum 1GB RAM
- PHP 8.1, Composer, MySQL, Nginx

#### Setup Steps

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP and extensions
sudo apt install -y php8.1 php8.1-fpm php8.1-mysql php8.1-mbstring \
    php8.1-xml php8.1-bcmath php8.1-curl php8.1-zip

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install Nginx
sudo apt install nginx -y

# Clone repository
cd /var/www
sudo git clone https://github.com/username/attendance-api.git
cd attendance-api

# Install dependencies
composer install --no-dev --optimize-autoloader

# Set permissions
sudo chown -R www-data:www-data /var/www/attendance-api
sudo chmod -R 755 /var/www/attendance-api/storage

# Copy environment file
cp .env.example .env
php artisan key:generate

# Configure Nginx
sudo nano /etc/nginx/sites-available/attendance-api
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/attendance-api/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/attendance-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Run migrations
php artisan migrate --force

# Setup SSL with Let's Encrypt (Optional)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. "No application encryption key has been specified"

**Cause:** `APP_KEY` belum di-generate

**Solution:**
```bash
php artisan key:generate
php artisan config:clear
```

---

#### 2. "SQLSTATE[HY000] [1045] Access denied for user"

**Cause:** Database credentials salah

**Solution:**
- Cek `.env` file
- Pastikan MySQL user & password benar
- Test connection:
```bash
mysql -u root -p
```

---

#### 3. "Class 'JWTAuth' not found"

**Cause:** JWT package belum terinstall/terkonfigurasi

**Solution:**
```bash
composer require tymon/jwt-auth
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

---

#### 4. Migration Error: "Table already exists"

**Solution:**
```bash
# Reset semua migrations
php artisan migrate:fresh

# Atau rollback dan migrate ulang
php artisan migrate:rollback
php artisan migrate
```

---

#### 5. GPS Validation Always Fails

**Possible Causes:**
- Latitude/Longitude format salah
- Radius terlalu kecil
- GPS coordinates tidak akurat

**Solution:**
```bash
# Check class location di database
# Pastikan format: latitude (DECIMAL 10,8), longitude (DECIMAL 11,8)

# Test GPS calculation:
php artisan tinker

>>> $distance = app('App\Services\GPSValidationService')->calculateDistance(
...     -8.583333, 116.116667,  // Class location
...     -8.583400, 116.116700   // Student location
... );
>>> dump($distance);
```

---

#### 6. "419 | Page Expired" Error

**Cause:** CSRF token issue

**Solution:**
Tambahkan di `app/Http/Middleware/VerifyCsrfToken.php`:
```php
protected $except = [
    'api/*',
];
```

---

#### 7. CORS Error di Frontend

**Solution:**

Edit `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['https://your-frontend-domain.com'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

Clear config:
```bash
php artisan config:clear
```

---

#### 8. Rate Limit Exceeded (429 Error)

**Solution:**

Edit `app/Http/Kernel.php`:
```php
protected $middlewareGroups = [
    'api' => [
        \Illuminate\Routing\Middleware\ThrottleRequests::class.':120,1', // 120 requests/min
    ],
];
```

---

#### 9. Memory Limit Exhausted

**Solution:**

Edit `php.ini`:
```ini
memory_limit = 256M
upload_max_filesize = 20M
post_max_size = 20M
max_execution_time = 300
```

Restart PHP-FPM:
```bash
sudo systemctl restart php8.1-fpm
```

---

#### 10. Storage Permission Denied

**Solution:**
```bash
# Set correct permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Or for development (not recommended for production)
sudo chmod -R 777 storage bootstrap/cache
```

---

### Debug Mode

Untuk troubleshooting, enable debug mode:

```env
APP_DEBUG=true
LOG_LEVEL=debug
```

View logs:
```bash
tail -f storage/logs/laravel.log
```

---

## 🗺️ Roadmap

### Version 1.0 (Current) ✅
- [x] JWT Authentication
- [x] GPS-based Check-in/out
- [x] Course & Class Management
- [x] Basic Attendance System
- [x] Role-based Authorization
- [x] Attendance Statistics


## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
```bash
# Click 'Fork' button di GitHub
```

2. **Create Feature Branch**
```bash
git checkout -b feature/AmazingFeature
```

3. **Commit Changes**
```bash
git commit -m 'Add some AmazingFeature'
```

4. **Push to Branch**
```bash
git push origin feature/AmazingFeature
```

5. **Open Pull Request**
   - Go to repository di GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Submit PR

### Contribution Guidelines

#### Code Style
- Follow [PSR-12](https://www.php-fig.org/psr/psr-12/) coding standards
- Use meaningful variable names
- Add comments for complex logic
- Write unit tests for new features

#### Commit Messages
```
feat: Add email notification feature
fix: Fix GPS validation bug
docs: Update API documentation
test: Add attendance test cases
refactor: Improve code structure
```

#### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] No breaking changes

## Screenshots (if applicable)
```

### Development Setup

```bash
# Fork & clone
git clone https://github.com/ZeroFound/attendance-api.git
cd attendance-api

# Install dependencies
composer install
npm install # if using frontend assets

# Create branch
git checkout -b feature/your-feature-name

# Make changes and test
php artisan test

# Submit PR
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**Developer:** Andrian

**Email:** andrianwahyusyahputra05@gmail.com


**GitHub:** [@ZeroFound](https://github.com/ZeroFound/attendance-api.git)

**LinkedIn:** [Andrian Wahyu Syahputra](https://www.linkedin.com/in/andrian-wahyu-syahputra-97a390335/)

**Project Link:** [https://github.com/yourusername/attendance-api](https://github.com/yourusername/attendance-api)

**API Documentation:** [Postman Collection](https://documenter.getpostman.com/view/37522624/2sBXVfiBEM)

**Live Demo:** [https://api-absensi-mahasiswa.up.railway.app/](https://api-absensi-mahasiswa.up.railway.app/)

---

## 🙏 Acknowledgments

Special thanks to:

- **[Laravel](https://laravel.com/)** - The best PHP framework
- **[JWT Auth](https://jwt-auth.readthedocs.io/)** - JWT authentication for Laravel
- **[Railway](https://railway.app/)** - Easy deployment platform
- **[Postman](https://www.postman.com/)** - API testing & documentation
- **[GitHub](https://github.com/)** - Code hosting platform
- **Universitas Bumigora** - Educational support
- **Open Source Community** - Amazing tools and libraries

### Resources & Inspiration
- [Laravel Documentation](https://laravel.com/docs/10.x)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Introduction](https://jwt.io/introduction)
- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)
- [PSR Standards](https://www.php-fig.org/psr/)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Andrian

© 2026 API Sistem Absensi Mahasiswa. All Rights Reserved.

</div>
