<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Technician;
use App\Models\Equipment;
use Illuminate\Support\Facades\Storage;
use App\Models\JobOrder;

class TechnicianController extends Controller
{

    public function index()
    {
        $jobOrder = JobOrder::with('user')
            ->whereIn('status', ['Processing', 'Cancelled']) // Filter by status
            ->paginate(10);

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

        return redirect()->route('technician.showJobOrder', $jobOrder->job_id);
    }

    public function createTSR($id)
    {
        $jobOrder = JobOrder::with(['int_units', 'user'])->findOrFail($id);
        return Inertia::render('Tech/TSR', [
            'jobOrder' => $jobOrder
        ]);
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
                Storage::delete('public/photos/' . $user->photo);
            }

            // Store new photo
            $photoPath = $request->file('photo')->store('public/photos');
            $validatedData['photo'] = basename($photoPath);
        } elseif ($request->boolean('removePhoto')) {
            // Remove existing photo
            if ($user->photo) {
                Storage::delete('public/photos/' . $user->photo);
            }
            $validatedData['photo'] = null;
        } else {
            // Keep existing photo
            unset($validatedData['photo']);
        }

        $user->update($validatedData);

        return redirect()->route('technician.manageProfile')->with('success', 'Profile updated successfully');
    }
}
