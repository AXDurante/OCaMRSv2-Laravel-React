<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Technician;


class TechnicianController extends Controller
{

    public function manageProfile() {
        $user = Auth::user();

       
        return Inertia::render('Tech/ManageProfile');
           
    }
    public function updateProfile(Request $request) {
        $theID = $request->input('userID');
        
        $user = Technician::findOrFail($theID);

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

        return redirect()->route('technician.manageProfile')->with('theID', $theID);
    }
}
