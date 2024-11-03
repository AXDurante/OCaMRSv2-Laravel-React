<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TSR extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'TSR';
    protected $primaryKey = 'tsr_id';

    protected $fillable = [
        'tsr_num',
        'instrument',
        'model',
        'serial_num',
        'problemReported',
        'diagnosis',
        'actionTaken',
        'recommendation',
        'tsr_remarks',
        'date_request',
        'phone',
        'job_id',
        'tech_id',
    ];

    public function job_order(): BelongsTo
    {
        return $this->belongsTo(JobOrder::class, 'job_id', 'job_id');
    }

    public function tsr_num(): HasOne
    {
        return $this->hasOne(CoC::class, 'tsr_num', 'tsr_num');
    }
}   
