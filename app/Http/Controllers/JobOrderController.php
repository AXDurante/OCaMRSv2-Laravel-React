<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use App\Models\Equipment;
use App\Http\Requests\StoreJobOrderRequest;
use App\Http\Requests\UpdateJobOrderRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\IntUnit;
use Illuminate\Http\Request;

class JobOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $sortBy = $request->input('sortBy', 'newest');

        $query = JobOrder::where('employeeID', $user->employeeID);

        // Apply sorting
        if ($sortBy === 'newest') {
            $query->orderBy('date_request', 'desc');
        } elseif ($sortBy === 'oldest') {
            $query->orderBy('date_request', 'asc');
        }
        // Add more sorting options here if needed

        $jobOrder = $query->get();
        $intUnit = IntUnit::all();

        return Inertia::render('JobOrder/TrackOrder', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'jobOrder' => $jobOrder,
            'intUnit' => $intUnit,
            'currentSort' => $sortBy,
            'flash' => [
                'success' => session('success'), // Pass the success message from the session
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $equipment = Equipment::all();
        $lastRecord = JobOrder::latest('date_request')->first();
        if ($lastRecord === null) {
            $lastID = 1;
        } else {
            $lastID = $lastRecord->job_id + 1;
        }
        $user = Auth::user();
        return Inertia::render('JobOrder/CreateOrder', [
            'absolute' => false,
            'employeeID' => $user->employeeID,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'college' => $user->college,
            'labLoc' => $user->labLoc,
            'lastID' => $lastID,
            'equipment' => $equipment,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $jobOrderFields = $request->validate([
            'service_type' => ['required'],
            'trans_type' => ['nullable', 'string'],
            'dept_name' => ['required'],
            'lab' => ['required'],
            'lab_loc' => ['required'],
            'pos' => ['required'],
            'status' => ['required'],
            'remarks' => ['nullable', 'string'],
        ]);

        // Set employeeID from authenticated user
        $jobOrderFields['employeeID'] = Auth::user()->employeeID;

        $jobOrder = JobOrder::create($jobOrderFields);

        $intUnitFields = $request->validate([
            'instruments' => ['required', 'array'],
            'instruments.*.instrument' => ['required'],
            'instruments.*.qty' => ['required', 'integer', 'min:1'],
            'instruments.*.model' => ['required'],
            'instruments.*.instrument_num' => ['required'],
            'instruments.*.manufacturer' => ['required'],
        ]);

        foreach ($intUnitFields['instruments'] as $instrument) {
            $instrument['jobOrderID'] = $jobOrder->job_id;
            IntUnit::create($instrument);
        }

          return redirect()->route('jobOrder.index')->with('success', 'Job Order is successfully submitted!');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobOrder $jobOrder)
    {
        // Eager load the int_units relationship
        $jobOrder->load('int_units');
        return inertia('JobOrder/ViewOrder', [
            'jobOrder' => $jobOrder
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobOrder $jobOrder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobOrder $jobOrder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobOrder $jobOrder)
    {
        //
    }
}
