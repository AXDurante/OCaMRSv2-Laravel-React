<?php

namespace App\Http\Controllers;

use App\Models\Technician;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class InstrumentationAccountController extends Controller
{
    public function index()
    {
        $accounts = Technician::all();
        $users = User::all();
        
        return response()->json([
            'accounts' => $accounts,
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/InstrumentationAccounts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:technicians,email',
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&]/',
            ],
            'employeeID' => 'required|string|max:255|unique:technicians,employeeID',
            'phoneNumber' => 'required|string|max:255|unique:technicians,phoneNumber',
        ], [
            'password.min' => 'The password must be at least 8 characters.',
            'password.regex' => 'The password must include at least one uppercase letter, one number, and one special character.',
        ]);

        try {
            $technician = Technician::create([
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'employeeID' => $request->employeeID,
                'phoneNumber' => $request->phoneNumber,
                // 'photo' is not included here, so it will remain null
            ]);

            return response()->json($technician, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating technician: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while creating the account.'], 500);
        }
    }

    public function show(Technician $technician)
    {
        return Inertia::render('Admin/InstrumentationAccounts/Show', ['account' => $technician]);
    }

    public function edit(Technician $technician)
    {
        return Inertia::render('Admin/InstrumentationAccounts/Edit', ['account' => $technician]);
    }

    public function update(Request $request, Technician $technician)
    {
      

        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account updated successfully.');
    }

    public function destroy(Technician $technician)
    {
        $technician->delete();
        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account deleted successfully.');
    }

    public function editTech($id)
    {
        $technician = Technician::findOrFail($id);
        return Inertia::render('Admin/TechManageProfile', [
            'theUser' => $technician
        ]);
    }

    public function editTechPOST(Request $request) {
        $theID = $request->input('userID');
        
        $user = Technician::findOrFail($theID);

        // Validate the request data
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:technicians,email,' . $theID,
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

        return redirect()->route('admin.edit.tech', ['id' => $theID])->with('success', 'Profile updated successfully');
    }
}
