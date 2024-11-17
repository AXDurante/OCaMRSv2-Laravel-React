<?php

namespace App\Http\Controllers;
use App\Models\Equipment;
use App\Models\JobOrder;
use App\Models\Notification;
use App\Http\Controllers\TechnicianNotificationController;
use App\Models\TSR;
use App\Models\CoC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Feedback;

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
                ? $appUrl . '/public/storage/photos'  // Remove duplicate adminSignature
                : url('storage/photos'),
            'flash' => [
                'message' => session('message')
            ],
            'imageRequirements' => [
                'format' => 'PNG',
                'maxSize' => '2MB',
                'message' => 'Please upload a PNG file for your signature. This ensures optimal quality and transparency.'
            ]
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
        $jobOrder = JobOrder::with('int_units')
            ->select('job_orders.*')
            ->leftJoin('feedbacks', 'job_orders.job_id', '=', 'feedbacks.job_order_id')
            ->selectRaw('CASE WHEN feedbacks.id IS NOT NULL THEN true ELSE false END as has_feedback')
            ->where('job_orders.job_id', $id)
            ->firstOrFail();

        return Inertia::render('Admin/ViewOrder', [
            'jobOrder' => $jobOrder,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ],
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

            // Validate the request data
            $validatedData = $request->validate([
                'service_type' => 'required|string',
                'trans_type' => 'required|string',
                'dept_name' => 'required|string',
                'lab' => 'required|string',
                'lab_loc' => 'required|string',
                'pos' => 'required|string',
                'employeeID' => 'required',
                'remarks' => 'nullable|string',
                'status' => 'required|in:For Approval,Approved,Cancelled,Completed',
                'priority' => 'required|in:Regular,Urgent',
                'instruments' => 'required|array|min:1',
                'instruments.*.instrument' => 'required|string',
                'instruments.*.qty' => 'required|integer|min:1',
                'instruments.*.model' => 'nullable|string',
                'instruments.*.instrument_num' => 'required|string',
                'instruments.*.manufacturer' => 'nullable|string',
            ]);

            // Update job order
            $jobOrder->update([
                'service_type' => $validatedData['service_type'],
                'trans_type' => $validatedData['trans_type'],
                'dept_name' => $validatedData['dept_name'],
                'lab' => $validatedData['lab'],
                'lab_loc' => $validatedData['lab_loc'],
                'pos' => $validatedData['pos'],
                'employeeID' => $validatedData['employeeID'],
                'remarks' => $validatedData['remarks'],
                'status' => $validatedData['status'],
                'priority' => $validatedData['priority'],
            ]);

            // Update or create instrument units
            $jobOrder->int_units()->delete(); // Remove existing units
            foreach ($validatedData['instruments'] as $instrumentData) {
                $jobOrder->int_units()->create($instrumentData);
            }

            // If status has changed from For Approval to Approved
            if ($oldStatus === 'For Approval' && $validatedData['status'] === 'Approved') {
                TechnicianNotificationController::notifyAllTechnicians(
                    $jobOrder,
                    'New Job Order Available',
                    "Job order #{$jobOrder->job_id} is now available for processing",
                    'new_job_order'
                );
            }

            // Create notification for status change
            Notification::create([
                'user_id' => $jobOrder->employeeID,
                'job_order_id' => $jobOrder->job_id,
                'title' => 'Job Order Status Updated',
                'message' => "Your job order #{$jobOrder->job_id} status has been updated to {$validatedData['status']} by admin",
                'type' => 'status_update',
                'status' => $validatedData['status']
            ]);

            return redirect()->route('admin.showJobOrder', $jobOrder->job_id)
                ->with('success', 'Job order has been updated successfully!');

        } catch (\Exception $e) {
            \Log::error('Job Order Update Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating the job order.']);
        }
    }

    public function updateProfile(Request $request)
    {
        try {
            $admin = Auth::guard('admin')->user();

            // Update validation rules
            $validationRules = [
                'firstName' => ['sometimes', 'required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
                'lastName' => ['sometimes', 'required', 'string', 'max:255', 'regex:/^[a-zA-Z\s]+$/'],
                'email' => 'sometimes|nullable|email|unique:admins,email,' . $admin->id,
                'id_number' => 'sometimes|required|string|unique:admins,id_number,' . $admin->id,
                'photo' => [
                    'nullable',
                    'file',
                    'mimes:png',
                    'max:2048', // 2MB max size
                    function ($attribute, $value, $fail) {
                        if ($value) {
                            $mimeType = $value->getMimeType();
                            if ($mimeType !== 'image/png') {
                                $fail('The signature must be a PNG image file. Other formats are not supported.');
                            }
                        }
                    },
                ]
            ];

            // Custom error messages
            $customMessages = [
                'firstName.regex' => 'The first name field must only contain letters.',
                'lastName.regex' => 'The last name field must only contain letters.',
                'password.confirmed' => 'The password confirmation does not match.',
                'password.regex' => 'The password must contain at least one uppercase letter, one number, and one special character.',
                'photo.mimes' => 'The signature must be a PNG image file. Other formats are not supported.',
                'photo.max' => 'The signature image must not exceed 2MB in size.',
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

            // Handle photo upload with additional validation
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');

                // Additional mime type verification
                if ($photo->getMimeType() !== 'image/png') {
                    return redirect()->back()->withErrors([
                        'photo' => 'The signature must be a PNG image file for optimal quality and transparency.'
                    ]);
                }

                // Remove old photo if exists
                if ($admin->photo) {
                    Storage::delete('public/photos/adminSignature/' . $admin->photo);
                }

                // Generate unique filename
                $filename = time() . '_' . Str::random(10) . '.png';

                // Store the new photo
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
            return redirect()->back()->withErrors([
                'error' => 'An error occurred while updating the profile. Please ensure your signature is a valid PNG file and try again.'
            ]);
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

    public function indexCOC($tsr_id)
    {
        // Retrieve all COCs associated with the specified TSR ID
        $cocs = COC::where('tsr_id', $tsr_id)
            ->orderBy('coc_id', 'desc') // Order by coc_id in descending order
            ->get();

        return Inertia::render('Admin/ViewCOC', [
            'cocs' => $cocs, // Pass the COCs to the view
            'tsr_id' => $tsr_id, // Pass the TSR ID for reference
        ]);
    }

    public function viewTSR($tsr_id)
    {
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate full URLs for technician and admin signatures using the same logic as AppServiceProvider
        if ($tsr->tech_photo) {
            $tsr->tech_photo = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $tsr->tech_photo
                : url('storage/photos/technicianSignature/' . $tsr->tech_photo);
        }

        if ($tsr->admin_photo) {
            $tsr->admin_signature = $isProduction
                ? $appUrl . '/public/storage/photos/adminSignature/' . $tsr->admin_photo
                : url('storage/photos/adminSignature/' . $tsr->admin_photo);
        }

        // Add base URLs for static images
        $staticBaseUrl = $isProduction ? $appUrl . '/public' : url('');

        return Inertia::render('Admin/ViewTSRDetails', [
            'tsr' => $tsr,
            'staticUrls' => [
                'tsrFooter' => $staticBaseUrl . '/images/TSRFooter.png',
            ]
        ]);
    }

    public function editTSR($tsr_id)
    {
        $admin = Auth::guard('admin')->user(); // Get authenticated admin
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate full URLs for technician and admin signatures
        if ($tsr->tech_photo) {
            $tsr->tech_photo = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $tsr->tech_photo
                : url('storage/photos/technicianSignature/' . $tsr->tech_photo);
        }

        // Generate full URL for admin's signature
        $adminPhotoUrl = $admin->photo ? ($isProduction
            ? $appUrl . '/public/storage/photos/adminSignature/' . $admin->photo
            : url('storage/photos/adminSignature/' . $admin->photo))
            : null;

        return Inertia::render('Admin/EditTSR', [
            'tsr' => $tsr,
            'jobOrder' => $tsr->job_order,
            'auth' => [
                'user' => $admin,
                'photo' => $adminPhotoUrl // Pass the full URL
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

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate full URLs for technician and admin signatures
        if ($coc->tech_photo) {
            $coc->tech_photo = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $coc->tech_photo
                : url('storage/photos/technicianSignature/' . $coc->tech_photo);
        }

        if ($coc->admin_photo) {
            $coc->admin_signature = $isProduction
                ? $appUrl . '/public/storage/photos/adminSignature/' . $coc->admin_photo
                : url('storage/photos/adminSignature/' . $coc->admin_photo);
        }

        return Inertia::render('Admin/ViewCOCDetails', [
            'coc' => $coc
        ]);
    }

    public function editCoC($coc_id)
    {
        $coc = COC::with(['tsr.job_order'])->findOrFail($coc_id);
        $admin = Auth::guard('admin')->user();

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate full URLs for signatures
        if ($coc->tech_photo) {
            $coc->tech_photo_url = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $coc->tech_photo
                : url('storage/photos/technicianSignature/' . $coc->tech_photo);
        }

        // Generate full URL for admin's signature
        $adminPhotoUrl = $admin->photo ? ($isProduction
            ? $appUrl . '/public/storage/photos/adminSignature/' . $admin->photo
            : url('storage/photos/adminSignature/' . $admin->photo))
            : null;

        return Inertia::render('Admin/EditCOC', [
            'coc' => $coc,
            'tsr' => $coc->tsr,
            'auth' => [
                'user' => $admin,
                'photo' => $adminPhotoUrl // Pass the full URL
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

    public function updateJobStatus(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|in:For Approval,Approved,Cancelled,Completed'
            ]);

            $jobOrder = JobOrder::findOrFail($id);
            $oldStatus = $jobOrder->status;

            // Update the status
            $jobOrder->update(['status' => $request->status]);

            // If status has changed from For Approval to Approved
            if ($oldStatus === 'For Approval' && $request->status === 'Approved') {
                TechnicianNotificationController::notifyAllTechnicians(
                    $jobOrder,
                    'New Job Order Available',
                    "Job order #{$jobOrder->job_id} is now available for processing",
                    'new_job_order'
                );
            }

            // Create notification for status change
            Notification::create([
                'user_id' => $jobOrder->employeeID,
                'job_order_id' => $jobOrder->job_id,
                'title' => 'Job Order Status Updated',
                'message' => "Your job order #{$jobOrder->job_id} status has been updated to {$request->status} by admin",
                'type' => 'status_update',
                'status' => $request->status
            ]);

            return response()->json([
                'message' => 'Status updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while updating the status.'
            ], 500);
        }
    }

    public function viewFeedback($jobOrderId)
    {
        $feedback = Feedback::where('job_order_id', $jobOrderId)
            ->with('user')
            ->first();

        if (!$feedback) {
            return redirect()->back()->with('error', 'No feedback found for this job order.');
        }

        return Inertia::render('Admin/ViewFeedback', [
            'feedback' => $feedback,
            'jobOrder' => $feedback->jobOrder
        ]);
    }

}
