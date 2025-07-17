<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LeaveRequest;
use App\Models\LeaveBalance;
use Carbon\Carbon;

class LeaveRequestController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'start_at' => ['required', 'date'],
            'end_at'   => ['required', 'date', 'after:start_at'],
        ]);

        // محاسبه مدت مرخصی به ساعت
        $start = Carbon::parse($validated['start_at']);
        $end = Carbon::parse($validated['end_at']);
        $requestedHours = $start->diffInHours($end);

        // دریافت مانده مرخصی کاربر
        $leaveBalance = $user->leaveBalance()->first();

        if (!$leaveBalance) {
            return response()->json(['message' => 'مانده مرخصی برای شما تعریف نشده است.'], 422);
        }

        if ($requestedHours > $leaveBalance->remaining_hours) {
            return response()->json([
                'message' => 'مقدار مرخصی درخواستی بیشتر از مانده مرخصی است.',
                'remaining_hours' => $leaveBalance->remaining_hours,
                'requested_hours' => $requestedHours,
            ], 422);
        }

        // ثبت مرخصی
        $leaveRequest = LeaveRequest::create([
            'user_id'     => $user->id,
            'approver_id' => $user->manager_id, // ارجاع به مدیر مستقیم
            'start_at'    => $start,
            'end_at'      => $end,
            'status'      => 'pending',
        ]);

        return response()->json([
            'message' => 'درخواست مرخصی با موفقیت ثبت شد.',
            'data' => $leaveRequest
        ]);
    }
}
