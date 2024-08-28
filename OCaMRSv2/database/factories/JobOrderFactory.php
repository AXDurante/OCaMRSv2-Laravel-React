<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobOrder>
 */
class JobOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_type'=>fake()->text(10),
            'trans_type'=>fake()->text(10),
            'dept_name'=>fake()->text(10),
            'lab'=>fake()->text(10),
            'lab_loc'=>fake()->text(10),
            'pos'=>fake()->text(10),
        ];
    }
}
