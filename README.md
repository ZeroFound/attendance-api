# 📚 API Sistem Absensi Mahasiswa

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Railway-purple?style=for-the-badge&logo=railway)](https://api-absensi-mahasiswa.up.railway.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/ZeroFound/attendance-api)

![Laravel](https://img.shields.io/badge/Laravel-10.x-red?style=flat-square&logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8.1+-blue?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 📖 Deskripsi

API REST untuk sistem pencatatan kehadiran mahasiswa dengan validasi GPS dan autentikasi JWT. Sistem ini memungkinkan mahasiswa melakukan check-in/check-out dengan validasi lokasi real-time, serta memudahkan dosen dalam mengelola dan memantau kehadiran mahasiswa secara digital.

**🔗 API Base URL**: [https://api-absensi-mahasiswa.up.railway.app/](https://api-absensi-mahasiswa.up.railway.app/)

### 🎯 Fitur Utama

- ✅ **Autentikasi & Otorisasi JWT** - Token-based authentication dengan role-based access control (Admin, Dosen, Mahasiswa)
- ✅ **Validasi GPS Real-time** - Check-in hanya valid dalam radius 100 meter dari lokasi kelas menggunakan Haversine Formula
- ✅ **Manajemen Mata Kuliah** - CRUD mata kuliah oleh admin/dosen dengan informasi SKS dan semester
- ✅ **Manajemen Kelas** - Buat kelas, daftarkan mahasiswa, atur jadwal & lokasi GPS
- ✅ **Sistem Absensi** - Check-in/check-out otomatis dengan timestamp dan validasi waktu
- ✅ **Rekap & Laporan** - Statistik kehadiran, persentase hadir, dan laporan per kelas/mahasiswa
- ✅ **Multi-role Support** - Tiga level akses dengan permission berbeda
- ✅ **RESTful API Design** - Standar HTTP methods dan response codes
- ✅ **Error Handling** - Comprehensive error messages dan validation feedback

---

## 🌐 Live Demo & Resources

| Resource | Link | Status |
|----------|------|--------|
| **Live API** | [https://api-absensi-mahasiswa.up.railway.app/](https://api-absensi-mahasiswa.up.railway.app/) | 🟢 Online |
| **API Health** | [/api/health](https://api-absensi-mahasiswa.up.railway.app/api/health) | 🟢 Running |
| **GitHub Repo** | [ZeroFound/attendance-api](https://github.com/ZeroFound/attendance-api) | Public |
| **Postman Collection** | Coming Soon | 📋 Planned |

**Last Updated**: January 10, 2026

---

## 🛠️ Tech Stack

| Komponen | Teknologi | Versi | Keterangan |
|----------|-----------|-------|------------|
| **Framework** | Laravel | 10.x | PHP framework untuk REST API |
| **Language** | PHP | 8.1+ | Backend programming language |
| **Database** | MySQL | 8.0 | Relational database management |
| **Authentication** | JWT | tymon/jwt-auth | Token-based authentication |
| **Validation** | Laravel Validation | Built-in | Request validation rules |
| **GPS Calculation** | Haversine Formula | Custom | Validasi jarak lokasi |
| **API Testing** | Postman | Latest | Manual API testing |
| **Deployment** | Railway | Cloud | Production hosting |
| **Version Control** | Git/GitHub | - | Source code management |

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│                 │      │                  │      │                 │
│  Mobile/Web App │◀────▶│   Laravel API    │◀────▶│   MySQL Server  │
│   (Frontend)    │      │   (Backend)      │      │   (Database)    │
│                 │      │                  │      │                 │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                  │
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              ┌─────▼──────┐            ┌──────▼─────┐
              │            │            │            │
              │  JWT Auth  │            │GPS Validator│
              │ Middleware │            │ (Haversine)│
              │            │            │            │
              └────────────┘            └────────────┘
```

### Database Schema

**Tabel Utama:**

- **users** - Data pengguna sistem (admin, dosen, mahasiswa)
  - id, name, email, password, role, nim/nip, phone, created_at, updated_at

- **courses** - Data mata kuliah
  - id, code, name, credits, semester, description, created_by, created_at, updated_at

- **classes** - Data kelas perkuliahan
  - id, course_id, lecturer_id, class_code, room, semester, academic_year, latitude, longitude, created_at, updated_at

- **class_students** - Relasi mahasiswa dan kelas (pivot table)
  - id, class_id, student_id, enrolled_at

- **attendances** - Record kehadiran mahasiswa
  - id, class_id, student_id, schedule_id, checkin_time, checkout_time, checkin_latitude, checkin_longitude, status, distance, created_at, updated_at

- **class_schedules** - Jadwal kelas dengan koordinat GPS
  - id, class_id, day, start_time, end_time, latitude, longitude, created_at, updated_at

---

## 📋 Prerequisites

Sebelum instalasi, pastikan sudah terinstall:

- **PHP** >= 8.1 dengan extension:
  - OpenSSL PHP Extension
  - PDO PHP Extension
  - Mbstring PHP Extension
  - Tokenizer PHP Extension
  - XML PHP Extension
  - Ctype PHP Extension
  - JSON PHP Extension
- **Composer** (latest version)
- **MySQL** >= 8.0 atau MariaDB >= 10.3
- **Git**
- **Postman** (untuk testing API)

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/ZeroFound/attendance-api.git
cd attendance-api
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Konfigurasi Environment

```bash
# Copy file .env.example
cp .env.example .env

# Generate application key
php artisan key:generate

# Generate JWT secret key
php artisan jwt:secret
```

### 4. Setup Database

Edit file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=attendance_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 5. Migrasi Database

```bash
# Jalankan migrasi
php artisan migrate

# (Opsional) Jalankan seeder untuk data dummy
php artisan db:seed
```

### 6. Jalankan Server

```bash
# Development server
php artisan serve

# Server akan berjalan di http://localhost:8000
```

### 7. Testing API

Import Postman collection atau test manual:

```bash
# Health check
curl http://localhost:8000/api/health
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Deskripsi | Auth Required |
|--------|----------|-----------|---------------|
| POST | `/api/register` | Registrasi user baru | ❌ |
| POST | `/api/login` | Login & dapatkan JWT token | ❌ |
| POST | `/api/logout` | Logout user | ✅ |
| GET | `/api/me` | Info user yang login | ✅ |
| POST | `/api/refresh` | Refresh JWT token | ✅ |

**Example Request - Register:**
```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@student.ac.id",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "mahasiswa",
    "nim": "2024001001",
    "phone": "08123456789"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@student.ac.id",
    "role": "mahasiswa",
    "nim": "2024001001"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Example Request - Login:**
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@student.ac.id",
    "password": "password123"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@student.ac.id",
    "role": "mahasiswa"
  }
}
```

---

### 📚 Courses (Mata Kuliah)

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/courses` | Daftar semua mata kuliah | All |
| GET | `/api/courses/{id}` | Detail mata kuliah | All |
| POST | `/api/courses` | Tambah mata kuliah | Admin, Dosen |
| PUT | `/api/courses/{id}` | Update mata kuliah | Admin, Dosen |
| DELETE | `/api/courses/{id}` | Hapus mata kuliah | Admin |

**Example Request - Create Course:**
```bash
curl -X POST http://localhost:8000/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "CS101",
    "name": "Pemrograman Dasar",
    "credits": 3,
    "semester": 1,
    "description": "Mata kuliah dasar pemrograman"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 1,
    "code": "CS101",
    "name": "Pemrograman Dasar",
    "credits": 3,
    "semester": 1,
    "description": "Mata kuliah dasar pemrograman",
    "created_by": 1,
    "created_at": "2026-01-10T13:25:00.000000Z"
  }
}
```

---

### 🏫 Classes (Kelas)

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/classes` | Daftar semua kelas | Admin, Dosen |
| GET | `/api/classes/my` | Kelas yang saya ajar/ikuti | Dosen, Mahasiswa |
| GET | `/api/classes/{id}` | Detail kelas | All |
| POST | `/api/classes` | Buat kelas baru | Admin, Dosen |
| PUT | `/api/classes/{id}` | Update kelas | Admin, Dosen |
| DELETE | `/api/classes/{id}` | Hapus kelas | Admin |
| POST | `/api/classes/{id}/students` | Tambah mahasiswa ke kelas | Dosen |
| DELETE | `/api/classes/{id}/students/{studentId}` | Hapus mahasiswa dari kelas | Dosen |
| GET | `/api/classes/{id}/students` | Daftar mahasiswa di kelas | Dosen |

**Example Request - Create Class:**
```bash
curl -X POST http://localhost:8000/api/classes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": 1,
    "class_code": "CS101-A",
    "room": "Lab Komputer 1",
    "semester": "Ganjil",
    "academic_year": "2025/2026",
    "latitude": -8.583333,
    "longitude": 116.116667
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Class created successfully",
  "data": {
    "id": 1,
    "course_id": 1,
    "lecturer_id": 2,
    "class_code": "CS101-A",
    "room": "Lab Komputer 1",
    "semester": "Ganjil",
    "academic_year": "2025/2026",
    "latitude": -8.583333,
    "longitude": 116.116667,
    "course": {
      "id": 1,
      "name": "Pemrograman Dasar",
      "code": "CS101"
    }
  }
}
```

---

### 📝 Attendance (Absensi)

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| POST | `/api/attendance/checkin` | Check-in kehadiran | Mahasiswa |
| POST | `/api/attendance/checkout` | Check-out kehadiran | Mahasiswa |
| GET | `/api/attendance/my` | Riwayat absensi saya | Mahasiswa |
| GET | `/api/attendance/class/{classId}` | Absensi per kelas | Dosen |
| GET | `/api/attendance/student/{studentId}` | Absensi per mahasiswa | Dosen |
| GET | `/api/attendance/report/{classId}` | Laporan kehadiran kelas | Dosen |

**Example Request - Check-in:**
```bash
curl -X POST http://localhost:8000/api/attendance/checkin \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 1,
    "schedule_id": 1,
    "latitude": -8.583450,
    "longitude": 116.116780
  }'
```

**Example Response - Check-in Success:**
```json
{
  "success": true,
  "message": "Check-in berhasil",
  "data": {
    "id": 1,
    "class_id": 1,
    "student_id": 1,
    "schedule_id": 1,
    "checkin_time": "2026-01-10T08:05:23.000000Z",
    "checkin_latitude": -8.583450,
    "checkin_longitude": 116.116780,
    "status": "hadir",
    "distance_meters": 45.2,
    "is_location_valid": true,
    "class": {
      "id": 1,
      "class_code": "CS101-A",
      "course": {
        "name": "Pemrograman Dasar"
      }
    }
  }
}
```

**Example Response - Check-in Failed (Out of Range):**
```json
{
  "success": false,
  "message": "Lokasi Anda terlalu jauh dari kelas",
  "data": {
    "distance_meters": 250.5,
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

**Example Request - Attendance Report:**
```bash
curl -X GET "http://localhost:8000/api/attendance/report/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "class": {
      "id": 1,
      "class_code": "CS101-A",
      "course_name": "Pemrograman Dasar"
    },
    "total_students": 30,
    "total_sessions": 14,
    "attendance_summary": [
      {
        "student_id": 1,
        "student_name": "John Doe",
        "nim": "2024001001",
        "total_hadir": 12,
        "total_izin": 1,
        "total_sakit": 1,
        "total_alpha": 0,
        "percentage": 85.7
      }
    ]
  }
}
```

---

### 📅 Schedules (Jadwal)

| Method | Endpoint | Deskripsi | Role |
|--------|----------|-----------|------|
| GET | `/api/schedules/class/{classId}` | Jadwal per kelas | All |
| POST | `/api/schedules` | Tambah jadwal | Dosen |
| PUT | `/api/schedules/{id}` | Update jadwal | Dosen |
| DELETE | `/api/schedules/{id}` | Hapus jadwal | Dosen |

**Example Request - Create Schedule:**
```bash
curl -X POST http://localhost:8000/api/schedules \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 1,
    "day": "Senin",
    "start_time": "08:00:00",
    "end_time": "10:00:00",
    "latitude": -8.583333,
    "longitude": 116.116667
  }'
