<?php

namespace App\Http\Controllers\Vehicle;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VehicleRequest;
use Carbon\Carbon;

class VehicleRequestCreateController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'driver_id'  => ['nullable', 'exists:users,id'],
            'start_at'   => ['required', 'date'],
            'end_at'     => ['required', 'date', 'after:start_at'],
        ]);

        $start = Carbon::parse($validated['start_at']);
        $end = Carbon::parse($validated['end_at']);

        $vehicleRequest = VehicleRequest::create([
            'user_id'     => $user->id,
            'approver_id' => $user->manager_id,
            'vehicle_id'  => $validated['vehicle_id'],
            'driver_id'   => $validated['driver_id'],
            'start_at'    => $start,
            'end_at'      => $end,
            'status'      => 'pending',
        ]);

        return response()->json([
            'message' => 'Vehicle request submitted successfully.',
            'data' => $vehicleRequest,
        ]);
    }
}
