<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
            'user' => $user,
            'theID' => session('theID'),
        ]);
    }

    public function update(Request $request) {
        $theID = $request->input('userID');
        
        $user = User::findOrFail($theID);

        $validatedData = $request->validate([
            'firstName' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'lastName' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => 'required|string|email|max:255|unique:users,email,' . $theID,
            'phoneNumber' => ['nullable', 'string', 'regex:/^[0-9]+$/', 'size:10'],
            'password' => 'nullable|string|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/',
            'photo' => 'nullable|image|max:2048',
            'removePhoto' => 'boolean',
        ], [
            'firstName.regex' => 'The first name field must only contain letters.',
            'lastName.regex' => 'The last name field must only contain letters.',
            'phoneNumber.regex' => 'The phone number must only contain numbers.',
            'phoneNumber.size' => 'The phone number must be exactly 11 digits.',
        ]);

        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        } else {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->photo) {
                Storage::delete('public/photos/clientSignature/' . $user->photo);
            }

            $photo = $request->file('photo');
            // Generate unique filename using timestamp and random string
            $filename = time() . '_' . Str::random(10) . '.' . $photo->getClientOriginalExtension();
            
            // Store new photo in client subfolder
            $photoPath = $photo->storeAs('public/photos/clientSignature', $filename);
            $validatedData['photo'] = $filename;
        } elseif ($request->boolean('removePhoto')) {
            // Remove existing photo
            if ($user->photo) {
                Storage::delete('public/photos/clientSignature/' . $user->photo);
            }
            $validatedData['photo'] = null;
        } else {
            // Keep existing photo
            unset($validatedData['photo']);
        }

        $user->update($validatedData);

        return redirect()->route('manageProfile')->with('message', 'Profile updated successfully');
    }
}
