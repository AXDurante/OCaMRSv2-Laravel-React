<?php

namespace Database\Seeders;

use App\Models\Equipment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $equipments = [
            ['id' => 1, 'equip_category' => 'Calipers', 'equip_name' => 'Vernier Caliper'],
            ['id' => 2, 'equip_category' => 'Balances', 'equip_name' => 'Top Loading Balances'],
            ['id' => 3, 'equip_category' => 'Balances', 'equip_name' => 'Moisture Balance'],
            ['id' => 4, 'equip_category' => 'Balances', 'equip_name' => 'Beam Balance'],
            ['id' => 5, 'equip_category' => 'Balances', 'equip_name' => 'Bench Scale Balance'],
            ['id' => 6, 'equip_category' => 'Balances', 'equip_name' => 'Eye Level Physician Scale'],
            ['id' => 7, 'equip_category' => 'Balances', 'equip_name' => 'Infant Scale'],
            ['id' => 8, 'equip_category' => 'Balances', 'equip_name' => 'Bath Scale'],
            ['id' => 9, 'equip_category' => 'Balances', 'equip_name' => 'Spring Balance'],
            ['id' => 10, 'equip_category' => 'Calipers', 'equip_name' => 'Micrometer'],
            ['id' => 11, 'equip_category' => 'Calipers', 'equip_name' => 'Skinfold Caliper'],
            ['id' => 12, 'equip_category' => 'Calipers', 'equip_name' => 'Mechanical or Digital Calipers'],
            ['id' => 13, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Convection Oven'],
            ['id' => 14, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Incubator Oven'],
            ['id' => 15, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Drying Oven'],
            ['id' => 16, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Water/Oil Bath'],
            ['id' => 17, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Gravity Oven'],
            ['id' => 19, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Hot Plate'],
            ['id' => 20, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Magnetic Stirrer'],
            ['id' => 21, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Hot Plate w/ Magnetic Stirrer'],
            ['id' => 22, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Orbital Shakers'],
            ['id' => 23, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Heaters'],
            ['id' => 24, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Furnace'],
            ['id' => 25, 'equip_category' => 'Rotary Evaporator and Accessories', 'equip_name' => 'Rotary Evaporator'],
            ['id' => 26, 'equip_category' => 'Rotary Evaporator and Accessories', 'equip_name' => 'Vacuum Pump'],
            ['id' => 27, 'equip_category' => 'Centrifuge', 'equip_name' => 'General Purpose Centrifuge'],
            ['id' => 28, 'equip_category' => 'Centrifuge', 'equip_name' => 'Babcock Centrifuge'],
            ['id' => 29, 'equip_category' => 'Centrifuge', 'equip_name' => 'Fixed / Variable Speed Centrifuge'],
            ['id' => 30, 'equip_category' => 'Centrifuge', 'equip_name' => 'High Capacity / High Speed Centrifuge'],
            ['id' => 31, 'equip_category' => 'Centrifuge', 'equip_name' => 'Clinical Centrifuge'],
            ['id' => 32, 'equip_category' => 'Centrifuge', 'equip_name' => 'Micro Centrifuge'],
            ['id' => 33, 'equip_category' => 'Microscope', 'equip_name' => 'Compound Microscope'],
            ['id' => 34, 'equip_category' => 'Balances', 'equip_name' => 'Analytical Balances'],
        ];

        DB::table('equipment')->insert($equipments);
    }
}
