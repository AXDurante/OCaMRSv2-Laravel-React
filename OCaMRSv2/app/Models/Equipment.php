<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model

{
    use HasFactory;
    protected $table = 'equipment';
    public $timestamps = false;
    protected $fillable = [
        'equip_category',
        'equip_name'
    ];
}
