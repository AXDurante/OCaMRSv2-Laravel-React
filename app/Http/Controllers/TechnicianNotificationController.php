<?php

namespace App\Http\Controllers;

use App\Models\StaffNotification;
use App\Models\JobOrder;
use App\Models\Technician;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\JobOrderNotification;

class TechnicianNotificationController extends Controller
{
    public function getUnreadCount()
    {
        $count = StaffNotification::unread()
            ->where('recipient_type', 'technician')
            ->where('recipient_id', auth()->guard('technicians')->id())
            ->count();

        return response()->json(['count' => $count]);
    }

    public function index()
    {
        $techId = auth()->guard('technicians')->id();
        \Log::info('Fetching notifications for technician:', ['tech_id' => $techId]);

        $notifications = StaffNotification::where('recipient_type', 'technician')
            ->where('recipient_id', $techId)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($notification) {
                $jobOrder = JobOrder::with('user')->find($notification->job_order_id);
                return [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'created_at' => $notification->created_at,
                    'read_at' => $notification->read_at,
                    'job_order' => $jobOrder ? [
                        'id' => $jobOrder->job_id,
                        'status' => $jobOrder->status,
                        'user' => $jobOrder->user ? [
                            'firstName' => $jobOrder->user->firstName,
                            'lastName' => $jobOrder->user->lastName,
                            'employeeID' => $jobOrder->user->employeeID,
                        ] : null,
                    ] : null
                ];
            });

        return Inertia::render('Tech/NotificationsTechnician', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        $notification = StaffNotification::where('recipient_type', 'technician')
            ->where('recipient_id', auth()->guard('technicians')->id())
            ->findOrFail($id);
            
        $notification->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        StaffNotification::where('recipient_type', 'technician')
            ->where('recipient_id', auth()->guard('technicians')->id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    // Static method to create notifications for all technicians
    public static function notifyAllTechnicians($jobOrder, $title, $message, $type = 'status_change')
    {
        $technicians = Technician::all();
        foreach ($technicians as $technician) {
            // Create database notification
            StaffNotification::create([
                'recipient_type' => 'technician',
                'recipient_id' => $technician->id,
                'job_order_id' => $jobOrder->job_id,
                'job_order_status' => $jobOrder->status,
                'title' => $title,
                'message' => $message,
                'type' => $type
            ]);
            /*
            // Send email notification if technician has email
            if ($technician->email) {
                $technician->notify(new JobOrderNotification(
                    $title,
                    $message,
                    $jobOrder->job_id,
                    $jobOrder->status
                ));
            }
                */
        }
    }

    public static function notifyTechnician($technicianId, $jobOrder, $title, $message, $type = 'status_change')
    {
        StaffNotification::create([
            'recipient_type' => 'technician',
            'recipient_id' => $technicianId,
            'job_order_id' => $jobOrder->job_id,
            'job_order_status' => $jobOrder->status,
            'title' => $title,
            'message' => $message,
            'type' => $type
        ]);
    }
}
