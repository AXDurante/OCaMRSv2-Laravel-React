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
use App\Http\Controllers\AdminNotificationController;
use App\Http\Controllers\TechnicianNotificationController;

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
            'trans_type' => ['nullable'],
            'dept_name' => ['required'],
            'lab' => ['required'],
            'lab_loc' => ['required'],
            'pos' => ['required'],
            'status' => ['required'],
            'remarks' => ['required', 'string'],
        ]);

        // Set employeeID from authenticated user
        $jobOrderFields['employeeID'] = Auth::user()->employeeID;

        $jobOrder = JobOrder::create($jobOrderFields);

        $intUnitFields = $request->validate([
            'instruments' => ['required', 'array'],
            'instruments.*.instrument' => ['required'],
            'instruments.*.qty' => ['required', 'integer', 'min:1'],
            'instruments.*.model' => ['required', 'string'],
            'instruments.*.instrument_num' => ['required', 'string'],
            'instruments.*.manufacturer' => ['required', 'string'],
        ]);

        // Add default values before creating
        foreach ($intUnitFields['instruments'] as &$instrument) {
            $instrument['model'] = $instrument['model'] ?: 'N/A';
            $instrument['manufacturer'] = $instrument['manufacturer'] ?: 'N/A';
            $instrument['jobOrderID'] = $jobOrder->job_id;
            IntUnit::create($instrument);
        }

        // Notify all admins about new job order
        AdminNotificationController::notifyAllAdmins(
            $jobOrder,
            'New Job Order Received',
            "A new job order #{$jobOrder->job_id} has been submitted.",
            'new_job_order'
        );

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
        // ... existing update code ...

        // If status changed, notify relevant parties
        if ($jobOrder->isDirty('status')) {
            $oldStatus = $jobOrder->getOriginal('status');
            $newStatus = $jobOrder->status;

            // Notify admin about status change
            AdminNotificationController::notifyAllAdmins(
                $jobOrder,
                'Job Order Status Updated',
                "Job order #{$jobOrder->job_id} status changed from {$oldStatus} to {$newStatus}",
                'status_change'
            );

            // If assigned technician exists, notify them
            if ($jobOrder->technician_id) {
                TechnicianNotificationController::notifyAllTechnicians(
                    $jobOrder,
                    'Job Order Updated',
                    "Job order #{$jobOrder->job_id} status has been updated to {$newStatus}",
                    'status_change'
                );
            }
        }

        return redirect()->back();
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

    public function assignTechnician(Request $request, JobOrder $jobOrder)
    {
        // ... existing assignment code ...

        // Notify the assigned technician
        TechnicianNotificationController::notifyAllTechnicians(
            $jobOrder,
            'New Job Assignment',
            "You have been assigned to job order #{$jobOrder->job_id}",
            'job_assignment'
        );

        return redirect()->back();
    }

    public function cancel(JobOrder $jobOrder)
    {
        // ... existing cancellation code ...

        // Notify admin
        AdminNotificationController::notifyAllAdmins(
            $jobOrder,
            'Job Order Cancelled',
            "Job order #{$jobOrder->job_id} has been cancelled by the client.",
            'job_cancellation'
        );

        // If there's an assigned technician, notify them too
        if ($jobOrder->technician_id) {
            TechnicianNotificationController::notifyAllTechnicians(
                $jobOrder,
                'Job Order Cancelled',
                "Job order #{$jobOrder->job_id} has been cancelled by the client.",
                'job_cancellation'
            );
        }

        return redirect()->back();
    }

    public function complete(JobOrder $jobOrder)
    {
        // ... existing completion code ...

        // Notify admin
        AdminNotificationController::notifyAllAdmins(
            $jobOrder,
            'Job Order Completed',
            "Job order #{$jobOrder->job_id} has been marked as completed.",
            'job_completion'
        );

        return redirect()->back();
    }
}
