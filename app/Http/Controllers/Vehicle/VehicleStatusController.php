<?php 

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\VehicleRequest;

class VehicleStatusController extends Controller
{
    public function update($id, Request $request)
    {
        $request->validate([
            'status' => ['required', 'in:approved,rejected'],
        ]);

        $vehicle = VehicleRequest::findOrFail($id);
        $vehicle->status = $request->status;
        $vehicle->save();

        return redirect()->back()->with('success', 'Vehicle status updated.');
    }
}
