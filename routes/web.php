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
use App\Http\Controllers\TechnicianController;
use App\Http\Controllers\FeedbackControllerAdmin;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminNotificationController;

// Job Order Route
Route::resource('/jobOrder', JobOrderController::class);

// Resource Route
Route::resource('/viewInstrument', EquipmentController::class);
Route::post('/equipment', [EquipmentController::class, 'store']);

Route::get('/', function () {
    return Inertia::render('Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('loginHome')->middleware('technician.auth');

Route::prefix('technician')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Tech/Login');
    })->name('technician.home')->middleware('technician.auth');
    /*
    Route::get('/Dashboard', function () {
        return Inertia::render('Tech/Dashboard');
    })->name('technician.Dashboard');
    */
    // Route::get('/TSR', function () {
    //     return Inertia::render('Tech/TSR');
    // })->name('technician.TSR');
    //    Route::get('/COC', function () {
    //        return Inertia::render('Tech/COC');
    //     })->name('technician.COC');
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
    Route::get('/admin/manage-profile', [AdminController::class, 'manageProfile'])->name('admin.manageProfile');
    Route::get('/admin/view-instrument', [AdminController::class, 'showViewInstrument']);
    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    Route::get('/admin/showJobOrder/{id}', [AdminController::class, 'showJobOrder'])->name('admin.showJobOrder');
    Route::get('/admin/showJobOrder/{id}/edit', [AdminController::class, 'editJobOrder']);
    Route::put('/admin/showJobOrder/{id}', [AdminController::class, 'updateJobOrder'])->name('admin.updateJobOrder');

    // TSR
    Route::get('/admin/TSR/{id}', [AdminController::class, 'indexTSR'])->name('admin.indexTSR');
    Route::get('/admin/TSR/details/{tsr_id}', [AdminController::class, 'viewTSR'])->name('admin.viewTSRDetails');
    Route::put('/admin/TSR/{tsr_id}', [AdminController::class, 'updateTSR'])->name('admin.updateTSR');
    Route::get('/admin/TSR/edit/{tsr_id}', [AdminController::class, 'editTSR'])->name('admin.editTSR');

    // COC
    Route::get('/admin/COC/{tsr_id}', [AdminController::class, 'indexCoC'])->name('admin.indexCOC');
    Route::get('/admin/COC/details/{coc_id}', [AdminController::class, 'viewCoC'])->name('admin.viewCoCDetails');
    Route::get('/admin/COC/edit/{coc_id}', [AdminController::class, 'editCoC'])->name('admin.editCoC');
    Route::put('/admin/COC/{coc_id}', [AdminController::class, 'updateCoC'])->name('admin.update-coc');

    // Instrumentation Account routes

    Route::get('/admin/edit/technician/{id}', [InstrumentationAccountController::class, 'editTech'])->name('admin.edit.tech');
    Route::post('/admin/edit/technician/{id}', [InstrumentationAccountController::class, 'editTechPOST'])->name('admin.update.tech');

    Route::get('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'index'])->name('admin.instrumentation-accounts.index');
    Route::get('/admin/instrumentation-accounts/create', [InstrumentationAccountController::class, 'create'])->name('admin.instrumentation-accounts.create');
    Route::post('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'store'])->name('admin.instrumentation-accounts.store');
    Route::get('/admin/instrumentation-accounts/{account}', [InstrumentationAccountController::class, 'show'])->name('admin.instrumentation-accounts.show');
    Route::get('/admin/instrumentation-accounts/{account}/edit', [InstrumentationAccountController::class, 'edit'])->name('admin.instrumentation-accounts.edit');
    Route::put('/admin/instrumentation-accounts/{account}', [InstrumentationAccountController::class, 'update'])->name('admin.instrumentation-accounts.update');
    Route::delete('/admin/instrumentation-accounts/{account}', [InstrumentationAccountController::class, 'destroy'])->name('admin.instrumentation-accounts.destroy');
    Route::post('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'store'])->name('admin.instrumentation-accounts.store');
    Route::get('/admin/instrumentation-accounts', [InstrumentationAccountController::class, 'index'])->name('admin.instrumentation-accounts.index');

    // Admin Feedback routes
    Route::controller(FeedbackControllerAdmin::class)->group(function () {
        Route::get('/admin/feedback', 'index')->name('admin.feedback.index');
        Route::get('/admin/feedback/{id}', 'show')->name('admin.feedback.show');
        Route::delete('/admin/feedback/{feedback}', 'destroy')->name('admin.feedback.destroy');
    });

    Route::post('/admin/manage-profile', [AdminController::class, 'updateProfile'])
        ->name('admin.updateProfile')
        ->middleware(['web']);

    // Admin Notification Routes
    Route::get('admin/notifications', [AdminNotificationController::class, 'index'])
        ->name('admin.notifications.index');
    Route::get('admin/notifications/unread-count', [AdminNotificationController::class, 'getUnreadCount'])
        ->name('admin.notifications.unread-count');
    Route::post('admin/notifications/{id}/mark-as-read', [AdminNotificationController::class, 'markAsRead'])
        ->name('admin.notifications.mark-as-read');
    Route::post('admin/notifications/mark-all-as-read', [AdminNotificationController::class, 'markAllAsRead'])
        ->name('admin.notifications.mark-all-as-read');

    Route::patch('/admin/updateJobStatus/{id}', [AdminController::class, 'updateJobStatus'])
        ->name('admin.updateJobStatus');
});

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login')->middleware('technician.auth');
;
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');

// TO REMOVE
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect('/landingpage');
    })->name('dashboard');

    Route::get('/manage-profile', [DashboardController::class, 'manageProfile'])
        ->name('manageProfile');

    Route::post('/manage-profile', [DashboardController::class, 'update'])
        ->name('updateProfile');

    Route::get('/landingpage', function () {
        return Inertia::render('LandingPage');
    })->name('landingpage');

    // New Notification Routes
    Route::controller(NotificationController::class)->group(function () {
        Route::get('/notifications', 'index')->name('notifications.index');
        Route::get('/notifications/poll', 'poll');
        Route::get('/notifications/unread-count', 'getUnreadCount');
        Route::post('/notifications/{id}/mark-as-read', 'markAsRead');
        Route::post('/notifications/mark-all-as-read', 'markAllAsRead');
    });

    Route::controller(FeedbackController::class)->group(function () {
        Route::get('/feedback/create/{jobOrderId}', 'create')->name('feedback.create');
        Route::post('/feedback', 'store')->name('feedback.store');
        Route::get('/feedback/{feedback}', 'show')->name('feedback.show');
        Route::put('/feedback/{feedback}', 'update')->name('feedback.update');
        Route::delete('/feedback/{feedback}', 'destroy')->name('feedback.destroy');
        Route::get('/feedback/{feedback}/edit', 'edit')->name('feedback.edit');
    });
});

Route::get('/instrumentation/login', [InstrumentationAuthController::class, 'showLoginForm'])->name('instrumentation.login');
Route::post('/instrumentation/login', [InstrumentationAuthController::class, 'login'])->name('instrumentation.login.submit');

// Route::middleware('auth:instrumentation')->group(function () {
//     Route::get('/instrumentation/home', function () {
//         return Inertia::render('Instrumentation/InstrumentationHome');
//     })->name('instrumentation.home');

//     // Add a logout route
//     Route::post('/instrumentation/logout', [InstrumentationAuthController::class, 'logout'])->name('instrumentation.logout');
// });

Route::get('/instrumentation/home', function () {
    return Inertia::render('Instrumentation/InstrumentationHome');
})->name('instrumentation.home');

// Add a logout route
Route::post('/instrumentation/logout', [InstrumentationAuthController::class, 'logout'])->name('instrumentation.logout');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});


//needs routings




require __DIR__ . '/auth.php';


require __DIR__ . '/techAuth.php';

