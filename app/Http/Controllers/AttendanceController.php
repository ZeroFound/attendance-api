<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Clazz;
use App\Models\ClassEnrollment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    private function haversineMeters($lat1, $lon1, $lat2, $lon2): float
    {
        $earthRadius = 6371000; // meter
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadius * $c;
    }

    public function checkIn(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
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

        // Cek apakah mahasiswa terdaftar di kelas
        $enrolled = ClassEnrollment::where('class_id', $data['class_id'])
            ->where('student_id', $user->id)
            ->exists();

        if (!$enrolled) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda belum terdaftar di kelas ini'
            ], 403);
        }

        $class = Clazz::findOrFail($data['class_id']);
        $today = Carbon::now()->toDateString();

        // Cek sudah check-in hari ini
        $exists = Attendance::where('class_id', $class->id)
            ->where('student_id', $user->id)
            ->where('date', $today)
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda sudah check-in hari ini'
            ], 422);
        }

        // Validasi GPS
        $radius = (int) env('ATTENDANCE_RADIUS_METERS', 100);
        $distance = $this->haversineMeters(
            (float) $data['latitude'],
            (float) $data['longitude'],
            (float) $class->latitude,
            (float) $class->longitude
        );

        $locationValid = $distance <= $radius;

        if (!$locationValid) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lokasi Anda di luar radius kelas',
                'distance_meters' => round($distance, 2),
                'max_radius_meters' => $radius,
                'class_location' => [
                    'latitude' => $class->latitude,
                    'longitude' => $class->longitude,
                    'name' => $class->location
                ]
            ], 422);
        }

        // Buat attendance
        $attendance = Attendance::create([
            'class_id' => $class->id,
            'student_id' => $user->id,
            'date' => $today,
            'check_in_time' => Carbon::now(),
            'status' => 'hadir',
            'latitude' => $data['latitude'],
            'longitude' => $data['longitude'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Check-in berhasil',
            'data' => [
                'id' => $attendance->id,
                'student_name' => $user->name,
                'class_name' => $class->course->course_name ?? 'N/A',
                'check_in_time' => $attendance->check_in_time->format('Y-m-d H:i:s'),
                'status' => $attendance->status,
                'location_valid' => true,
                'distance_meters' => round($distance, 2)
            ]
        ], 201);
    }

    public function checkOut(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
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
        $today = Carbon::now()->toDateString();

        $attendance = Attendance::where('class_id', $data['class_id'])
            ->where('student_id', $user->id)
            ->where('date', $today)
            ->first();

        if (!$attendance || !$attendance->check_in_time) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda belum check-in hari ini'
            ], 422);
        }

        if ($attendance->check_out_time) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda sudah check-out'
            ], 422);
        }

        $attendance->update([
            'check_out_time' => Carbon::now(),
            'checkout_latitude' => $data['latitude'],
            'checkout_longitude' => $data['longitude'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Check-out berhasil',
            'data' => $attendance
        ]);
    }

    public function history()
    {
        $user = auth('api')->user();
        $attendances = Attendance::where('student_id', $user->id)
            ->with('class.course')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $attendances
        ]);
    }

    public function stats()
    {
        $user = auth('api')->user();
        $attendances = Attendance::where('student_id', $user->id)->get();

        $total = $attendances->count();
        $hadir = $attendances->where('status', 'hadir')->count();
        $izin = $attendances->where('status', 'izin')->count();
        $sakit = $attendances->where('status', 'sakit')->count();
        $alpha = $attendances->where('status', 'alpha')->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'total' => $total,
                'hadir' => $hadir,
                'izin' => $izin,
                'sakit' => $sakit,
                'alpha' => $alpha,
                'persentase_hadir' => $total > 0 ? round(($hadir / $total) * 100, 2) : 0
            ]
        ]);
    }

    public function recapByClass($classId)
    {
        $user = auth('api')->user();
        $class = Clazz::findOrFail($classId);

        if ($user->role === 'dosen' && $class->lecturer_id !== $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Anda bukan pengampu kelas ini'
            ], 403);
        }

        $attendances = Attendance::where('class_id', $classId)
            ->with('student')
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'class' => $class->load('course'),
            'data' => $attendances
        ]);
    }

    public function today(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $classId = $request->class_id;
        $today = Carbon::now()->toDateString();

        $students = User::query()
            ->join('class_enrollments', 'users.id', '=', 'class_enrollments.student_id')
            ->where('class_enrollments.class_id', $classId)
            ->leftJoin('attendances', function ($join) use ($today, $classId) {
                $join->on('attendances.student_id', '=', 'users.id')
                     ->where('attendances.class_id', '=', $classId)
                     ->where('attendances.date', '=', $today);
            })
            ->select(
                'users.id',
                'users.name',
                'users.npm',
                'attendances.status',
                'attendances.check_in_time',
                'attendances.check_out_time'
            )
            ->orderBy('users.name')
            ->get();

        return response()->json([
            'status' => 'success',
            'date' => $today,
            'data' => $students
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:hadir,izin,sakit,alpha',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $attendance = Attendance::findOrFail($id);
        $attendance->update(['status' => $request->status]);

        return response()->json([
            'status' => 'success',
            'message' => 'Status absensi berhasil diupdate',
            'data' => $attendance
        ]);
    }

    public function report(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
            'from' => 'nullable|date',
            'to' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $query = Attendance::where('class_id', $request->class_id)
            ->with('student')
            ->orderBy('date', 'desc');

        if ($request->filled('from')) {
            $query->whereDate('date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('date', '<=', $request->to);
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get()
        ]);
    }
}
