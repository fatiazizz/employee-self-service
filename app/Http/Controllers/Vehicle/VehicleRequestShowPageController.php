<?php 
namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use App\Models\VehicleRequest;
use Inertia\Inertia;
use Carbon\Carbon;

class VehicleRequestShowPageController extends Controller
{
    public function index($id)
    {
        $vehicle = VehicleRequest::with(['user', 'approver', 'vehicle', 'driver.user'])->findOrFail($id);

        return Inertia::render('vehicle/show', [
            'data' => [
                'id'            => $vehicle->id,
                'employeeName'  => $vehicle->user->name ?? '',
                'employeeCode'  => 'EMP00' . $vehicle->user->id ?? '',
                'start_at'      => $vehicle->start_at->format('Y-m-d H:i:s'),
                'end_at'        => $vehicle->end_at->format('Y-m-d H:i:s'),
                'created_at'    => $vehicle->created_at->format('Y-m-d H:i:s'),
                'status'        => $vehicle->status,
                'comment'       => $vehicle->comment,
                'vehicle'       => $vehicle->vehicle ? [
                    'id' => $vehicle->vehicle->id,
                    'name' => $vehicle->vehicle->name,
                ] : null,
                'driver'        => $vehicle->driver ? [
                    'id' => $vehicle->driver->id,
                    'name' => $vehicle->driver->user->name,
                ] : null,
                'approver'      => $vehicle->approver ? [
                    'id' => $vehicle->approver->id,
                    'name' => $vehicle->approver->name,
                    'email' => $vehicle->approver->email,
                ] : null,
            ],
        ]);
    }
}
