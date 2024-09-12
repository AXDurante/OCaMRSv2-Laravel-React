<?php

namespace App\Http\Controllers;

use App\Models\JobOrder;
use App\Http\Requests\StoreJobOrderRequest;
use App\Http\Requests\UpdateJobOrderRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

       
        $jobOrder = JobOrder::all();
        $user = Auth::user();
        return Inertia::render('JobOrder/TrackOrder', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'jobOrder' => $jobOrder,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       

     
        $user = Auth::user();
        return Inertia::render('JobOrder/CreateOrder', [
            'absolute' => false,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
           
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobOrderRequest $request)
    {
        //
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
    public function update(UpdateJobOrderRequest $request, JobOrder $jobOrder)
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
