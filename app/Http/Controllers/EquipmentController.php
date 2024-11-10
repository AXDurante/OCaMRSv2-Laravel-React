<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        // Validate the incoming request data
        $request->validate([
            'equip_category' => 'required|string|max:255',
            'equip_name' => 'required|string|max:255',
            'image_path' => 'required|string|max:255',
        ]);

        // Create a new equipment entry
        Equipment::create([
            'equip_category' => $request->equip_category,
            'equip_name' => $request->equip_name,
            'image_path' => $request->image_path,
        ]);

        
    }
}
