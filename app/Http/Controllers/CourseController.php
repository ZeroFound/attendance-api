<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::orderBy('id', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_code' => 'required|string|max:30|unique:courses,course_code',
            'course_name' => 'required|string|max:150',
            'credits' => 'required|integer|min:1|max:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $course = Course::create($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Mata kuliah berhasil dibuat',
            'data' => $course
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'course_code' => "sometimes|required|string|max:30|unique:courses,course_code,$id",
            'course_name' => 'sometimes|required|string|max:150',
            'credits' => 'sometimes|required|integer|min:1|max:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $course->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Mata kuliah berhasil diupdate',
            'data' => $course
        ]);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Mata kuliah berhasil dihapus'
        ]);
    }
}
