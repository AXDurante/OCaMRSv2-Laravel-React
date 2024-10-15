<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntUnit extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'intUnit_ID';

    protected $fillable = [
        'instrument',
        'qty',
        'model',
        'instrument_num',
        'manufacturer',
        'jobOrderID',
    ];

    public function jobOrder()
    {
        return $this->belongsTo(JobOrder::class, 'jobOrderID');
    }
}
