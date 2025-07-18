<?php 

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Driver;

class VehicleRequestCreatePageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $vehicles = Vehicle::where('is_active', true)->get(['id', 'name']);
        $drivers  = Driver::with('user')->get()->map(function ($driver) {
            return [
                'id'   => $driver->id,
                'name' => $driver->user->name,
            ];
        });

        return Inertia::render('vehicle/create', [
            'employee_name' => $user->name,
            'employee_code' => "EMP00" . $user->id,
            'now'           => now()->format('Y-m-d\TH:i'),
            'vehicles'      => $vehicles,
            'drivers'       => $drivers,
        ]);
    }
}
