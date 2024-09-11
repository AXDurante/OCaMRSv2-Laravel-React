<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use App\Models\IntUnit;
use Illuminate\Http\Request;

class JobOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobOrder = JobOrder::all();
        $intUnit = IntUnit::all();
        return inertia('JobOrder/TrackOrder', ['jobOrder' => $jobOrder, 'intUnit' => $intUnit]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $lastRecord = JobOrder::latest('date_request')->first();
        $lastID = $lastRecord->job_id += 1;
        return inertia('JobOrder/CreateOrder', ['lastID' => $lastID]);
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

        JobOrder::create($jobOrderFields);

        $intUnitFields = $request->validate([
            'instrument' => ['required'],
            'qty' => ['required'],
            'model' => ['required'],
            'serial_num' => ['required'],
            'manufacturer' => ['required'],
            'property_num' => ['required'],
            'jobOrderID' => ['required'],
        ]);

        IntUnit::create($intUnitFields);
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
}
