# 📚 API Sistem Absensi Mahasiswa

API REST untuk sistem pencatatan kehadiran mahasiswa dengan validasi GPS dan autentikasi JWT. Dibangun dengan Laravel 10, MySQL, dan JWT Authentication.

![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=flat-square&logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8.1+-blue?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📖 Deskripsi

Sistem absensi digital yang memungkinkan mahasiswa melakukan check-in/check-out dengan validasi lokasi GPS, serta memudahkan dosen dalam mengelola dan memantau kehadiran mahasiswa secara real-time. 

### 🎯 Fitur Utama

- ✅ **Autentikasi & Otorisasi JWT** - Token-based authentication dengan role-based access control
- ✅ **Validasi GPS Real-time** - Check-in hanya valid dalam radius 100 meter dari lokasi kelas
- ✅ **Manajemen Mata Kuliah** - CRUD mata kuliah oleh admin/dosen
- ✅ **Manajemen Kelas** - Buat kelas, daftarkan mahasiswa, atur jadwal & lokasi
- ✅ **Sistem Absensi** - Check-in/check-out otomatis dengan timestamp
- ✅ **Rekap & Laporan** - Statistik kehadiran dan laporan per kelas
- ✅ **Multi-role Support** - Admin, Dosen, dan Mahasiswa dengan hak akses berbeda

---

## 🛠️ Tech Stack

| Komponen | Teknologi | Keterangan |
|----------|-----------|------------|
| **Framework** | Laravel 10.x | PHP framework untuk REST API |
| **Database** | MySQL 8.0 | Relational database |
| **Authentication** | JWT (tymon/jwt-auth) | Token-based auth |
| **Validation** | Laravel Validation | Built-in validation rules |
| **GPS Calculation** | Haversine Formula | Validasi jarak lokasi |
| **API Testing** | Postman | Manual testing & documentation |
| **Deployment** | Railway | Cloud platform for deployment |

---

## 📋 Prerequisites

Sebelum instalasi, pastikan sudah terinstall:

- PHP >= 8.1
- Composer
- MySQL >= 8.0
- Git
- Postman (untuk testing)

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/<username>/attendance-api.git
cd attendance-api
