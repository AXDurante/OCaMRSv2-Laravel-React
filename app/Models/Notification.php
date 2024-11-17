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
        'read_at',
        'type',
        'status'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'read_at'
    ];

    public function job_order()
    {
        return $this->belongsTo(JobOrder::class, 'job_order_id', 'job_id');
    }

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function markAsRead()
    {
        $this->read_at = now();
        $this->save();
    }
}
