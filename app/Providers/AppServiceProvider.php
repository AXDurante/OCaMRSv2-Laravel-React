<?php

namespace App\Providers;
use App\Models\Technician;
use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
   
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
            if ($user instanceof Technician) {
                return 'http://127.0.0.1:8000/technician/reset-password/' . $token  . '?email=' . urlencode($user->email);
            } elseif ($user instanceof User) {
                return 'http://127.0.0.1:8000/reset-password/' . $token . '?email=' . urlencode($user->email);
            }
    
            // Default to a generic URL if the user type is unknown
            return 'http://127.0.0.1:8000/reset-password/' . $token;
        });

        $appUrl = URL::to('/');
        $isProduction = app()->environment('production');

        Inertia::share([
            'appUrl' => $appUrl,
            'isProduction' => $isProduction,
            'storageBaseUrl' => $isProduction ? $appUrl . '/public/storage' : $appUrl . '/storage',
        ]);
    }
}
