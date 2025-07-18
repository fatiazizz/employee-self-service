<?php 
namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\VehicleRequest;
use Carbon\Carbon;

class VehicleRequestPageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = VehicleRequest::query()
            ->with(['user', 'vehicle', 'driver.user']) // لود خودکار روابط
            ->when(!$user->is_admin, fn($q) => $q->where('user_id', $user->id));

        $vehicleRequests = $query->latest()->get()->map(function ($vehicle) {
            return [
                'id' => $vehicle->id,
                'employeeName' => $vehicle->user->name,
                'employeeCode' => "EMP00" . $vehicle->user->id,
                'vehicleName' => optional($vehicle->vehicle)->name,
                'driverName' => optional($vehicle->driver?->user)->name,
                'startDate' => $vehicle->start_at->format('Y-m-d H:i:s'),
                'endDate'   => $vehicle->end_at->format('Y-m-d H:i:s'),
                'status'    => $vehicle->status,
            ];
        });

        return Inertia::render('vehicle/index', [
            'vehicleRequests' => $vehicleRequests,
        ]);
    }
}
