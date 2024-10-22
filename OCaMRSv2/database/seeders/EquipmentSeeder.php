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
            ['id' => 1, 'equip_category' => 'Calipers', 'equip_name' => 'Vernier Caliper', 'image_path' => 'images/Calipers.png'],
            ['id' => 2, 'equip_category' => 'Balances', 'equip_name' => 'Top Loading Balances', 'image_path' => 'images/Balances.png'],
            ['id' => 3, 'equip_category' => 'Balances', 'equip_name' => 'Moisture Balance', 'image_path' => 'images/Balances.png'],
            ['id' => 4, 'equip_category' => 'Balances', 'equip_name' => 'Beam Balance', 'image_path' => 'images/Balances.png'],
            ['id' => 5, 'equip_category' => 'Balances', 'equip_name' => 'Bench Scale Balance', 'image_path' => 'images/Balances.png'],
            ['id' => 6, 'equip_category' => 'Balances', 'equip_name' => 'Eye Level Physician Scale', 'image_path' => 'images/Balances.png'],
            ['id' => 7, 'equip_category' => 'Balances', 'equip_name' => 'Infant Scale', 'image_path' => 'images/Balances.png'],
            ['id' => 8, 'equip_category' => 'Balances', 'equip_name' => 'Bath Scale', 'image_path' => 'images/Balances.png'],
            ['id' => 9, 'equip_category' => 'Balances', 'equip_name' => 'Spring Balance', 'image_path' => 'images/Balances.png'],
            ['id' => 10, 'equip_category' => 'Calipers', 'equip_name' => 'Micrometer', 'image_path' => 'images/Calipers.png'],
            ['id' => 11, 'equip_category' => 'Calipers', 'equip_name' => 'Skinfold Caliper', 'image_path' => 'images/Calipers.png'],
            ['id' => 12, 'equip_category' => 'Calipers', 'equip_name' => 'Mechanical or Digital Calipers', 'image_path' => 'images/Calipers.png'],
            ['id' => 13, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Convection Oven', 'image_path' => 'images/Ovens and Incubators.png'],
            ['id' => 14, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Incubator Oven', 'image_path' => 'images/Ovens and Incubators.png'],
            ['id' => 15, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Drying Oven', 'image_path' => 'images/Ovens and Incubators.png'],
            ['id' => 16, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Water/Oil Bath', 'image_path' => 'images/Ovens and Incubators.png'],
            ['id' => 17, 'equip_category' => 'Ovens and Incubators', 'equip_name' => 'Gravity Oven', 'image_path' => 'images/Ovens and Incubators.png'],
            ['id' => 19, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Hot Plate', 'image_path' => 'images/Heaters and Stirrers.png'],
            ['id' => 20, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Magnetic Stirrer', 'image_path' => 'images/Heaters and Stirrers.png'],
            ['id' => 21, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Hot Plate w/ Magnetic Stirrer', 'image_path' => 'images/Heaters and Stirrers.png'],
            ['id' => 22, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Orbital Shakers', 'image_path' => 'images/Heaters and Stirrers.png'],
            ['id' => 23, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Heaters', 'image_path' => 'images/Heaters and Stirrers.png'],
            ['id' => 24, 'equip_category' => 'Heaters and Stirrers', 'equip_name' => 'Furnace', 'image_path' => 'images/Heaters and Stirrers.png'],
            ['id' => 25, 'equip_category' => 'Rotary Evaporator and Accessories', 'equip_name' => 'Rotary Evaporator', 'image_path' => 'images/Rotary Evaporator.png'],
            ['id' => 26, 'equip_category' => 'Rotary Evaporator and Accessories', 'equip_name' => 'Vacuum Pump', 'image_path' => 'images/Rotary Evaporator.png'],
            ['id' => 27, 'equip_category' => 'Centrifuge', 'equip_name' => 'General Purpose Centrifuge', 'image_path' => 'images/Centrifuge.png'],
            ['id' => 28, 'equip_category' => 'Centrifuge', 'equip_name' => 'Babcock Centrifuge', 'image_path' => 'images/Centrifuge.png'],
            ['id' => 29, 'equip_category' => 'Centrifuge', 'equip_name' => 'Fixed / Variable Speed Centrifuge', 'image_path' => 'images/Centrifuge.png'],
            ['id' => 30, 'equip_category' => 'Centrifuge', 'equip_name' => 'High Capacity / High Speed Centrifuge', 'image_path' => 'images/Centrifuge.png'],
            ['id' => 31, 'equip_category' => 'Centrifuge', 'equip_name' => 'Clinical Centrifuge', 'image_path' => 'images/Centrifuge.png'],
            ['id' => 32, 'equip_category' => 'Centrifuge', 'equip_name' => 'Micro Centrifuge', 'image_path' => 'images/Centrifuge.png'],
            ['id' => 33, 'equip_category' => 'Microscope', 'equip_name' => 'Compound Microscope', 'image_path' => 'images/Microscope.png'],
            ['id' => 34, 'equip_category' => 'Balances', 'equip_name' => 'Analytical Balances', 'image_path' => 'images/Balances.png'],
        ];

        DB::table('equipment')->insert($equipments);
    }
}
