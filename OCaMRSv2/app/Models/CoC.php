<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoC extends Model
{
    use HasFactory;

    protected $primaryKey = 'coc_id';

    protected $fillable = [
        'coc_num',
        'calibration',
        'standard',
        'calibration_res',
        'remark',
        'tsr_num'
    ];

    public function tsr(): BelongsTo
    {
        return $this->belongsTo(TSR::class, 'tsr_num', 'tsr_num');
    }
}
