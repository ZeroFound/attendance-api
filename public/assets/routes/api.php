<?php

use Illuminate\Support\Facades\Route;

// Root route - serve index.html
Route::get('/', function () {
    return view('welcome');
});

// Catch all routes except /api (untuk SPA routing)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*$');
