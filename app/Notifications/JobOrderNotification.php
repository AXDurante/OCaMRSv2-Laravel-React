<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Admin;
use App\Models\Technician;

class JobOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $title;
    protected $message;
    protected $jobOrderId;
    protected $status;

    public function __construct($title, $message, $jobOrderId = null, $status = null)
    {
        $this->title = $title;
        $this->message = $message;
        $this->jobOrderId = $jobOrderId;
        $this->status = $status;
    }

    public function via($notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        // Use the same production check as AppServiceProvider
        $isProduction = app()->environment('production');
        $baseUrl = $isProduction ? 'https://leso.online' : 'http://127.0.0.1:8000';
        
        // Determine the correct route based on user type
        $route = match (true) {
            $notifiable instanceof User => '/jobOrder/',
            $notifiable instanceof Technician => '/technician/showJobOrder/',
            $notifiable instanceof Admin => '/admin/showJobOrder/',
            default => '/job-order/view/'
        };

        // Construct the full URL
        $url = $baseUrl . $route . $this->jobOrderId;

        return (new MailMessage)
            ->subject('OCAMRS - ' . $this->title)
            ->greeting("Hello {$notifiable->firstName}!")
            ->line($this->message)
            ->line("Reference Number: {$this->jobOrderId}")
            ->line("Status: {$this->status}")
            ->action('View Job Order Details', $url)
            ->line('For any concerns, please contact:')
            ->line('Laboratory Equipment and Supplies Office (LESO)')
            ->line('University of Santo Tomas')
         
            ->salutation('Best regards,')
            ->salutation('LESO OCAMRS Team');
    }

    public function toDatabase($notifiable)
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'job_order_id' => $this->jobOrderId,
            'status' => $this->status
        ];
    }
}