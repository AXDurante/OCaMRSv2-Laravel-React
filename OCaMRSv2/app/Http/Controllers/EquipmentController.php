<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipment = Equipment::all();
        return Inertia::render("ViewInstrument", [
            "equipment" => $equipment,
        ]);
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
