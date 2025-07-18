<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use App\Models\Driver;

class VehicleAndDriverSeeder extends Seeder
{
    public function run(): void
    {
        // 10 خودرو
        Vehicle::factory()->count(10)->create();

        // 10 راننده
        Driver::factory()->count(10)->create();
    }
}