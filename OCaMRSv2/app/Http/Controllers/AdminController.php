<?php

namespace App\Http\Controllers;
use App\Models\Equipment;
use App\Models\JobOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/admin');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin/login');
    }

    public function index()
    {
        $jobOrder = JobOrder::with('user')->paginate(10);
        return Inertia::render('Admin/Manage Job Request', [
            'jobOrder' => $jobOrder,
        ]);
    }


    public function accountHandler()
    {
        return Inertia::render('Admin/AccountHandler');
    }
    public function manageProfile()
    {
        return Inertia::render('Admin/ManageProfile');
    }

    public function showJobRequest()
    {
        return Inertia::render('Admin/ShowJobRequest');
    }
    public function showviewInstrument()
    {
        $equipment = Equipment::all();
        return Inertia::render("Admin/ViewInstrument", [
            "equipment" => $equipment,
        ]);
    }
    public function showJobOrder($id)
    {
        $jobOrder = JobOrder::with('int_units')->findOrFail($id); // Adjust as necessary based on your relationships

        return Inertia::render('Admin/ViewOrder', [
            'jobOrder' => $jobOrder,
        ]);
    }

}
