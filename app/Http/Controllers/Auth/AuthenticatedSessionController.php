<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Login', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);

   
            
      
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            // First check if the user exists
            $user = User::where('employeeID', $request->employeeID)->first();

            if (!$user) {
                return Inertia::render('Login', [
                    'errorMessage' => 'User ID not found.'
                ]);
            }

            // Attempt authentication
            if (!Auth::attempt($request->only('employeeID', 'password'))) {
                // If user exists but authentication fails, it means password is wrong
                return Inertia::render('Login', [
                    'errorMessage' => 'User ID does not match the password.'
                ]);
            }

            // If authentication successful
            $request->session()->regenerate();
            return redirect()->route('dashboard');

        } catch (ValidationException $e) {
            return Inertia::render('Login', [
                'errorMessage' => 'Invalid User ID.'
            ]);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
