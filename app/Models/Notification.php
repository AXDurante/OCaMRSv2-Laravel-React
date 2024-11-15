<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'job_order_id',
        'title',
        'message',
        'type',
        'read_at',
        'status'
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    // Helper methods to get related data
    public function getUser()
    {
        return User::where('employeeID', $this->user_id)->first();
    }

    public function getJobOrder()
    {
        return JobOrder::where('job_id', $this->job_order_id)->first();
    }

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function markAsRead()
    {
        $this->update(['read_at' => now()]);
    }
}
