<?php 

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;
use App\Models\EquipmentRequest;
use Inertia\Inertia;
use Carbon\Carbon;

class EquipmentRequestShowPageController extends Controller
{
    public function index($id)
    {
         $equipment = EquipmentRequest::with("user","approver")->find($id);

         return Inertia::render('equipment/show', [
            'data' => [
      'id'            => $equipment->id,
                'user_id'       => $equipment->user_id,
                'employeeName'  => $equipment->user->name ?? '',
                'employeeCode'  => 'EMP00' . ($equipment->user->id ?? ''),
                'items'         => $equipment->items ?? [],
                'created_at'    => Carbon::parse($equipment->created_at)->format('Y-m-d H:i:s'),
                'status'        => $equipment->status,
                'comment'       => $equipment->comment,
                'approver'      => $equipment->approver ? [
                    'id'    => $equipment->approver->id,
                    'name'  => $equipment->approver->name,
                    'email' => $equipment->approver->email,
                ] : null,
            ],
        ]);
    }
}
