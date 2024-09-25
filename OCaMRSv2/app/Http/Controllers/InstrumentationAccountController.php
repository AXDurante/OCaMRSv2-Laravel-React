<?php

namespace App\Http\Controllers;

use App\Models\Technician;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class InstrumentationAccountController extends Controller
{
    public function index()
    {
        $accounts = Technician::all();
        return response()->json($accounts);
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
            ]);

            // If you're using the Registered event, make sure it's imported and applicable to Technician
            // event(new Registered($technician));

            return response()->json($technician, 201);
        } catch (\Exception $e) {
            // Log the error for debugging
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
        $validated = $request->validate([
            'employeeID' => 'required|string|max:255|unique:technicians,employeeID,' . $technician->id,
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:technicians,email,' . $technician->id,
            'phoneNumber' => 'required|string|max:255|unique:technicians,phoneNumber,' . $technician->id,
            // Add other fields as necessary
        ]);

        $technician->update($validated);

        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account updated successfully.');
    }

    public function destroy(Technician $technician)
    {
        $technician->delete();
        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account deleted successfully.');
    }
}
