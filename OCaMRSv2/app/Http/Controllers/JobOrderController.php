<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use App\Models\Equipment;
use App\Http\Requests\StoreJobOrderRequest;
use App\Http\Requests\UpdateJobOrderRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\TechnicianJobOrder;
use Inertia\Inertia;
use App\Models\IntUnit;
use Illuminate\Http\Request;

class JobOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $jobOrder = JobOrder::where('employeeID', $user->employeeID)->get();
        $intUnit = IntUnit::all();

        return Inertia::render('JobOrder/TrackOrder', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'jobOrder' => $jobOrder,
            'intUnit' => $intUnit
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
            'trans_type' => ['required'],
            'dept_name' => ['required'],
            'lab' => ['required'],
            'lab_loc' => ['required'],
            'pos' => ['required'],
        ]);

        // Set employeeID from authenticated user
        $jobOrderFields['employeeID'] = Auth::user()->employeeID;

        $jobOrder = JobOrder::create($jobOrderFields);

        $intUnitFields = $request->validate([
            'instruments' => ['required', 'array'],
            'instruments.*.instrument' => ['required'],
            'instruments.*.qty' => ['required'],
            'instruments.*.model' => ['required'],
            'instruments.*.serial_num' => ['required'],
            'instruments.*.manufacturer' => ['required'],
            'instruments.*.property_num' => ['required'],
        ]);

        foreach ($intUnitFields['instruments'] as $instrument) {
            $instrument['jobOrderID'] = $jobOrder->job_id;
            IntUnit::create($instrument);
        }

        return redirect('/jobOrder');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobOrder $jobOrder)
    {
        return inertia('JobOrder/ViewOrder', ['jobOrder' => $jobOrder]);
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

    public function technicianIndex()
    {
        $user = Auth::user();
    
        // Check if the user is authenticated
    
    
        // Fetch technician job orders using employeeID
        $technicianJobOrders = TechnicianJobOrder::where('employeeID', $user->employeeID)->get();
    
        // Check if the orders were fetched successfully

    
        return Inertia::render('Technician/Dashboard', [
            'technicianJobOrders' => $technicianJobOrders,
        ]);
    }
    

    public function storeTechnicianJobOrder(Request $request)
    {
        $request->validate([
            'job_id' => 'required|exists:job_orders,job_id',
            'status' => 'required|in:approve,completed,cancel',
            'priority' => 'required|in:Low,Mid,High',
        ]);

        TechnicianJobOrder::create([
            'job_id' => $request->job_id,
            'user_id' => Auth::id(),
            'date_received' => now(),
            'status' => $request->status,
            'priority' => $request->priority,
        ]);

        return redirect()->back();
    }
}
