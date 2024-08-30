<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobOrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Job Order Route
Route::resource('/jobOrder', JobOrderController::class);

Route::get('/', function () {
    return Inertia::render('Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
});

Route::get('/manage profile', function () {
    return Inertia::render('Manage Profile');
});

Route::get('/manage job request', function () {
    return Inertia::render('Manage Job Request');
});

Route::get('/show job request', function () {
    return Inertia::render('Show Job Request');
});

Route::get('/account handler', function () {
    return Inertia::render('Account Handler');
});

Route::get('/test', function () {
    return Inertia::render('VerifyEmail2');
});

Route::get('/original', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/dashboard', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
