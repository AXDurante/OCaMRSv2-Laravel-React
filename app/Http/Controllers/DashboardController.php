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
            'auth' => [
                'user' => $user
            ],
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'user' => $user,
            'theID' => $user->id,
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

    public function update(Request $request) 
    {
        try {
            $theID = $request->input('userID');
            $user = User::findOrFail($theID);
            $hasChanges = false;

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
                $validationRules['password'] = [
                    'required',
                    'min:8',
                    'confirmed',
                    'regex:/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/',
                    function ($attribute, $value, $fail) {
                        if (!preg_match('/[A-Z]/', $value)) {
                            $fail('The password must contain at least one uppercase letter.');
                        }
                        if (!preg_match('/[0-9]/', $value)) {
                            $fail('The password must contain at least one number.');
                        }
                        if (!preg_match('/[^A-Za-z0-9]/', $value)) {
                            $fail('The password must contain at least one special character.');
                        }
                    }
                ];
            }

            // Validate the request
            $validated = $request->validate($validationRules);

            // Check for actual changes
            if ($user->firstName !== $validated['firstName'] || 
                $user->lastName !== $validated['lastName'] || 
                $user->email !== $validated['email'] || 
                $user->phoneNumber !== ($validated['phoneNumber'] ?? null) ||
                $request->hasFile('photo') || 
                $request->boolean('removePhoto')) {
                $hasChanges = true;
            }

            // Handle password if provided and valid
            if (!empty($validated['password'])) {
                if (preg_match('/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/', $validated['password'])) {
                    $validated['password'] = bcrypt($validated['password']);
                    $hasChanges = true;
                } else {
                    return redirect()->back()->withErrors([
                        'password' => 'Password requirements not met. No changes were made to the password.'
                    ])->with('message', $hasChanges ? 'Profile updated but password was not changed.' : 'No changes were made.');
                }
            } else {
                unset($validated['password']);
            }

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                
                if ($photo->getMimeType() !== 'image/png') {
                    return redirect()->back()->withErrors([
                        'photo' => 'The signature must be a PNG image file.'
                    ]);
                }

                // Generate filename
                $filename = time() . '_' . Str::random(10) . '.png';
                
                // Use the correct path based on environment
                $isProduction = app()->environment('production');
                $basePath = $isProduction 
                    ? public_path('public/storage/photos/clientSignature')
                    : storage_path('app/public/photos/clientSignature');

                try {
                    // Ensure directory exists
                    if (!file_exists($basePath)) {
                        mkdir($basePath, 0755, true);
                    }

                    // Delete old photo if exists
                    if ($user->photo) {
                        $oldPath = $basePath . '/' . $user->photo;
                        if (file_exists($oldPath)) {
                            unlink($oldPath);
                        }
                    }

                    // Move the new file
                    $photo->move($basePath, $filename);
                    $validated['photo'] = $filename;

                    // Log successful upload
                    \Log::info('Photo Upload Success:', [
                        'environment' => $isProduction ? 'production' : 'local',
                        'path' => $basePath . '/' . $filename,
                        'filename' => $filename
                    ]);

                } catch (\Exception $e) {
                    \Log::error('Photo Upload Error:', [
                        'message' => $e->getMessage(),
                        'environment' => $isProduction ? 'production' : 'local',
                        'path' => $basePath . '/' . $filename
                    ]);
                    
                    return redirect()->back()->withErrors([
                        'photo' => 'Failed to upload the signature photo. Please try again.'
                    ]);
                }
            } elseif ($request->boolean('removePhoto')) {
                if ($user->photo) {
                    $path = 'public/photos/clientSignature/' . $user->photo;
                    if (Storage::exists($path)) {
                        Storage::delete($path);
                    }
                }
                $validated['photo'] = null;
            } else {
                unset($validated['photo']);
            }

            if ($hasChanges) {
                $user->update($validated);
                return redirect()->back()->with('message', 'Profile updated successfully');
            }

            return redirect()->back()->with('message', 'No changes were made to your profile.');
            
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
