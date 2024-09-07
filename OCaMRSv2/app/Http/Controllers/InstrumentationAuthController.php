<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class InstrumentationAuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Instrumentation/InstrumentationLogin');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'id_number' => 'required',
            'password' => 'required',
        ]);

        if (Auth::guard('instrumentation')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('instrumentation.home'));
        }

        return back()->withErrors([
            'id_number' => 'The provided credentials do not match our records.',
        ]);
    }
}
