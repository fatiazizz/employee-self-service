<?php 

namespace App\Http\Controllers\Leave;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\LeaveRequest;
use Carbon\Carbon;

class LeaveRequestPageController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // اگر مدیر بود، همه‌ی مرخصی‌های زیردستانش را ببین
        // در غیر اینصورت، فقط درخواست‌های خودش را
        $query = LeaveRequest::query()
            ->with(['user'])
            ->when(!$user->is_admin, fn($q) => $q->where('user_id', $user->id));

        $leaveRequests = $query->latest()->get()->map(function ($leave) {
            return [
                'id' => $leave->id,
                'employeeName' => $leave->user->name,
                'employeeCode' => "EMP00". $leave->user->id,
                'startDate' => Carbon::parse($leave->start_at)->format('Y-m-d H:i:s'),
                'endDate' => Carbon::parse($leave->end_at)->format('Y-m-d H:i:s'),
                'status' => $leave->status,
            ];
        });

        return Inertia::render('leave/index', [
            'leaveRequests' => $leaveRequests,
        ]);
    }
}
