<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'no_ppdb' => 'PPDB' . $this->faker->unique()->randomNumber(5),
            'nisn' => $this->faker->unique()->numerify('##########'),
            'name' => $this->faker->name(),
            'class' => $this->faker->randomElement(['10A', '10B', '11A', '11B', '12A', '12B']),
            'barcode_id' => Str::random(10),
        ];
    }
}
