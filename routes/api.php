<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\AttendanceController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
});

// Protected routes
Route::middleware('jwt.auth')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::get('profile', [AuthController::class, 'profile']);
        Route::post('logout', [AuthController::class, 'logout']);
    });

    // Courses (admin & dosen only for CUD, all can read)
    Route::get('courses', [CourseController::class, 'index']);
    Route::middleware('role:admin,dosen')->group(function () {
        Route::post('courses', [CourseController::class, 'store']);
        Route::put('courses/{id}', [CourseController::class, 'update']);
        Route::delete('courses/{id}', [CourseController::class, 'destroy']);
    });

    // Classes
    Route::get('classes', [ClassController::class, 'index']);
    Route::middleware('role:admin,dosen')->group(function () {
        Route::post('classes', [ClassController::class, 'store']);
        Route::post('classes/{id}/enroll', [ClassController::class, 'enroll']);
        Route::get('classes/{id}/students', [ClassController::class, 'students']);
    });

    // Attendance - Mahasiswa
    Route::middleware('role:mahasiswa')->group(function () {
        Route::post('attendances/check-in', [AttendanceController::class, 'checkIn']);
        Route::post('attendances/check-out', [AttendanceController::class, 'checkOut']);
        Route::get('attendances/history', [AttendanceController::class, 'history']);
        Route::get('attendances/stats', [AttendanceController::class, 'stats']);
    });

    // Attendance - Dosen/Admin
    Route::middleware('role:admin,dosen')->group(function () {
        Route::get('attendances/class/{classId}', [AttendanceController::class, 'recapByClass']);
        Route::get('attendances/today', [AttendanceController::class, 'today']);
        Route::put('attendances/{id}', [AttendanceController::class, 'updateStatus']);
        Route::get('attendances/report', [AttendanceController::class, 'report']);
    });
});
