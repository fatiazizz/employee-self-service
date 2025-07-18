<?php 

namespace App\Http\Controllers\Leave;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\LeaveRequest;

class LeaveStatusController extends Controller
{
    public function update($id, Request $request)
    {
        $request->validate([
            'status' => ['required', 'in:approved,rejected'],
        ]);

        $leave = LeaveRequest::findOrFail($id);
        $leave->status = $request->status;
        $leave->save();

        return redirect()->back()->with('success', 'Leave status updated.');
    }
}
