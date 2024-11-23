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
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Notifications\JobOrderNotification;

class JobOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = JobOrder::query();

        // Apply status filter
        if ($request->filter && $request->filter !== 'all') {
            $query->where('status', $request->filter);
        }

        // Apply search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('job_id', 'like', "%{$request->search}%")
                    ->orWhere('service_type', 'like', "%{$request->search}%")
                    ->orWhere('dept_name', 'like', "%{$request->search}%");
            });
        }

        // Apply sorting using date_request
        $query->orderBy('date_request', $request->sort === 'oldest' ? 'asc' : 'desc');

        // Get the authenticated user's employee ID
        $employeeID = Auth::user()->employeeID;

        // Filter by employee ID
        $query->where('employeeID', $employeeID);

        // Load feedback relationship
        $query->with('feedback');

        // Paginate results with Bootstrap styling
        $jobOrders = $query->paginate(10)->withQueryString()->through(function ($order) {
            // Get feedback information
            $feedback = $order->feedback()->first();

            return [
                'job_id' => $order->job_id,
                'status' => $order->status,
                'date_request' => $order->date_request,
                'date_due' => $order->date_due,
                'has_feedback' => !is_null($feedback),
                'feedback_id' => $feedback ? $feedback->id : null,
                'service_type' => $order->service_type,
                'department' => $order->dept_name,
            ];
        });

        $user = Auth::user();

        return Inertia::render('JobOrder/TrackOrder', [
            'jobOrder' => $jobOrders,
            'currentSort' => $request->sort ?? 'newest',
            'currentFilter' => $request->filter ?? 'all',
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
            'position' => $user->position,
            'flash' => [
                'success' => session('success')
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
            'position' => $user->position,
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
            'instruments.*.qty' => ['required', 'integer', 'min:1', function($attribute, $value, $fail) {
                if ($value <= 0) {
                    $fail('The quantity must be greater than 0.');
                }
            }],
            'instruments.*.model' => ['nullable', 'string'],
            'instruments.*.instrument_num' => ['required', 'string'],
            'instruments.*.manufacturer' => ['nullable', 'string'],
        ]);

        // Add default values before creating
        foreach ($intUnitFields['instruments'] as &$instrument) {
            if ($instrument['qty'] <= 0) {
                return redirect()->back()->withErrors(['qty' => 'Quantity must be greater than 0'])->withInput();
            }
            
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
        $user = User::where('employeeID', $jobOrder->employeeID)->first();
        if ($user) {
            // Create database notification
            Notification::create([
                'user_id' => $jobOrder->employeeID,
                'job_order_id' => $jobOrder->job_id,
                'title' => 'Job Order Status Updated',
                'message' => "Your job order #{$jobOrder->job_id} status has been changed from {$oldStatus} to {$jobOrder->status}",
                'type' => 'status_update'
            ]);

            // Send email notification
            try {
                $user->notify(new JobOrderNotification(
                    'Job Order Status Updated',
                    "Your job order #{$jobOrder->job_id} status has been changed from {$oldStatus} to {$jobOrder->status}",
                    $jobOrder->job_id,
                    $jobOrder->status
                ));
            } catch (\Exception $e) {
                Log::error('Failed to send user notification:', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
            }
        }
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
