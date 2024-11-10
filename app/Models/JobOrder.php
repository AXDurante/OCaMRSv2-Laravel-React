<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobOrder extends Model
{
    use HasFactory;

    public $timestamps = false;
    const DATE_REQUEST = 'date_request';
    const DATE_DUE = 'date_due';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $post->date_due = now()->addYear();
        });

        static::creating(function ($model) {
            $model->date_request = $model->freshTimestamp();
        });
    }

    protected $primaryKey = 'job_id';

    protected $fillable = [
        'service_type',
        'trans_type',
        'dept_name',
        'lab',
        'lab_loc',
        'pos',
        // 'date_due'
        // date_req
        'remarks',
        'employeeID',
        'status',
    ];

    protected $dates = ['date_request', 'date_due'];

    public function int_units()
    {
        return $this->hasMany(IntUnit::class, 'jobOrderID', 'job_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employeeID', 'employeeID');
    }

    public function tsr(): HasMany
    {
        return $this->hasMany(TSR::class, 'job_id', 'job_id');
    }

    public function feedback()
    {
        return $this->hasOne(Feedback::class, 'job_order_id', 'job_id');
    }
}
