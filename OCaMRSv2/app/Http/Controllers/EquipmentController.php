<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index()
    {
        return Equipment::all(); // Fetch all equipment data
    }
    public function store(Request $request)
    {
        $request->validate([
            'equip_category' => 'required|string',
            'equip_name' => 'required|string',
        ]);

        $equipment = Equipment::create($request->all());
        return response()->json($equipment, 201);
    }
}
