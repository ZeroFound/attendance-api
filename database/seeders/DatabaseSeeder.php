<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Course;
use App\Models\Clazz;
use App\Models\ClassEnrollment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin System',
            'email' => 'admin@mail.com',
            'password' => Hash::make('secret123'),
            'role' => 'admin',
        ]);

        // Dosen
        $dosen1 = User::create([
            'name' => 'Dr. Budi Santoso',
            'email' => 'budi@mail.com',
            'password' => Hash::make('secret123'),
            'role' => 'dosen',
        ]);

        $dosen2 = User::create([
            'name' => 'Dr. Siti Nurhaliza',
            'email' => 'siti.dosen@mail.com',
            'password' => Hash::make('secret123'),
            'role' => 'dosen',
        ]);

        // Mahasiswa
        $mhs1 = User::create([
            'name' => 'Andrian',
            'email' => 'andrian@mail.com',
            'password' => Hash::make('secret123'),
            'role' => 'mahasiswa',
            'npm' => '20230001',
        ]);

        $mhs2 = User::create([
            'name' => 'Siti Aisyah',
            'email' => 'siti@mail.com',
            'password' => Hash::make('secret123'),
            'role' => 'mahasiswa',
            'npm' => '20230002',
        ]);

        $mhs3 = User::create([
            'name' => 'Ahmad Fauzi',
            'email' => 'ahmad@mail.com',
            'password' => Hash::make('secret123'),
            'role' => 'mahasiswa',
            'npm' => '20230003',
        ]);

        // Courses
        $course1 = Course::create([
            'course_code' => 'IF101',
            'course_name' => 'Pemrograman Web Service',
            'credits' => 3,
        ]);

        $course2 = Course::create([
            'course_code' => 'IF102',
            'course_name' => 'Basis Data Lanjutan',
            'credits' => 3,
        ]);

        $course3 = Course::create([
            'course_code' => 'IF103',
            'course_name' => 'Keamanan Siber',
            'credits' => 2,
        ]);

        // Classes
        $class1 = Clazz::create([
            'course_id' => $course1->id,
            'lecturer_id' => $dosen1->id,
            'schedule' => 'Senin 08:00-10:00',
            'location' => 'Kampus Universitas Bumigora - Gedung A Ruang 101',
            'latitude' => -8.583069,
            'longitude' => 116.116600,
        ]);

        $class2 = Clazz::create([
            'course_id' => $course2->id,
            'lecturer_id' => $dosen2->id,
            'schedule' => 'Rabu 13:00-15:00',
            'location' => 'Kampus Universitas Bumigora - Gedung B Ruang 202',
            'latitude' => -8.583100,
            'longitude' => 116.116700,
        ]);

        // Enrollments
        ClassEnrollment::create(['class_id' => $class1->id, 'student_id' => $mhs1->id]);
        ClassEnrollment::create(['class_id' => $class1->id, 'student_id' => $mhs2->id]);
        ClassEnrollment::create(['class_id' => $class1->id, 'student_id' => $mhs3->id]);

        ClassEnrollment::create(['class_id' => $class2->id, 'student_id' => $mhs1->id]);
        ClassEnrollment::create(['class_id' => $class2->id, 'student_id' => $mhs2->id]);
    }
}
