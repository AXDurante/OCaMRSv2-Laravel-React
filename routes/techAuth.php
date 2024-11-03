<?php

use App\Http\Controllers\TechAuth\AuthenticatedSessionController;
use App\Http\Controllers\TechAuth\ConfirmablePasswordController;
use App\Http\Controllers\TechAuth\EmailVerificationNotificationController;
use App\Http\Controllers\TechAuth\EmailVerificationPromptController;
use App\Http\Controllers\TechAuth\NewPasswordController;
use App\Http\Controllers\TechAuth\PasswordController;
use App\Http\Controllers\TechAuth\PasswordResetLinkController;
use App\Http\Controllers\TechAuth\RegisteredUserController;
use App\Http\Controllers\TechAuth\VerifyEmailController;
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\EquipmentController; // Import EquipmentController
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Middleware for guest technicians
Route::middleware('guest')->group(function () {
    Route::get('technician/register', [RegisteredUserController::class, 'create'])->name('technician.register');
    Route::post('technician/register', [RegisteredUserController::class, 'store']);
    Route::get('technician/login', [AuthenticatedSessionController::class, 'create'])->name('technician.login')->middleware('technician.auth');
    Route::post('technician/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('technician/forgot-password', [PasswordResetLinkController::class, 'create'])->name('technician.password.request');
    Route::post('technician/forgot-password', [PasswordResetLinkController::class, 'store'])->name('technician.password.email');
    Route::get('technician/reset-password/{token}', [NewPasswordController::class, 'create'])->name('technician.password.reset');
    Route::post('technician/reset-password', [NewPasswordController::class, 'store'])->name('technician.password.store');
});

// Middleware for authenticated technicians
Route::middleware('auth:technicians')->group(function () {
    Route::get('technician/verify-email', [EmailVerificationPromptController::class, 'show'])->name('technician.verification.notice');
    Route::get('technician/verify-email/{id}/{hash}', [VerifyEmailController::class, 'verify'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('technician.verification.verify');
    Route::post('technician/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('technician.verification.send');
    Route::get('technician/confirm-password', [ConfirmablePasswordController::class, 'show'])->name('technician.password.confirm');
    Route::post('technician/confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::put('technician/password', [PasswordController::class, 'update'])->name('technician.password.update');
    Route::post('technician/logout', [AuthenticatedSessionController::class, 'destroy'])->name('technician.logout');

    Route::get('technician/dashboard', [TechnicianController::class, 'index'])->name('technician.dashboard');
    Route::get('technician/showJobOrder/{id}', [TechnicianController::class, 'showJobOrder'])->name('technician.showJobOrder');
    Route::get('technician/showJobOrder/{id}/edit', [TechnicianController::class, 'editJobOrder']);
    Route::put('technician/showJobOrder/{id}', [TechnicianController::class, 'updateJobOrder'])->name('technician.updateJobOrder');

    Route::get('technician/TSR/{id}', [TechnicianController::class, 'createTSR'])->name('technician.TSR');
    Route::get('technician/COC', function () {
        return Inertia::render('Tech/COC');
    })->name('technician.COC');
    Route::post('technician/TSR/store-tsr', [TechnicianController::class, 'storeTSR'])->name('technician.store-tsr');

    Route::resource('/tsr', TechnicianController::class);

    Route::get('technician/ManageProfile', [TechnicianController::class, 'manageProfile'])->name('technician.manageProfile');
    Route::post('technician/update-profile', [TechnicianController::class, 'updateProfile'])->name('technician.updateProfile');

    // Add the route for viewing instruments
    Route::get('technician/viewInstrument', [TechnicianController::class, 'viewInstrument'])->name('technician.viewInstrument');

    // Add this route for checking email verification status for technicians
    Route::get('technician/email/verification/check', function (Request $request) {
        return response()->json(['verified' => $request->user()->hasVerifiedEmail()]);
    })->name('technician.verification.check');
});
