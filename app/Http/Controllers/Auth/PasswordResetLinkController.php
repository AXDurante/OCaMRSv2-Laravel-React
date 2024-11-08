<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
        {
        
            $request->validate([
                'identifier' => 'required|string',
            ]);

          
            $user = null;
            if (filter_var($request->identifier, FILTER_VALIDATE_EMAIL)) {
            
                $user = \App\Models\User::where('email', $request->identifier)->first();
            } else {
               
                $user = \App\Models\User::where('employeeID', $request->identifier)->first();
            }

            if (!$user) {
              
                throw ValidationException::withMessages([
                    'identifier' => ['No user found with this email or employee ID.'],
                ]);
            }

          
            $status = Password::sendResetLink(
                ['email' => $user->email] 
            );

            if ($status == Password::RESET_LINK_SENT) {
                return back()->with('status', __($status));
            }

            throw ValidationException::withMessages([
                'identifier' => [trans($status)],
            ]);
        }

}
