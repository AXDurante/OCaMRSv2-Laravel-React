<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnicianJobOrder extends Model
{
    protected $fillable = ['job_id', 'employeeID', 'date_received', 'instrument', 'service_requested', 'status', 'priority'];
}


