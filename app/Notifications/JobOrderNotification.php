<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

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
        // Add logging to debug
        Log::info('Sending notification via:', [
            'notifiable' => $notifiable,
            'has_email' => isset($notifiable->email)
        ]);

        return ['database', 'mail']; // Always try both channels
    }

    public function toMail($notifiable): MailMessage
    {
        Log::info('Preparing email for:', [
            'recipient' => $notifiable->email,
            'title' => $this->title
        ]);

        return (new MailMessage)
            ->subject($this->title)
            ->greeting('Hello ' . $notifiable->firstName . '!')
            ->line($this->message)
            ->line($this->jobOrderId ? "Job Order ID: {$this->jobOrderId}" : '')
            ->line($this->status ? "Status: {$this->status}" : '')
            ->line('Thank you for using our application!');
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