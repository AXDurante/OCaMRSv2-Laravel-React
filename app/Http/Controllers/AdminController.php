<?php

namespace App\Http\Controllers;
use App\Models\Equipment;
use App\Models\JobOrder;
use App\Models\TSR;
use App\Models\CoC;
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
        return Inertia::render('Admin/ManageProfile', [
            'auth' => [
                'user' => $admin
            ],
            'storageBaseUrl' => asset('storage/photos'),
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
        $jobOrder = JobOrder::findOrFail($id);

        $validatedData = $request->validate([
            'service_type' => 'required',
            'trans_type' => 'required',
            'remarks' => 'nullable',
            'status' => 'required|in:For Approval,Approved,Cancelled,Completed',
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

        return redirect()->route('admin.showJobOrder', $jobOrder->job_id);
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

    public function indexTSR($id)
    {
        // Retrieve the latest TSR associated with the specified Job Order ID
        $tsrs = TSR::where('job_id', $id)
            ->orderBy('tsr_id', 'desc') // Order by tsr_id in descending order
            ->get();

        return Inertia::render('Admin/ViewTSR', [
            'tsrs' => $tsrs,
            'jobOrderId' => $id, // Pass the Job Order ID for reference
        ]);
    }

    public function viewTSR($tsr_id)
    {
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);
        
        // Generate the full URL when sending to the frontend
        if ($tsr->tech_photo) {
            $tsr->tech_photo = Storage::url('photos/technicianSignature/' . $tsr->tech_photo);
        }

        return Inertia::render('Admin/ViewTSRDetails', [
            'tsr' => $tsr
        ]);
    }

    public function editTSR($tsr_id)
    {
        $admin = Auth::guard('admin')->user(); // Get authenticated admin
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);

        // Generate the full URL for the technician's photo if it exists
        if ($tsr->tech_photo) {
            $tsr->tech_photo_url = Storage::url('photos/technicianSignature/' . $tsr->tech_photo);
        }

        return Inertia::render('Admin/EditTSR', [
            'tsr' => $tsr,
            'jobOrder' => $tsr->job_order,
            'auth' => [
                'user' => $admin,
                'photo' => $admin->photo // Pass the admin's photo filename
            ]
        ]);
    }

    public function updateTSR(Request $request, $tsr_id)
    {
        $tsr = TSR::findOrFail($tsr_id);

        $tsrFields = $request->validate([
            'tsr_num' => ['required'],
            'instrument' => ['required'],
            'model' => ['nullable', 'string'],
            'serial_num' => ['nullable', 'string'],
            'problemReported' => ['nullable', 'string'],
            'diagnosis' => ['nullable', 'string'],
            'actionTaken' => ['nullable', 'string'],
            'recommendation' => ['required'],
            'tsr_remarks' => ['nullable', 'string'],
            'date_request' => ['required'],
            'phone' => ['required'],
            'job_id' => ['required'],
            'admin_photo' => ['nullable', 'string'],
            'admin_name' => ['nullable', 'string'],
        ]);

        // Update TSR with validated fields
        $tsr->update($tsrFields);

        return redirect()->route('admin.viewTSRDetails', $tsr->tsr_id)
            ->with('message', 'TSR updated successfully');
    }

    public function viewCoC($coc_id)
    {
        $coc = CoC::with(['tsr.job_order.user'])->findOrFail($coc_id);
        
        // Add URLs for signatures if they exist
        if ($coc->tech_photo) {
            $coc->tech_signature = Storage::url('photos/technicianSignature/' . $coc->tech_photo);
        }
        if ($coc->admin_photo) {
            $coc->admin_signature = Storage::url('photos/adminSignature/' . $coc->admin_photo);
        }

        return Inertia::render('Admin/ViewCOCDetails', [
            'coc' => $coc
        ]);
    }

    public function editCoC($coc_id)
    {
        $coc = CoC::with(['tsr.job_order.user'])->findOrFail($coc_id);
        $user = Auth::user();

        // Add URLs for signatures if they exist
        if ($coc->tech_photo) {
            $coc->tech_signature = Storage::url('photos/technicianSignature/' . $coc->tech_photo);
        }
        if ($coc->admin_photo) {
            $coc->admin_signature = Storage::url('photos/adminSignature/' . $coc->admin_photo);
        }

        return Inertia::render('Admin/EditCOC', [
            'coc' => $coc,
            'tsr' => $coc->tsr,
            'auth' => [
                'user' => $user,
                'photo' => $user->photo ? Storage::url('photos/technicianSignature/' . $user->photo) : null
            ]
        ]);
    }

    public function updateCoC(Request $request, $coc_id)
    {
        $coc = CoC::findOrFail($coc_id);

        $cocFields = $request->validate([
            'coc_num' => ['required'],
            'college' => ['required'],
            'lab_loc' => ['required'],
            'equipment' => ['required'],
            'model' => ['required'],
            'serial_num' => ['required'],
            'calibration' => ['required'],
            'calibration_res' => ['required'],
            'remark' => ['nullable', 'string'],
            'tsr_num' => ['required'],
            'tsr_id' => ['required'],
            'manufacturer' => ['required'],
            'standard' => ['required'],
            'date_req' => ['required'],
            'date_cal' => ['required'],
            'date_due' => ['required'],
            'admin_photo' => ['nullable', 'string'],
            'admin_name' => ['nullable', 'string'],
        ]);

        $coc->update($cocFields);

        return redirect()->route('admin.viewCoCDetails', $coc->coc_id)
            ->with('message', 'Certificate of Calibration updated successfully');
    }

}
