<?php 

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\EquipmentRequest;

class EquipmentStatusController extends Controller
{
    public function update($id, Request $request)
    {
        $request->validate([
            'status' => ['required', 'in:approved,rejected'],
        ]);

        $equipment = EquipmentRequest::findOrFail($id);
        $equipment->status = $request->status;
        $equipment->save();

        return redirect()->back()->with('success', 'Equipment status updated.');
    }
}
