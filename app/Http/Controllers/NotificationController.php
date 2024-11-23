<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Notifications\JobOrderNotification;

class NotificationController extends Controller
{
    /**
     * Get unread notifications count for the authenticated user
     */
    public function getUnreadCount()
    {
        $count = Notification::unread()
            ->where('user_id', auth()->user()->employeeID)
            ->count();

        return response()->json(['count' => $count]);
    }

    /**
     * Get all notifications for the authenticated user
     */
    public function index()
    {
        $user = Auth::user();
        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($notification) {
                $jobOrder = $notification->getJobOrder();
                return [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'created_at' => $notification->created_at,
                    'read_at' => $notification->read_at,
                    'status' => $notification->status,
                    'job_order' => $jobOrder ? [
                        'id' => $jobOrder->job_id,
                        'status' => $jobOrder->status,
                    ] : null
                ];
            });

        return Inertia::render('Notifications', [
            'notifications' => $notifications,
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
            'email' => $user->email,
        ]);
    }

    /**
     * Mark a notification as read
     */
    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', auth()->user()->employeeID)
            ->findOrFail($id);
            
        $notification->markAsRead();

        return response()->json(['success' => true]);
    }

    /**
     * Poll for new notifications
     */
    public function poll()
    {
        $notifications = Notification::where('user_id', auth()->user()->employeeID)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($notification) {
                $jobOrder = $notification->getJobOrder();
                return [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'created_at' => $notification->created_at,
                    'read_at' => $notification->read_at,
                    'status' => $notification->status,
                    'job_order' => $jobOrder ? [
                        'id' => $jobOrder->job_id,
                        'status' => $jobOrder->status,
                    ] : null
                ];
            });

        return response()->json([
            'notifications' => $notifications
        ]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead()
    {
        Notification::where('user_id', auth()->user()->employeeID)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }
}
