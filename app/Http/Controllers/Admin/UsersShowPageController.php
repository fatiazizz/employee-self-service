<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LeaveBalance;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersShowPageController extends Controller
{
    public function show($id)
    {
        $user = User::with('manager')->findOrFail($id);
        $allUsers = User::where("is_manager",1)->select('id', 'name')->get();

        return Inertia::render('admin/users/show', [
            'user' => $user,
            'allUsers' => $allUsers, // برای انتخاب مدیر جدید
        ]);
    }
    public function updateManager(Request $request, $id)
    {
        $request->validate([
            'manager_id' => 'nullable|exists:users,id|not_in:' . $id,
        ]);

        $user = \App\Models\User::findOrFail($id);
        $user->manager_id = $request->input('manager_id');
        $user->save();

        return response()->json(['message' => 'Manager updated successfully']);
    }

    public function makeAdmin(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->is_admin = 1;
        $user->save();

        return response()->json(['message' => 'User granted admin access.']);
    }

public function setManagerStatus($id, Request $request)
    {
        $user = User::findOrFail($id);
        $user->is_manager = $request->boolean('is_manager') ? 1 : 0;
        $user->save();

        return response()->json(['message' => 'Manager status updated']);
    }

    public function setLeaveBalance($id, Request $request)
    {

        $user = User::findOrFail($id);

        $request->validate([
            'remaining_hours' => 'required|numeric|min:0',
        ]);
    $leaveBalance = LeaveBalance::firstOrNew([
        'user_id' => $user->id,
        'year' => now()->year,
    ]);

    if (is_null($leaveBalance->used_hours)) {
        $leaveBalance->used_hours = 0;
    }

    $leaveBalance->total_hours = $request->input('remaining_hours');
    $leaveBalance->save();

    return response()->json([
        'message' => 'Leave balance updated',
        'remaining_hours' => $leaveBalance->total_hours - $leaveBalance->used_hours,
    ]);
    }

}
