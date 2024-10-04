<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Technician;
use Illuminate\Support\Facades\Storage;

class TechnicianController extends Controller
{

    public function manageProfile() {
        $user = Auth::user();
        return Inertia::render('Tech/ManageProfile', [
            'user' => $user
        ]);
    }

    public function updateProfile(Request $request) {
        $theID = $request->input('userID');
        $user = Technician::findOrFail($theID);

        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:technicians,email,' . $theID,
            'phoneNumber' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/',
            'photo' => 'nullable|image|max:2048', // Add this line
        ]);

        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        } else {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->photo) {
                Storage::delete('public/photos/' . $user->photo);
            }
            
            // Store new photo
            $photoPath = $request->file('photo')->store('public/photos');
            $validatedData['photo'] = basename($photoPath);
        }

        $user->update($validatedData);

        return redirect()->route('technician.manageProfile')->with('success', 'Profile updated successfully');
    }
}
