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
        $isProduction = app()->environment('production');
        $appUrl = config('app.url');
       
        return Inertia::render('ManageProfile', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'user' => $user,
            'theID' => session('theID'),
            'storageBaseUrl' => $isProduction 
                ? $appUrl . '/public/storage/photos'
                : url('storage/photos'),
            'imageRequirements' => [
                'format' => 'PNG',
                'maxSize' => '2MB',
                'message' => 'Please upload a PNG file for your signature. This ensures optimal quality and transparency.'
            ]
        ]);
    }

    public function update(Request $request) {
        try {
            $theID = $request->input('userID');
            $user = User::findOrFail($theID);

            // Define validation rules
            $validationRules = [
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $theID,
                'phoneNumber' => 'nullable|string|size:11|regex:/^[0-9]+$/',
                'photo' => [
                    'nullable',
                    'file',
                    'mimes:png',
                    'max:2048',
                    function ($attribute, $value, $fail) {
                        if ($value) {
                            $mimeType = $value->getMimeType();
                            if ($mimeType !== 'image/png') {
                                $fail('The signature must be a PNG image file. Other formats are not supported.');
                            }
                        }
                    },
                ],
                'removePhoto' => 'boolean',
            ];

            // Add password validation if provided
            if ($request->filled('password')) {
                $validationRules['password'] = 'required|min:8|confirmed';
            }

            // Validate the request
            $validated = $request->validate($validationRules);

            // Handle password if provided
            if (!empty($validated['password'])) {
                $validated['password'] = bcrypt($validated['password']);
            } else {
                unset($validated['password']);
            }

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');

                // Additional mime type verification
                if ($photo->getMimeType() !== 'image/png') {
                    return redirect()->back()->withErrors([
                        'photo' => 'The signature must be a PNG image file for optimal quality and transparency.'
                    ]);
                }

                // Delete old photo if exists
                if ($user->photo) {
                    Storage::delete('public/photos/clientSignature/' . $user->photo);
                }

                // Generate unique filename
                $filename = time() . '_' . Str::random(10) . '.png';
                
                // Store new photo
                $photo->storeAs('public/photos/clientSignature', $filename);
                $validated['photo'] = $filename;
            } elseif ($request->boolean('removePhoto')) {
                // Remove existing photo
                if ($user->photo) {
                    Storage::delete('public/photos/clientSignature/' . $user->photo);
                }
                $validated['photo'] = null;
            } else {
                // Keep existing photo
                unset($validated['photo']);
            }

            $user->update($validated);

            return redirect()->back()->with('message', 'Profile updated successfully');
        } catch (\Exception $e) {
            \Log::error('Update Profile Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while updating the profile. Please ensure your signature is a valid PNG file and try again.'
            ]);
        }
    }
}
