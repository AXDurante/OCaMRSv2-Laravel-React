<?php

namespace App\Http\Controllers\TechAuth;

use App\Http\Controllers\Controller;
use App\Models\Technician;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Tech/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&]/',
            ],
            'employeeID' => 'required|string|max:255|unique:users',
            'phoneNumber' => 'required|string|max:255|unique:users',
        ], [
            'email.unique' => 'The email has already been taken.',
            'employeeID.unique' => 'The ID number has already been taken.',
            'phoneNumber.unique' => 'The phone number has already been taken.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.regex' => 'The password must include at least one uppercase letter, one number, and one special character.',
        ]);

        $technician = Technician::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'employeeID' => $request->employeeID,
            'phoneNumber' => $request->phoneNumber,
            'college' => $request->college,
            'labLoc' => $request->labLoc,
        ]);

        // Fire the Registered event (optional, if you still need it)
        event(new Registered($technician));

        // Log in the technician
        Auth::login($technician);

        // Redirect to the technician dashboard
        return redirect()->route('technician.home');
    }
}
