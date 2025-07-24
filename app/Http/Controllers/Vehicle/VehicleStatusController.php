<?php

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\VehicleRequest;
use App\Models\Vehicle;
use App\Models\Driver;

class VehicleStatusController extends Controller
{
    public function update($id, Request $request)
    {
<<<<<<< HEAD
        $validated = $request->validate([
            'status'      => ['required', 'in:approved,rejected'],
            'vehicle_id'  => ['required'],
            'driver_id'   => ['required'],
        ]);
=======
    $validated = $request->validate([
        'status'      => ['required', 'in:approved,rejected'],
        'vehicle_id'  => ['required'],
        'driver_id'   => ['required'],
    ]);
>>>>>>> 15d67e50e5c7cc6784effd80e1e5e54a1c12c71b

        $vehicle = VehicleRequest::findOrFail($id);
        $vehicle->update([
            'status'     => $validated['status'],
            'vehicle_id' => $validated['vehicle_id'],
            'driver_id'  => $validated['driver_id'],
        ]);
        Vehicle::where('id', $validated['vehicle_id'])->update(['is_active' => false]);
        Driver::where('id', $validated['driver_id'])->update(['is_active' => false]);


        return redirect()->back()->with('success', 'Vehicle status updated.');
    }
}
