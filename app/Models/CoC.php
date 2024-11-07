<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoC extends Model
{
    use HasFactory;

    protected $table = 'COC';
    protected $primaryKey = 'coc_id';

    protected $fillable = [
        'coc_num',
        'equipment',
        'model',
        'serial_num',
        'calibration',
        'standard',
        'calibration_res',
        'remark',
        'tsr_num',
        'tsr_id',
        'calibration_cert_no',
        'manufacturer',
        'cert_num',
        'issuing_lab',
        'standard'
    ];

    public function tsr(): BelongsTo
    {
        return $this->belongsTo(TSR::class, 'tsr_num', 'tsr_num');
    }
}
