<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffNotification extends Model
{
    protected $fillable = [
        'recipient_type',
        'recipient_id',
        'job_order_id',
        'job_order_status',
        'title',
        'message',
        'type',
        'read_at'
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'job_order_id', 'job_id');
    }
}
