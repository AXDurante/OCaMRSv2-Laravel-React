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

class TechnicianController extends Controller
{

    public function index()
    {
        $jobOrder = JobOrder::with('user')->paginate(10);

        return Inertia::render('Tech/Dashboard', [
            'jobOrder' => $jobOrder,
        ]);
    }

    public function showJobOrder($id)
    {
        $jobOrder = JobOrder::with('int_units')->findOrFail($id); // Adjust as necessary based on your relationships

        return Inertia::render('Tech/ViewOrder', [
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

        return redirect()->route('technician.showJobOrder', $jobOrder->job_id);
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

    public function createTSR($id)
    {
        $jobOrder = JobOrder::with(['int_units', 'user'])->findOrFail($id);
        $user = Auth::user();
        
        // Generate the full URL only when sending to the frontend
        return Inertia::render('Tech/TSR', [
            'jobOrder' => $jobOrder,
            'auth' => [
                'user' => $user,
                'photo' => $user->photo ? Storage::url('photos/technicianSignature/' . $user->photo) : null
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

        // Get the authenticated user's full name and photo
        $user = Auth::user();
        $tsrFields['tech_id'] = $user->firstName . ' ' . $user->lastName;
        
        // Store just the filename in the database
        $tsrFields['tech_photo'] = $user->photo;

        TSR::create($tsrFields);

        // Redirect to ViewTSR with the job_id
        return redirect()->route('technician.indexTSR', ['id' => $tsrFields['job_id']]);
    }

    public function viewTSR($tsr_id)
    {
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);
        
        // Generate the full URLs for both technician and admin photos when they exist
        if ($tsr->tech_photo) {
            $tsr->tech_photo = Storage::url('photos/technicianSignature/' . $tsr->tech_photo);
        }

        // Add admin photo URL if it exists
        if ($tsr->admin_photo) {
            $tsr->admin_signature = Storage::url('photos/adminSignature/' . $tsr->admin_photo);
        }

        return Inertia::render('Tech/ViewTSRDetails', [
            'tsr' => $tsr
        ]);
    }

    public function editTSR($tsr_id)
    {
        $tsr = TSR::with(['job_order.user', 'coc'])->findOrFail($tsr_id);
        $user = Auth::user();

        // Generate the full URLs for both technician and admin photos
        if ($tsr->tech_photo) {
            $tsr->tech_photo_url = Storage::url('photos/technicianSignature/' . $tsr->tech_photo);
        }

        // Add admin signature data if it exists
        if ($tsr->admin_photo) {
            $tsr->admin_signature = Storage::url('photos/adminSignature/' . $tsr->admin_photo);
        }

        return Inertia::render('Tech/EditTSR', [
            'tsr' => $tsr,
            'jobOrder' => $tsr->job_order,
            'auth' => [
                'user' => $user,
                'photo' => $user->photo ? Storage::url('photos/technicianSignature/' . $user->photo) : null
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
    public function createCoC($id)
    {
        // Load job_order relationship and its user
        $tsr = TSR::with(['job_order', 'job_order.user'])->findOrFail($id);
        $user = Auth::user();

        // Generate the full URL for technician's signature
        $signatureUrl = $user->photo ? Storage::url('photos/technicianSignature/' . $user->photo) : null;

        return Inertia::render('Tech/COC', [
            'tsr' => $tsr,
            'auth' => [
                'user' => $user,
                'photo' => $signatureUrl,
                'fullName' => $user->firstName . ' ' . $user->lastName // Add full name
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
        $coc = CoC::with(['tsr.job_order.user'])->findOrFail($coc_id);
        
        // Add URLs for signatures if they exist
        if ($coc->tech_photo) {
            $coc->tech_signature = Storage::url('photos/technicianSignature/' . $coc->tech_photo);
        }
        if ($coc->admin_photo) {
            $coc->admin_signature = Storage::url('photos/adminSignature/' . $coc->admin_photo);
        }

        return Inertia::render('Tech/ViewCOCDetails', [
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

        return Inertia::render('Tech/EditCOC', [
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
        ]);

        $coc->update($cocFields);

        return redirect()->route('technician.viewCoCDetails', $coc->coc_id)
            ->with('message', 'Certificate of Calibration updated successfully');
    }

    public function manageProfile()
    {
        $user = Auth::user();
        return Inertia::render('Tech/ManageProfile', [
            'user' => $user
        ]);
    }

    public function updateProfile(Request $request)
    {
        $theID = $request->input('userID');
        $user = Technician::findOrFail($theID);

        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:technicians,email,' . $theID,
            'phoneNumber' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/',
            'photo' => 'nullable|image|max:2048',
            'removePhoto' => 'boolean',
        ]);

        if (empty($validatedData['password'])) {
            unset($validatedData['password']);
        } else {
            $validatedData['password'] = bcrypt($validatedData['password']);
        }

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($user->photo) {
                Storage::delete('public/photos/technicianSignature/' . $user->photo);
            }

            $photo = $request->file('photo');
            // Generate unique filename using timestamp and random string
            $filename = time() . '_' . Str::random(10) . '.' . $photo->getClientOriginalExtension();

            // Store new photo in technician subfolder
            $photoPath = $photo->storeAs('public/photos/technicianSignature', $filename);
            $validatedData['photo'] = $filename;
        } elseif ($request->boolean('removePhoto')) {
            // Remove existing photo
            if ($user->photo) {
                Storage::delete('public/photos/technicianSignature/' . $user->photo);
            }
            $validatedData['photo'] = null;
        } else {
            // Keep existing photo
            unset($validatedData['photo']);
        }

        $user->update($validatedData);

        return redirect()->route('technician.manageProfile')->with('message', 'Profile updated successfully');
    }

    public function viewInstrument()
    {
        $equipment = Equipment::all();
        return Inertia::render("Tech/ViewInstrument", [
            "equipment" => $equipment,
        ]);
    }
}
