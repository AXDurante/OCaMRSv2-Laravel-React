<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'firstName' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'lastName' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&_]/',
            ],
            'employeeID' => 'required|string|max:255|unique:users',
            'phoneNumber' => ['required', 'string', 'max:255', 'unique:users', 'regex:/^[0-9]+$/', 'size:11'],
            'college' => 'required|string|max:255',
            'labLoc' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ], [
            'firstName.regex' => 'The first name field must only contain letters.',
            'lastName.regex' => 'The last name field must only contain letters.',
            'phoneNumber.regex' => 'The phone number must only contain numbers.',
            'phoneNumber.size' => 'The phone number must be exactly 11 digits.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.regex' => 'The password must include at least one uppercase letter, one number, and one special character.',
        ]);


        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'employeeID' => $request->employeeID,
            'phoneNumber' => $request->phoneNumber,
            'college' => $request->college,
            'labLoc' => $request->labLoc,
            'position' => $request->position,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    public function getPositions()
    {
        return DB::table('users')
            ->select('position', DB::raw('COUNT(*) as count'))
            ->whereNotNull('position')
            ->where('position', '!=', '')
            ->groupBy('position')
            ->having('count', '>=', 3)
            ->pluck('position')
            ->values()
            ->toArray();
    }
}
