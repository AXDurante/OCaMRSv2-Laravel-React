<?php

namespace App\Http\Controllers;

use App\Models\StaffNotification;
use App\Models\JobOrder;
use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminNotificationController extends Controller
{
    public function getUnreadCount()
    {
        $count = StaffNotification::unread()
            ->where('recipient_type', 'admin')
            ->where('recipient_id', auth()->guard('admin')->id())
            ->count();

        return response()->json(['count' => $count]);
    }

    public function index()
    {
        $notifications = StaffNotification::where('recipient_type', 'admin')
            ->where('recipient_id', auth()->guard('admin')->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($notification) {
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

        return Inertia::render('Admin/NotificationsAdmin', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        $notification = StaffNotification::where('recipient_type', 'admin')
            ->where('recipient_id', auth()->guard('admin')->id())
            ->findOrFail($id);
            
        $notification->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    public function markAllAsRead()
    {
        StaffNotification::where('recipient_type', 'admin')
            ->where('recipient_id', auth()->guard('admin')->id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    // Static method to create notifications for all admins
    public static function notifyAllAdmins($jobOrder, $title, $message, $type = 'status_change')
    {
        $admins = Admin::all();
        foreach ($admins as $admin) {
            StaffNotification::create([
                'recipient_type' => 'admin',
                'recipient_id' => $admin->id,
                'job_order_id' => $jobOrder->job_id,
                'job_order_status' => $jobOrder->status,
                'title' => $title,
                'message' => $message,
                'type' => $type
            ]);
        }
    }
}
