<?php

namespace App\Http\Controllers;

use App\Models\InstrumentationAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class InstrumentationAccountController extends Controller
{
    public function index()
    {
        $accounts = InstrumentationAccount::all();
        return response()->json($accounts);
    }

    public function create()
    {
        return Inertia::render('Admin/InstrumentationAccounts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_number' => 'required|string|max:255|unique:instrumentation_accounts',
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:instrumentation_accounts',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $account = InstrumentationAccount::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Account created successfully.',
                'account' => $account
            ], 201);
        }

        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account created successfully.');
    }

    public function show(InstrumentationAccount $account)
    {
        return Inertia::render('Admin/InstrumentationAccounts/Show', ['account' => $account]);
    }

    public function edit(InstrumentationAccount $account)
    {
        return Inertia::render('Admin/InstrumentationAccounts/Edit', ['account' => $account]);
    }

    public function update(Request $request, InstrumentationAccount $account)
    {
        $validated = $request->validate([
            'id_number' => 'required|string|max:255|unique:instrumentation_accounts,id_number,' . $account->id,
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:instrumentation_accounts,email,' . $account->id,
            'is_active' => 'boolean',
        ]);

        $account->update($validated);

        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account updated successfully.');
    }

    public function destroy(InstrumentationAccount $account)
    {
        $account->delete();
        return redirect()->route('admin.instrumentation-accounts.index')->with('success', 'Account deleted successfully.');
    }
}
