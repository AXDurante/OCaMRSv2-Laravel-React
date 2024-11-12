<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoC extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'coc';
    protected $primaryKey = 'coc_id';

    protected $fillable = [
        'coc_num',
        'college',
        'lab_loc',
        'equipment',
        'model',
        'serial_num',
        'manufacturer',
        'date_req',
        'date_cal',
        'date_due',
        // Place of Calibration 
        'calibration',
        'standard',
        'calibration_res',
        'remark',
        'tsr_num',
        'tsr_id',
        'tech_name',
        'tech_photo',
        'admin_name',
        'admin_photo'
    ];

    public function tsr(): BelongsTo
    {
        return $this->belongsTo(TSR::class, 'tsr_num', 'tsr_num');
    }
}
