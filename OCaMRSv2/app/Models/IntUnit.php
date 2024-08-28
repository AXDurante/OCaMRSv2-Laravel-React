<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'instrument',
        'qty',
        'model',
        'serial_num',
        'manufacturer',
        'property_num',
        'jobOrderID',
    ];
}
