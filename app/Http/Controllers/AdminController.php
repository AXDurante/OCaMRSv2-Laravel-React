<?php

namespace App\Http\Controllers;
use App\Models\Equipment;
use App\Models\JobOrder;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        $admin = Auth::guard('admin')->user();
        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        return Inertia::render('Admin/ManageProfile', [
            'auth' => [
                'user' => $admin
            ],
            'storageBaseUrl' => $isProduction 
                ? $appUrl . '/public/storage/photos'  // Add public/ prefix for production
                : url('storage/photos'),
            'flash' => [
                'message' => session('message')
            ],
        ]);
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
        // Add debug logging to see what's being loaded
        \Log::info('Loading Job Order:', ['id' => $id]);
        
        $jobOrder = JobOrder::with(['int_units', 'feedback', 'user'])->findOrFail($id);
        
        // Debug log the loaded data
        \Log::info('Job Order Data:', [
            'job_id' => $jobOrder->job_id,
            'has_feedback' => $jobOrder->feedback ? 'yes' : 'no',
            'feedback_data' => $jobOrder->feedback
        ]);

        return Inertia::render('Admin/ViewOrder', [
            'jobOrder' => $jobOrder,
        ]);
    }

    public function editJobOrder($id)
    {
        $jobOrder = JobOrder::with('int_units')->findOrFail($id);
        $equipment = Equipment::all();
        $college = $jobOrder->dept_name;
        $labLoc = $jobOrder->lab_loc;
        $employeeID = $jobOrder->employeeID;

        return Inertia::render('Admin/EditOrder', [
            'jobOrder' => $jobOrder,
            'equipment' => $equipment,
            'college' => $college,
            'labLoc' => $labLoc,
            'employeeID' => $employeeID,
        ]);
    }

    public function updateJobOrder(Request $request, $id)
    {
        try {
            $jobOrder = JobOrder::findOrFail($id);
            $oldStatus = $jobOrder->status;

            $validatedData = $request->validate([
                'service_type' => 'required',
                'trans_type' => 'required',
                'remarks' => 'nullable',
                'status' => 'required|in:Pending,Processing,Cancelled',
                'instruments' => 'required|array',
                'instruments.*.instrument' => 'required',
                'instruments.*.qty' => 'required|integer',
                'instruments.*.model' => 'nullable',
                'instruments.*.instrument_num' => 'required',
                'instruments.*.manufacturer' => 'nullable',
            ]);

            $jobOrder->update([
                'service_type' => $validatedData['service_type'],
                'trans_type' => $validatedData['trans_type'],
                'remarks' => $validatedData['remarks'],
                'status' => $validatedData['status'],
            ]);

            // Update or create instrument units
            $jobOrder->int_units()->delete(); // Remove existing units
            foreach ($validatedData['instruments'] as $instrumentData) {
                $jobOrder->int_units()->create($instrumentData);
            }

            // Create notification
            Notification::create([
                'user_id' => $jobOrder->employeeID,
                'job_order_id' => $jobOrder->job_id,
                'title' => 'Job Order Status Updated',
                'message' => "Your job order #{$jobOrder->job_id} status has been updated to {$validatedData['status']} by admin",
                'type' => 'status_update'
            ]);

            return redirect()->route('admin.showJobOrder', $jobOrder->job_id)
                ->with('success', 'Job order updated successfully');
        } catch (\Exception $e) {
            \Log::error('Job Order Update Error:', [
                'message' => $e->getMessage(),
                'job_id' => $id
            ]);
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating the job order.']);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();
            
            // Validate the request
            $validationRules = [
                'firstName' => 'sometimes|required|string|max:255',
                'lastName' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|nullable|email|unique:admins,email,' . $admin->id,
                'id_number' => 'sometimes|required|string|unique:admins,id_number,' . $admin->id,
            ];

            // Add password validation rules only if password is being updated
            if ($request->filled('password')) {
                $validationRules['password'] = [
                    'required',
                    'string',
                    'min:8',
                    'confirmed',
                    'regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/'
                ];
            }

            // Custom error messages
            $customMessages = [
                'password.confirmed' => 'The password confirmation does not match.',
                'password.regex' => 'The password must contain at least one uppercase letter, one number, and one special character.',
            ];

            $validated = $request->validate($validationRules, $customMessages);
            $updateData = [];

            // Handle basic fields
            if ($request->has('firstName')) {
                $updateData['firstName'] = $request->firstName;
            }
            if ($request->has('lastName')) {
                $updateData['lastName'] = $request->lastName;
            }
            if ($request->has('email')) {
                $updateData['email'] = $request->email ?: null;
            }
            if ($request->has('id_number')) {
                $updateData['id_number'] = $request->id_number;
            }
            if ($request->filled('password')) {
                $updateData['password'] = bcrypt($request->password);
            }

            // Only handle photo if a new file was uploaded
            if ($request->hasFile('photo')) {
                if ($admin->photo) {
                    Storage::delete('public/photos/adminSignature/' . $admin->photo);
                }

                $photo = $request->file('photo');
                $filename = time() . '_' . Str::random(10) . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs('public/photos/adminSignature', $filename);
                $updateData['photo'] = $filename;
            }

            // Update the admin record
            $admin->update($updateData);

            return redirect()->back()->with('message', 'Profile updated successfully');
        } catch (\Exception $e) {
            \Log::error('Update Profile Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating the profile: ' . $e->getMessage()]);
        }
    }
}
