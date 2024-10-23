<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

       
        return Inertia::render('Home', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
        ]);
    }
    
    public function manageProfile() {
        $user = Auth::user();

       
        return Inertia::render('ManageProfile', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'theID' => session('theID'), // Retrieve the flashed value
        ]);
    }

    public function update(Request $request) {
        $theID = $request->input('userID');
        
        $user = User::findOrFail($theID);

        // Validate the request data
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $theID,
            'phoneNumber' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/',
        ]);
        
        // Remove password field if it's empty
        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        } else {
            // Hash the new password
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        // Update the user with validated data
        $user->update($validatedData);

        return redirect()->route('manageProfile')->with('theID', $theID);
    }
}
