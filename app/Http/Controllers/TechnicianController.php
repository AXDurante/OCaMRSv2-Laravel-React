<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Technician;
use App\Models\Equipment;
use App\Models\TSR;
use Illuminate\Support\Facades\Storage;
use App\Models\JobOrder;
use Illuminate\Support\Str;
use App\Models\CoC;
use App\Models\Notification;

class TechnicianController extends Controller
{

    public function index(Request $request)
    {
        // Get total counts using separate queries
        $totalCounts = [
            'total' => JobOrder::count(),
            'forApproval' => JobOrder::where('status', 'For Approval')->count(),
            'approved' => JobOrder::where('status', 'Approved')->count(),
            'completed' => JobOrder::where('status', 'Completed')->count(),
            'cancelled' => JobOrder::where('status', 'Cancelled')->count(),
        ];

        // Start a new query for the paginated results
        $query = JobOrder::with('user');

        // Apply existing filters
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->whereHas('user', function($userQuery) use ($request) {
                    $userQuery->where('firstName', 'LIKE', "%{$request->search}%")
                        ->orWhere('lastName', 'LIKE', "%{$request->search}%")
                        ->orWhere('email', 'LIKE', "%{$request->search}%");
                })
                ->orWhere('job_id', 'LIKE', "%{$request->search}%")
                ->orWhere('service_type', 'LIKE', "%{$request->search}%");
            });
        }

        // Apply status filter
        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Apply priority filter
        if ($request->priority && $request->priority !== 'all') {
            $query->where('priority', $request->priority);
        }

        // Apply sorting
        $query->orderBy('date_request', $request->sort === 'oldest' ? 'asc' : 'desc');

        // Paginate results
        $jobOrders = $query->paginate(10)->withQueryString();

        return Inertia::render('Tech/Dashboard', [
            'jobOrder' => $jobOrders,
            'totalCounts' => $totalCounts,
            'filters' => [
                'search' => $request->search ?? '',
                'status' => $request->status ?? 'all',
                'priority' => $request->priority ?? 'all',
                'sort' => $request->sort ?? 'newest',
            ]
        ]);
    }

    public function showJobOrder($id)
    {
        $jobOrder = JobOrder::with('int_units')->findOrFail($id);

        return Inertia::render('Tech/ViewOrder', [
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

        return Inertia::render('Tech/EditOrder', [
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

            // Create notification
            Notification::create([
                'user_id' => $jobOrder->employeeID,
                'job_order_id' => $jobOrder->job_id,
                'title' => 'Job Order Status Updated',
                'message' => "Your job order #{$jobOrder->job_id} status has been updated to {$validatedData['status']} by technician",
                'type' => 'status_update',
                'status' => $validatedData['status']
            ]);

            return redirect()->route('technician.showJobOrder', $jobOrder->job_id)
                ->with('success', 'Job order has been updated successfully!');
        } catch (\Exception $e) {
            \Log::error('Job Order Update Error:', [
                'message' => $e->getMessage(),
                'job_id' => $id
            ]);
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating the job order.']);
        }
    }


    // TSR

    public function indexTSR($id)
    {
        // Retrieve the latest TSR associated with the specified Job Order ID
        $tsrs = TSR::where('job_id', $id)
            ->orderBy('tsr_id', 'desc') // Order by tsr_id in descending order
            ->get();

        return Inertia::render('Tech/ViewTSR', [
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

        return Inertia::render('Tech/ViewCOC', [
            'cocs' => $cocs, // Pass the COCs to the view
            'tsr_id' => $tsr_id, // Pass the TSR ID for reference
        ]);
    }

    public function createTSR($id)
    {
        $jobOrder = JobOrder::with(['int_units', 'user'])->findOrFail($id);
        $user = Auth::user();

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');
        $photoUrl = $user->photo ? ($isProduction
            ? $appUrl . '/public/storage/photos/technicianSignature/' . $user->photo
            : url('storage/photos/technicianSignature/' . $user->photo))
            : null;

        return Inertia::render('Tech/TSR', [
            'jobOrder' => $jobOrder,
            'auth' => [
                'user' => $user,
                'photo' => $photoUrl
            ]
        ]);
    }

    public function storeTSR(Request $request)
    {
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
            'tech_photo' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $tsrFields['tech_id'] = $user->firstName . ' ' . $user->lastName;

        // Store just the filename in the database
        $tsrFields['tech_photo'] = $user->photo;

        TSR::create($tsrFields);

        return redirect()->route('technician.indexTSR', ['id' => $tsrFields['job_id']]);
    }

    public function viewTSR($tsr_id)
    {
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate the full URLs for both technician and admin photos when they exist
        if ($tsr->tech_photo) {
            $tsr->tech_photo = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $tsr->tech_photo
                : url('storage/photos/technicianSignature/' . $tsr->tech_photo);
        }

        // Add admin photo URL if it exists
        if ($tsr->admin_photo) {
            $tsr->admin_signature = $isProduction
                ? $appUrl . '/public/storage/photos/adminSignature/' . $tsr->admin_photo
                : url('storage/photos/adminSignature/' . $tsr->admin_photo);
        }

        return Inertia::render('Tech/ViewTSRDetails', [
            'tsr' => $tsr
        ]);
    }

    public function editTSR($tsr_id)
    {
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);
        $user = Auth::user();

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate the full URLs for technician photo
        $userPhotoUrl = $user->photo ? ($isProduction
            ? $appUrl . '/public/storage/photos/technicianSignature/' . $user->photo
            : url('storage/photos/technicianSignature/' . $user->photo))
            : null;

        // Generate the full URLs for both technician and admin photos
        if ($tsr->tech_photo) {
            $tsr->tech_photo_url = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $tsr->tech_photo
                : url('storage/photos/technicianSignature/' . $tsr->tech_photo);
        }

        // Add admin signature data if it exists
        if ($tsr->admin_photo) {
            $tsr->admin_signature = $isProduction
                ? $appUrl . '/public/storage/photos/adminSignature/' . $tsr->admin_photo
                : url('storage/photos/adminSignature/' . $tsr->admin_photo);
        }

        return Inertia::render('Tech/EditTSR', [
            'tsr' => $tsr,
            'jobOrder' => $tsr->job_order,
            'auth' => [
                'user' => $user,
                'photo' => $userPhotoUrl
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
            'tech_photo' => ['nullable', 'string'], // Changed from 'image' to 'string'
        ]);

        // Get the authenticated user's full name and photo
        $user = Auth::user();
        $tsrFields['tech_id'] = $user->firstName . ' ' . $user->lastName;
        $tsrFields['tech_photo'] = $user->photo;

        $tsr->update($tsrFields);

        return redirect()->route('technician.viewTSRDetails', $tsr->tsr_id)
            ->with('message', 'TSR updated successfully');
    }

    // CoC
    public function createCoC($tsr_id)
    {
        $tsr = TSR::with(['job_order.user'])->findOrFail($tsr_id);
        $user = Auth::user();

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate the full URL for technician photo
        $photoUrl = $user->photo ? ($isProduction
            ? $appUrl . '/public/storage/photos/technicianSignature/' . $user->photo
            : url('storage/photos/technicianSignature/' . $user->photo))
            : null;

        return Inertia::render('Tech/COC', [
            'tsr' => $tsr,
            'auth' => [
                'user' => $user,
                'photo' => $photoUrl
            ]
        ]);
    }

    public function storeCoC(Request $request)
    {
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
            'tech_photo' => ['nullable', 'string'],
        ]);

        $user = Auth::user();

        // Add technician's information
        $cocFields['tech_name'] = $user->firstName . ' ' . $user->lastName;
        $cocFields['tech_photo'] = $user->photo; // Store just the filename

        // Create the CoC record
        $coc = CoC::create($cocFields);

        return redirect()->route('technician.viewCoCDetails', $coc->coc_id)
            ->with('message', 'Certificate of Calibration created successfully');
    }

    public function viewCoC($coc_id)
    {
        $coc = CoC::with(['tsr.job_order'])->findOrFail($coc_id);

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate full URLs for both technician and admin signatures
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

        return Inertia::render('Tech/ViewCOCDetails', [
            'coc' => $coc
        ]);
    }

    public function editCoC($coc_id)
    {
        $coc = COC::with(['tsr.job_order'])->findOrFail($coc_id);
        $user = Auth::user();

        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        // Generate full URL for current user's photo
        $userPhotoUrl = $user->photo ? ($isProduction
            ? $appUrl . '/public/storage/photos/technicianSignature/' . $user->photo
            : url('storage/photos/technicianSignature/' . $user->photo))
            : null;

        // Generate full URLs for existing signatures
        if ($coc->tech_photo) {
            $coc->tech_photo_url = $isProduction
                ? $appUrl . '/public/storage/photos/technicianSignature/' . $coc->tech_photo
                : url('storage/photos/technicianSignature/' . $coc->tech_photo);
        }

        if ($coc->admin_photo) {
            $coc->admin_signature = $isProduction
                ? $appUrl . '/public/storage/photos/adminSignature/' . $coc->admin_photo
                : url('storage/photos/adminSignature/' . $coc->admin_photo);
        }

        return Inertia::render('Tech/EditCOC', [
            'coc' => $coc,
            'tsr' => $coc->tsr,
            'auth' => [
                'user' => $user,
                'photo' => $userPhotoUrl
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
        ]);

        $coc->update($cocFields);

        return redirect()->route('technician.viewCoCDetails', $coc->coc_id)
            ->with('message', 'Certificate of Calibration updated successfully');
    }

    public function manageProfile()
    {
        $user = Auth::user();
        $isProduction = app()->environment('production');
        $appUrl = config('app.url');

        return Inertia::render('Tech/ManageProfile', [
            'user' => $user,
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

    public function updateProfile(Request $request)
    {
        try {
            $theID = $request->input('userID');
            $user = Technician::findOrFail($theID);

            $validationRules = [
                'firstName' => 'required|string|max:255',
                'lastName' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:technicians,email,' . $theID,
                'phoneNumber' => 'nullable|string|max:20',
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
                ],
                'removePhoto' => 'boolean',
            ];

            // Add password validation if provided
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
                'photo.mimes' => 'The signature must be a PNG image file. Other formats are not supported.',
                'photo.max' => 'The signature image must not exceed 2MB in size.',
            ];

            $validated = $request->validate($validationRules, $customMessages);

            if (empty($validated['password'])) {
                unset($validated['password']);
            } else {
                $validated['password'] = bcrypt($validated['password']);
            }

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
                    Storage::delete('public/photos/technicianSignature/' . $user->photo);
                }

                // Generate unique filename
                $filename = time() . '_' . Str::random(10) . '.png';

                // Store new photo
                $photo->storeAs('public/photos/technicianSignature', $filename);
                $validated['photo'] = $filename;
            } elseif ($request->boolean('removePhoto')) {
                if ($user->photo) {
                    Storage::delete('public/photos/technicianSignature/' . $user->photo);
                }
                $validated['photo'] = null;
            } else {
                unset($validated['photo']);
            }

            $user->update($validated);

            return redirect()->route('technician.manageProfile')
                ->with('message', 'Profile updated successfully');
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

    public function viewInstrument()
    {
        $equipment = Equipment::all();
        return Inertia::render("Tech/ViewInstrument", [
            "equipment" => $equipment,
        ]);
    }
}
