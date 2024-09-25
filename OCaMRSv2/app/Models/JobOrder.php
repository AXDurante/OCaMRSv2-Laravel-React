<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function intUnits()
    {
        return $this->hasMany(IntUnit::class, 'jobOrderID');
    }
}
