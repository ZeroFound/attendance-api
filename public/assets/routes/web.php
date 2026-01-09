<?php

use Illuminate\Support\Facades\Route;

// Redirect root ke index.html
Route::get('/', function () {
    return file_get_contents(public_path('index.html'));
});
