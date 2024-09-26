<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobOrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\InstrumentationAccountController;
use App\Http\Controllers\InstrumentationAuthController;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;

// Job Order Route
Route::resource('/jobOrder', JobOrderController::class);

// Resource Route
Route::resource('/viewInstrument', EquipmentController::class);

Route::get('/', function () {
    return Inertia::render('Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('loginHome');

Route::prefix('technician')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Tech/Login');
    })->name('technician.home');
    Route::get('/home2', function () {
        return Inertia::render('Tech/Home2');
    })->name('technician.home2');
    Route::get('/TechnicalServiceReport', function () {
        return Inertia::render('Tech/TSR');
    })->name('technician.TSR');
    Route::get('/CertificateOfCalibration', function () {
        return Inertia::render('Tech/COC');
    })->name('technician.COC');
});

// Route::get('/manage profile', function () {
//     return Inertia::render('Manage Profile');
// });

Route::get('/manage job request', function () {
    return Inertia::render('Manage Job Request');
});

// ADMIN
Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.home');
    Route::get('/admin/account-handler', [AdminController::class, 'accountHandler']);
    Route::get('/admin/approve-profile', [AdminController::class, 'approveProfile']);
    Route::get('/admin/remove-profile', [AdminController::class, 'removeProfile']);
    Route::get('/admin/manage-profile', [AdminController::class, 'manageProfile']);
    Route::get('/admin/show job request', function () {
        return Inertia::render('Show Job Request');
    });

    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    // Instrumentation Account routes
    Route::get('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'index'])->name('admin.instrumentation-accounts.index');
    Route::get('/admin/instrumentation-accounts/create', [InstrumentationAccountController::class, 'create'])->name('admin.instrumentation-accounts.create');
    Route::post('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'store'])->name('admin.instrumentation-accounts.store');
    Route::get('/admin/instrumentation-accounts/{account}', [InstrumentationAccountController::class, 'show'])->name('admin.instrumentation-accounts.show');
    Route::get('/admin/instrumentation-accounts/{account}/edit', [InstrumentationAccountController::class, 'edit'])->name('admin.instrumentation-accounts.edit');
    Route::put('/admin/instrumentation-accounts/{account}', [InstrumentationAccountController::class, 'update'])->name('admin.instrumentation-accounts.update');
    Route::delete('/admin/instrumentation-accounts/{account}', [InstrumentationAccountController::class, 'destroy'])->name('admin.instrumentation-accounts.destroy');
    Route::post('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'store'])->name('admin.instrumentation-accounts.store');
    Route::get('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'index'])->name('admin.instrumentation-accounts.index');
});

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');

// TO REMOVE
Route::get('/test', function () {
    return Inertia::render('VerifyEmail2');
});

Route::get('/feedback', function () {
    return Inertia::render('Feedback');
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect('/landingpage');
    })->name('dashboard');

    Route::get('/manage-profile', [DashboardController::class, 'manageProfile'])
        ->name('manageProfile');

     Route::get('/landingpage', function () {
        return Inertia::render('LandingPage');
    });
});

Route::get('/instrumentation/login', [InstrumentationAuthController::class, 'showLoginForm'])->name('instrumentation.login');
Route::post('/instrumentation/login', [InstrumentationAuthController::class, 'login'])->name('instrumentation.login.submit');

Route::middleware('auth:instrumentation')->group(function () {
    Route::get('/instrumentation/home', function () {
        return Inertia::render('Instrumentation/InstrumentationHome');
    })->name('instrumentation.home');

    // Add a logout route
    Route::post('/instrumentation/logout', [InstrumentationAuthController::class, 'logout'])->name('instrumentation.logout');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});


//needs routings



Route::get('/equipments', [EquipmentController::class, 'index']);
Route::post('/equipments', [EquipmentController::class, 'store']);
require __DIR__ . '/auth.php';


require __DIR__ . '/techAuth.php';