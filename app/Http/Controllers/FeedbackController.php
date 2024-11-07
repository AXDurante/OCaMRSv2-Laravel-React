<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\JobOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class FeedbackController extends Controller
{
    /**
     * Display a listing of feedbacks.
     */
    public function index()
    {
        $feedbacks = Feedback::with('user')
            ->latest()
            ->get();

        return Inertia::render('Feedback/Index', [
            'feedbacks' => $feedbacks
        ]);
    }

    /**
     * Show the form for creating a new feedback.
     */
    public function create($jobOrderId)
    {
        // Check if the job order exists and belongs to the current user
        $jobOrder = JobOrder::where('job_id', $jobOrderId)
            ->where('employeeID', auth()->user()->employeeID)
            ->firstOrFail();

        // Check for existing feedback
        $existingFeedback = Feedback::where([
            'job_order_id' => $jobOrderId,
            'user_id' => auth()->id()
        ])->first();

        if ($existingFeedback) {
            return redirect()->route('jobOrder.index')
                ->with('error', 'You have already submitted feedback for this job order.');
        }

        return Inertia::render('Feedback', [
            'jobOrderId' => $jobOrderId,
            'jobOrder' => [
                'service_type' => $jobOrder->service_type,
                'date_request' => $jobOrder->date_request,
                'status' => $jobOrder->status,
                // Add any other job order details you want to display
            ]
        ]);
    }

    /**
     * Store a newly created feedback.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_order_id' => 'required|integer',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        // Check if job order exists and belongs to the current user
        $jobOrder = JobOrder::where('job_id', $validated['job_order_id'])
            ->where('employeeID', auth()->user()->employeeID)  // Only allow feedback for own job orders
            ->firstOrFail();

        // Check if feedback already exists
        $existingFeedback = Feedback::where('job_order_id', $validated['job_order_id'])
            ->where('user_id', auth()->id())
            ->first();

        if ($existingFeedback) {
            return back()->with('error', 'You have already submitted feedback for this job order.');
        }

        // Additional check for authorization
        if ($jobOrder->employeeID !== auth()->user()->employeeID) {
            return redirect()->route('jobOrder.index')
                ->with('error', 'You can only provide feedback for your own job orders.');
        }

        $feedback = Feedback::create([
            'user_id' => auth()->id(),
            'job_order_id' => $validated['job_order_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->route('jobOrder.index')
            ->with('success', 'Feedback submitted successfully!');
    }

    /**
     * Display the specified feedback.
     */
    public function show(Feedback $feedback)
    {
        // Check if the feedback belongs to a job order owned by the current user
        $jobOrder = JobOrder::where('job_id', $feedback->job_order_id)
            ->where('employeeID', auth()->user()->employeeID)
            ->firstOrFail();

        // Load the feedback with its relationships and format the data
        $feedback->load('jobOrder');
        
        return Inertia::render('viewFeedBack', [
            'feedback' => [
                'id' => $feedback->id,
                'job_order_id' => $feedback->job_order_id,
                'rating' => $feedback->rating,
                'comment' => $feedback->comment,
                'created_at' => $feedback->created_at,
                'job_order' => [
                    'title' => $feedback->jobOrder->title,
                    'status' => $feedback->jobOrder->status,
                    // Add any other job order details you want to display
                ]
            ]
        ]);
    }

    /**
     * Show the form for editing feedback.
     */
    public function edit(Feedback $feedback)
    {
        // Optional: Add authorization check
        $this->authorize('update', $feedback);

        return Inertia::render('Feedback/Edit', [
            'feedback' => $feedback
        ]);
    }

    /**
     * Update the specified feedback.
     */
    public function update(Request $request, Feedback $feedback)
    {
        // Optional: Add authorization check
        $this->authorize('update', $feedback);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        $feedback->update($validated);

        return redirect()->route('feedback.index')
            ->with('success', 'Feedback updated successfully!');
    }

    /**
     * Remove the specified feedback.
     */
    public function destroy(Feedback $feedback)
    {
        // Optional: Add authorization check
        $this->authorize('delete', $feedback);

        $feedback->delete();

        return redirect()->route('feedback.index')
            ->with('success', 'Feedback deleted successfully!');
    }
}
