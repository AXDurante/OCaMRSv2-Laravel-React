<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\JobOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class FeedbackControllerAdmin extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::with(['user', 'jobOrder'])
            ->latest()
            ->get();

        return Inertia::render('Admin/Feedback/Index', [
            'feedbacks' => $feedbacks
        ]);
    }

    public function show($id)
    {
        $feedback = Feedback::where('job_order_id', $id)
            ->with(['user', 'jobOrder'])
            ->first();

        if (!$feedback) {
            return redirect()->back()->with('error', 'No feedback found for this job order.');
        }

        return Inertia::render('viewFeedBackAdmin', [
            'feedback' => [
                'id' => $feedback->id,
                'user' => [
                    'name' => $feedback->user->firstName . ' ' . $feedback->user->lastName,
                    'employeeID' => $feedback->user->employeeID
                ],
                'job_order_id' => $feedback->job_order_id,
                'rating' => $feedback->rating,
                'comment' => $feedback->comment,
                'created_at' => $feedback->created_at,
                'job_order' => [
                    'title' => $feedback->jobOrder->title,
                    'status' => $feedback->jobOrder->status,
                    'service_type' => $feedback->jobOrder->service_type,
                    'date_request' => $feedback->jobOrder->date_request,
                ]
            ]
        ]);
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return redirect()->route('admin.feedback.index')
            ->with('success', 'Feedback deleted successfully!');
    }
}
