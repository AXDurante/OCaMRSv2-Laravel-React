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
        $appUrl = config('app.url');
        $isProduction = app()->environment('production');

        ResetPassword::createUrlUsing(function ($user, string $token) use ($appUrl, $isProduction) {
            $resetUrl = $isProduction ? 'https://leso.online' : 'http://127.0.0.1:8000';
            
            if ($user instanceof Technician) {
                return $resetUrl . '/technician/reset-password/' . $token . '?email=' . urlencode($user->email);
            } elseif ($user instanceof User) {
                return $resetUrl . '/reset-password/' . $token . '?email=' . urlencode($user->email);
            }

            // Default to a generic URL if the user type is unknown
            return $resetUrl . '/reset-password/' . $token;
        });

        Inertia::share([
            'appUrl' => $appUrl,
            'isProduction' => $isProduction,
            'storageBaseUrl' => $isProduction ? $appUrl . '/public/storage' : $appUrl . '/storage',
        ]);
    }
}