```

---

## 🔑 Authentication Flow

### Menggunakan JWT Token

Setelah login berhasil, gunakan token JWT pada setiap request:

```bash
curl -X GET http://localhost:8000/api/classes/my \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Token Expiration

- **Default expiration**: 60 menit
- **Refresh token**: Gunakan `/api/refresh` sebelum token expired
- **Auto logout**: Token expired akan otomatis logout user

```bash
# Refresh token
curl -X POST http://localhost:8000/api/refresh \
  -H "Authorization: Bearer YOUR_OLD_TOKEN"
```

---

## 🌍 GPS Validation

### Haversine Formula

Sistem menggunakan Haversine Formula untuk menghitung jarak antara lokasi mahasiswa dan lokasi kelas:

```php
public function calculateDistance($lat1, $lon1, $lat2, $lon2) {
    $earthRadius = 6371000; // meter

    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);

    $a = sin($dLat/2) * sin($dLat/2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon/2) * sin($dLon/2);

    $c = 2 * atan2(sqrt($a), sqrt(1-$a));

    return $earthRadius * $c; // return in meters
}
```

### Validation Rules

- ✅ **Valid**: Jarak ≤ 100 meter dari lokasi kelas
- ❌ **Invalid**: Jarak > 100 meter dari lokasi kelas
- ⏰ **Time Check**: Check-in hanya valid dalam waktu jadwal kelas ± 15 menit

