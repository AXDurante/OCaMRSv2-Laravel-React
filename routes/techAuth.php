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
use App\Http\Controllers\TechnicianNotificationController;
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

    // TSR Routes
    Route::get('technician/TSR/{id}', [TechnicianController::class, 'indexTSR'])->name('technician.indexTSR');
    Route::get('technician/TSR/{id}/create', [TechnicianController::class, 'createTSR'])->name('technician.TSR'); //Create
    Route::post('technician/TSR/store-tsr', [TechnicianController::class, 'storeTSR'])->name('technician.storeTSR'); //Post
    Route::get('technician/TSR/details/{tsr_id}', [TechnicianController::class, 'viewTSR'])->name('technician.viewTSRDetails');
    Route::put('technician/TSR/{tsr_id}', [TechnicianController::class, 'updateTSR'])->name('technician.updateTSR');
    Route::get('technician/TSR/edit/{tsr_id}', [TechnicianController::class, 'editTSR'])->name('technician.editTSR');
    
    // CoC Routes
    Route::get('technician/COC/{id}/create', [TechnicianController::class, 'createCoC'])->name('technician.COC');
    Route::post('/technician/coc/store', [TechnicianController::class, 'storeCoC'])->name('technician.storeCoC');
    Route::get('technician/COC/details/{coc_id}', [TechnicianController::class, 'viewCoC'])->name('technician.viewCoCDetails');
    Route::get('technician/COC/edit/{coc_id}', [TechnicianController::class, 'editCoC'])->name('technician.editCoC');
    Route::put('technician/COC/{coc_id}', [TechnicianController::class, 'updateCoC'])->name('technician.update-coc');

    Route::resource('/tsr', TechnicianController::class);

    Route::get('technician/ManageProfile', [TechnicianController::class, 'manageProfile'])->name('technician.manageProfile');
    Route::post('technician/update-profile', [TechnicianController::class, 'updateProfile'])->name('technician.updateProfile');

    // Add the route for viewing instruments
    Route::get('technician/viewInstrument', [TechnicianController::class, 'viewInstrument'])->name('technician.viewInstrument');

    // Add this route for checking email verification status for technicians
    Route::get('technician/email/verification/check', function (Request $request) {
        return response()->json(['verified' => $request->user()->hasVerifiedEmail()]);
    })->name('technician.verification.check');

    // Notification Routes
    Route::get('technician/notifications', [TechnicianNotificationController::class, 'index'])
        ->name('technician.notifications.index');
    Route::get('technician/notifications/unread-count', [TechnicianNotificationController::class, 'getUnreadCount'])
        ->name('technician.notifications.unread-count');
    Route::post('technician/notifications/{id}/mark-as-read', [TechnicianNotificationController::class, 'markAsRead'])
        ->name('technician.notifications.mark-as-read');
    Route::post('technician/notifications/mark-all-as-read', [TechnicianNotificationController::class, 'markAllAsRead'])
        ->name('technician.notifications.mark-all-as-read');
});
