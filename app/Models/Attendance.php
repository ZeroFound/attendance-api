<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'class_id',
        'student_id',
        'date',
        'check_in_time',
        'check_out_time',
        'status',
        'latitude',
        'longitude',
        'checkout_latitude',
        'checkout_longitude',
    ];

    protected $casts = [
        'date' => 'date',
        'check_in_time' => 'datetime',
        'check_out_time' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float',
        'checkout_latitude' => 'float',
        'checkout_longitude' => 'float',
    ];

    public function class()
    {
        return $this->belongsTo(Clazz::class, 'class_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
