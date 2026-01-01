<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code', 30)->unique();
            $table->string('course_name', 150);
            $table->unsignedTinyInteger('credits');
            $table->timestamps();

            $table->index('course_code');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
