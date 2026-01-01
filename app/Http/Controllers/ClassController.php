<?php

namespace App\Http\Controllers;

use App\Models\Clazz;
use App\Models\ClassEnrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClassController extends Controller
{
    public function index(Request $request)
    {
        $query = Clazz::with(['course', 'lecturer'])->orderBy('id', 'desc');

        if ($request->filled('lecturer_id')) {
            $query->where('lecturer_id', $request->lecturer_id);
        }

        if ($request->filled('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'lecturer_id' => 'required|exists:users,id',
            'schedule' => 'required|string|max:100',
            'location' => 'required|string|max:150',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        $lecturer = User::findOrFail($data['lecturer_id']);
        if (!in_array($lecturer->role, ['dosen', 'admin'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'lecturer_id harus role dosen atau admin'
            ], 422);
        }

        $class = Clazz::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Kelas berhasil dibuat',
            'data' => $class->load(['course', 'lecturer'])
        ], 201);
    }

    public function enroll(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $class = Clazz::findOrFail($id);
        $student = User::findOrFail($request->student_id);

        if ($student->role !== 'mahasiswa') {
            return response()->json([
                'status' => 'error',
                'message' => 'student_id harus role mahasiswa'
            ], 422);
        }

        $exists = ClassEnrollment::where('class_id', $id)
            ->where('student_id', $request->student_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mahasiswa sudah terdaftar di kelas ini'
            ], 422);
        }

        ClassEnrollment::create([
            'class_id' => $id,
            'student_id' => $request->student_id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Mahasiswa berhasil didaftarkan ke kelas'
        ]);
    }

    public function students($id)
    {
        $class = Clazz::findOrFail($id);

        $students = User::query()
            ->join('class_enrollments', 'users.id', '=', 'class_enrollments.student_id')
            ->where('class_enrollments.class_id', $id)
            ->select('users.id', 'users.name', 'users.email', 'users.npm', 'users.role', 'class_enrollments.enrolled_at')
            ->orderBy('users.name')
            ->get();

        return response()->json([
            'status' => 'success',
            'class' => $class->load('course'),
            'data' => $students
        ]);
    }
}