---

## 👥 Role & Permissions

### Admin
- ✅ Full access ke semua endpoint
- ✅ Kelola users, courses, classes
- ✅ View semua data absensi
- ✅ Generate reports

### Dosen (Lecturer)
- ✅ Kelola mata kuliah yang diajar
- ✅ Kelola kelas dan jadwal
- ✅ Tambah/hapus mahasiswa dari kelas
- ✅ View absensi mahasiswa di kelas yang diajar
- ✅ Generate reports kelas

### Mahasiswa (Student)
- ✅ View kelas yang diikuti
- ✅ Check-in/check-out absensi
- ✅ View riwayat absensi pribadi
- ❌ Tidak bisa akses data mahasiswa lain

---

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // response data
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field_name": [
      "Validation error message"
    ]
  }
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat |
| 400 | Bad Request | Request tidak valid |
| 401 | Unauthorized | Token tidak valid/expired |
| 403 | Forbidden | Tidak punya permission |
| 404 | Not Found | Resource tidak ditemukan |
| 422 | Unprocessable Entity | Validation error |
| 500 | Server Error | Internal server error |

---

## 🧪 Testing

### Manual Testing dengan Postman

1. Import collection (coming soon)
2. Set environment variables:
   - `base_url`: `http://localhost:8000/api`
   - `token`: JWT token dari login

