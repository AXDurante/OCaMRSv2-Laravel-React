<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::create([
            'id_number' => 'ADMIN001',
            'password' => Hash::make('password123'),
        ]);
    }
}
