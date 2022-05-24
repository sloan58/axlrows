<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ucm>
 */
class UcmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'UCM ' . $this->faker->unique()->word(),
            'ipAddress' => $this->faker->localIpv4(),
            'username' => 'Administrator',
            'password' => 'password',
            'version' => $this->faker->randomElement(['10.5', '11.5', '12.5']),
        ];
    }
}
