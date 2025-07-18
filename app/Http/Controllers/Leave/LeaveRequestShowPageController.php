<?php 

namespace App\Http\Controllers\Leave;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use Inertia\Inertia;
use Carbon\Carbon;

class LeaveRequestShowPageController extends Controller
{
    public function index($id)
    {
         $leave = LeaveRequest::with("user","approver")->find($id);

         return Inertia::render('leave/show', [
            'data' => [
                'id' => $leave->id,
                'user_id' => $leave->user_id,
                'employeeName' => $leave->user->name ?? '',
                'employeeCode' => 'EMP00' . $leave->user->id ?? '',
                'start_at' => Carbon::parse($leave->start_at)->format('Y-m-d H:i:s'),
                'end_at' => Carbon::parse($leave->end_at)->format('Y-m-d H:i:s'),
                'created_at' => Carbon::parse($leave->created_at)->format('Y-m-d H:i:s'),
                'status' => $leave->status,
                'comment' => $leave->comment,
                'approver' => $leave->approver ? [
                    'id' => $leave->approver->id,
                    'name' => $leave->approver->name,
                    'email' => $leave->approver->email,
                ] : null,
            ],
        ]);
    }
}
