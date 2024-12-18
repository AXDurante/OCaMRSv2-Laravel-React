<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TSR extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'tsr';
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
        'tech_photo',
        'admin_photo',
        'admin_name',
    ];

    public function job_order(): BelongsTo
    {
        return $this->belongsTo(JobOrder::class, 'job_id', 'job_id');
    }

    public function coc(): HasMany
    {
        return $this->hasMany(CoC::class, 'tsr_num', 'tsr_num');
    }

    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tech_id', 'id');
    }
}
