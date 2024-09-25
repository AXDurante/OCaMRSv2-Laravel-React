<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipments'; // Ensure this matches your SQL table name
    protected $fillable = ['equip_category', 'equip_name'];
}
