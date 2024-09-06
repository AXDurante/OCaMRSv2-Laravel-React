<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobOrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController; 
use App\Http\Controllers\AdminAuthController;
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


// ADMIN
Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.home');
    Route::get('/admin/account-handler', [AdminController::class, 'accountHandler']);
    Route::get('/admin/approve-profile', [AdminController::class, 'approveProfile']);
    Route::get('/admin/remove-profile', [AdminController::class, 'removeProfile']);
    Route::get('/admin/manage-profile', [AdminController::class, 'manageProfile']);
    
});

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');

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
