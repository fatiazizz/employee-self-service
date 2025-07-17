<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('leave-request', function () {
        return Inertia::render('leave/index');
    })->name('leave-request');

    Route::get('leave-request/create', function () {
        return Inertia::render('leave/create');
    })->name('leave-request-create');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
