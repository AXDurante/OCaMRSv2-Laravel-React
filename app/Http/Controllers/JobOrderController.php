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
use Illuminate\Support\Facades\DB;
use App\Models\Notification;

class JobOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sort = $request->input('sort', 'newest');
        $filter = $request->input('filter', 'all');

        $jobOrders = JobOrder::select('job_orders.*')
            ->leftJoin('feedbacks', function ($join) {
                $join->on('job_orders.job_id', '=', 'feedbacks.job_order_id')
                    ->where('feedbacks.user_id', '=', auth()->id());
            })
            ->selectRaw('
                job_orders.*, 
                CASE WHEN feedbacks.id IS NOT NULL THEN true ELSE false END as has_feedback,
                feedbacks.id as feedback_id
            ')
            ->where('job_orders.employeeID', auth()->user()->employeeID);

        // Apply status filter
        if ($filter !== 'all') {
            $jobOrders = $jobOrders->where('job_orders.status', ucfirst($filter));
        }

        // Apply sorting
        if ($sort === 'oldest') {
            $jobOrders = $jobOrders->orderBy('job_orders.date_request', 'asc');
        } else {
            $jobOrders = $jobOrders->orderBy('job_orders.date_request', 'desc');
        }

        $jobOrders = $jobOrders->get();

        return Inertia::render('JobOrder/TrackOrder', [
            'jobOrder' => $jobOrders,
            'firstName' => auth()->user()->firstName,
            'lastName' => auth()->user()->lastName,
            'email' => auth()->user()->email,
            'currentSort' => $sort,
            'currentFilter' => $filter,
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

    protected function createStatusChangeNotification($jobOrder, $oldStatus)
    {
        Notification::create([
            'user_id' => $jobOrder->employeeID,
            'job_order_id' => $jobOrder->job_id,
            'title' => 'Job Order Status Updated',
            'message' => "Your job order #{$jobOrder->job_id} status has been changed from {$oldStatus} to {$jobOrder->status}",
            'type' => 'status_update'
        ]);
    }
}
