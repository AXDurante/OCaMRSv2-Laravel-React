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
        $search = $request->input('search');
        $page = $request->input('page', 1);

        $jobOrders = JobOrder::query();
        
        // Apply search if provided
        if ($search) {
            $jobOrders->where(function($query) use ($search) {
                $query->where('job_orders.job_id', 'LIKE', "%{$search}%")
                    ->orWhere('job_orders.service_type', 'LIKE', "%{$search}%")
                    ->orWhere('job_orders.trans_type', 'LIKE', "%{$search}%")
                    ->orWhere('job_orders.dept_name', 'LIKE', "%{$search}%")
                    ->orWhere('job_orders.lab', 'LIKE', "%{$search}%")
                    ->orWhere('job_orders.lab_loc', 'LIKE', "%{$search}%")
                    ->orWhere('job_orders.status', 'LIKE', "%{$search}%");
            });
        }

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

        $paginatedOrders = $jobOrders->paginate(10)->withQueryString();

        // Get the authenticated user
        $user = Auth::user();

        // Return Inertia response with flash messages
        return Inertia::render('JobOrder/TrackOrder', [
            'jobOrder' => $paginatedOrders,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'currentSort' => $sort,
            'currentFilter' => $filter,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
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
            'service_type' => 'required',
            'trans_type' => 'required',
            'dept_name' => 'required',
            'lab' => 'required',
            'lab_loc' => 'required',
            'pos' => 'required',
            'employeeID' => 'required',
            'remarks' => 'nullable',
            'status' => ['required', 'in:For Approval,Approved,Cancelled,Completed'],
            'priority' => ['required', 'in:Regular,High,Medium,Low'],
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
        // Eager load the int_units relationship and any other needed relationships
        $jobOrder->load(['int_units', 'user']);
        
        return Inertia::render('JobOrder/ViewOrder', [
            'jobOrder' => $jobOrder,
            'firstName' => Auth::user()->firstName,
            'lastName' => Auth::user()->lastName,
            'email' => Auth::user()->email,
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

            if ($oldStatus !== 'Approved' && $newStatus === 'Approved') {
                TechnicianNotificationController::notifyAllTechnicians(
                    $jobOrder,
                    'New Job Order Available',
                    "Job order #{$jobOrder->job_id} is now available for processing",
                    'new_job_order'
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