### Unit Testing

```bash
# Jalankan semua tests
php artisan test

# Test specific feature
php artisan test --filter=AttendanceTest

# Test dengan coverage
php artisan test --coverage
```

### Sample Test Cases

```php
// Test login
public function test_user_can_login()
{
    $user = User::factory()->create([
        'password' => bcrypt('password123')
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password123'
    ]);

    $response->assertStatus(200)
             ->assertJsonStructure(['token', 'user']);
}

// Test GPS validation
public function test_checkin_fails_when_too_far()
{
    // Test implementation
}
```

---

## 🚀 Deployment

### Deploy ke Railway

1. **Create New Project** di [Railway](https://railway.app)

2. **Connect GitHub Repository**
   - Link repository: `ZeroFound/attendance-api`

3. **Add MySQL Database**
   - Klik "New" → "Database" → "MySQL"
   - Catat credentials yang diberikan

4. **Set Environment Variables**
   ```env
   APP_NAME=Attendance API
   APP_ENV=production
   APP_KEY=base64:your_generated_key
   APP_DEBUG=false
   APP_URL=https://your-app.up.railway.app

   DB_CONNECTION=mysql
   DB_HOST=mysql.railway.internal
   DB_PORT=3306
   DB_DATABASE=railway
   DB_USERNAME=root
   DB_PASSWORD=your_railway_password

   JWT_SECRET=your_jwt_secret
   JWT_TTL=60
   ```

5. **Deploy Settings**
   - Build Command: `composer install --optimize-autoloader --no-dev`
   - Start Command: `php artisan serve --host=0.0.0.0 --port=$PORT`

6. **Run Migrations**
   ```bash
   railway run php artisan migrate --force
   railway run php artisan db:seed --force
   ```

### Deploy ke Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create attendance-api

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set APP_KEY=$(php artisan key:generate --show)
heroku config:set JWT_SECRET=$(php artisan jwt:secret --show)

# Deploy
git push heroku master

# Run migrations
heroku run php artisan migrate --force
```

---

## 📁 Project Structure

```
attendance-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── CourseController.php
│   │   │   ├── ClassController.php
│   │   │   ├── AttendanceController.php
│   │   │   └── ScheduleController.php
│   │   ├── Middleware/
│   │   │   ├── JwtMiddleware.php
│   │   │   └── RoleMiddleware.php
│   │   └── Requests/
│   │       ├── LoginRequest.php
│   │       ├── RegisterRequest.php
│   │       └── CheckinRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Course.php
│   │   ├── Classes.php
│   │   ├── Attendance.php
│   │   └── ClassSchedule.php
│   └── Services/
│       ├── AttendanceService.php
│       └── GPSValidationService.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   └── web.php
├── tests/
│   ├── Feature/
│   └── Unit/
├── .env.example
├── composer.json
├── README.md
└── railway.json
```

---

## 🐛 Troubleshooting

### Common Issues

**1. JWT Token Invalid**
```bash
# Regenerate JWT secret
php artisan jwt:secret --force

# Clear cache
php artisan config:clear
php artisan cache:clear
```

**2. GPS Validation Always Fails**
```php
// Check di GPSValidationService.php
// Pastikan radius dalam meter (default: 100)
protected $maxDistance = 100; // meters
```

**3. Database Connection Error**
```bash
# Test database connection
php artisan tinker
> DB::connection()->getPdo();

# Clear config cache
php artisan config:clear
```

**4. CORS Error**
```php
// Install Laravel CORS
composer require fruitcake/laravel-cors

// Publish config
php artisan vendor:publish --provider="Fruitcake\Cors\CorsServiceProvider"
```

---

## 🔒 Security

### Best Practices

- ✅ Gunakan HTTPS di production
- ✅ Set `APP_DEBUG=false` di production
- ✅ Gunakan environment variables untuk credentials
- ✅ Implement rate limiting
- ✅ Validate semua input
- ✅ Sanitize output
- ✅ Regular security updates

### Rate Limiting

```php
// routes/api.php
Route::middleware(['throttle:60,1'])->group(function () {
    // 60 requests per minute
});
```

---

## 🤝 Contributing

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Development Guidelines

- Ikuti PSR-12 coding standards
- Write meaningful commit messages
- Add tests untuk fitur baru
- Update documentation
- Ensure all tests pass

---

## 📝 Changelog

### Version 1.0.0 (January 2026)
- ✨ Initial release
- ✅ JWT Authentication
- ✅ GPS-based attendance
- ✅ Multi-role support
- ✅ RESTful API endpoints
- ✅ Deployed to Railway

### Planned Features (v1.1.0)
- 📱 Push notifications
- 📊 Advanced analytics
- 📄 PDF report export
- 🔔 Email notifications
- 📸 Photo verification
- 🌐 Multi-language support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 ZeroFound

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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Author

**Andrian (ZeroFound)**
- GitHub: [@ZeroFound](https://github.com/ZeroFound)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [Your Portfolio](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- Laravel Framework Team
- tymon/jwt-auth Package
- Railway Platform
- Universitas Bumigora
- All contributors and testers

---

## 📞 Support

Jika ada pertanyaan atau masalah:

1. **GitHub Issues**: [Create an issue](https://github.com/ZeroFound/attendance-api/issues)
2. **Email**: your.email@example.com
3. **Documentation**: [API Docs](https://api-absensi-mahasiswa.up.railway.app/docs)

---

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/ZeroFound/attendance-api?style=social)
![GitHub Forks](https://img.shields.io/github/forks/ZeroFound/attendance-api?style=social)
![GitHub Issues](https://img.shields.io/github/issues/ZeroFound/attendance-api)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ZeroFound/attendance-api)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [ZeroFound](https://github.com/ZeroFound)

[🔝 Back to Top](#-api-sistem-absensi-mahasiswa)

</div>
