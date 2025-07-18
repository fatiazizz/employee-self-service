<?php

// database/factories/DriverFactory.php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DriverFactory extends Factory
{
    protected $model = Driver::class;

    public function definition(): array
    {
        return [
            'user_id'        => User::factory(), // به صورت خودکار یوزر هم می‌سازه
            'license_number' => strtoupper($this->faker->bothify('DRV-#######')),
            'phone'          => $this->faker->phoneNumber,
            'is_active'      => true,
        ];
    }
}
